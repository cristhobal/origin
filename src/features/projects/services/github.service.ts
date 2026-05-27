import type { Project } from "@/features/projects/types";
import { normalizeTagName } from "@/shared/icons";
import { existsSync } from "node:fs";
import { join } from "node:path";

// ─────────────────────────────────────────────────────────────────────────────
// GitHub API  →  Project mapper
// ─────────────────────────────────────────────────────────────────────────────
// Usage:
//   import { fetchGitHubProjects } from "@/features/projects/services/github.service";
//   const ghProjects = await fetchGitHubProjects("tu-usuario");
//
// Para incluir repos PRIVADOS, define GITHUB_TOKEN en tu .env:
//   GITHUB_TOKEN=github_pat_xxxxxxxxxxxx
//
// El token necesita permiso "Repository → Metadata: Read-only" (fine-grained)
// o el scope "repo" (clásico). Sin token funciona igual, pero solo trae
// repos públicos.
//
// Como el sitio es estático (Astro SSG), el token solo se usa en build time
// y nunca llega al navegador.
//
// Logos por repo: deja una imagen en public/logos/<nombre-del-repo>.<ext>
// y se asigna automáticamente. Más detalles en public/logos/README.md.
// ─────────────────────────────────────────────────────────────────────────────

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  private: boolean;
  fork: boolean;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

// Repos que ya están definidos manualmente en portfolio.ts
// Agrega aquí el nombre exacto de cada repo que quieras excluir de GitHub
// Repos excluidos de la lista (estáticos o sin interés público)
const EXCLUDE_REPOS: string[] = [];

// ─────────────────────────────────────────────────────────────────────────────
// HIDDEN_REPOS  ←  fuente única de verdad para ocultar proyectos del portafolio
// ─────────────────────────────────────────────────────────────────────────────
// Agrega aquí el nombre EXACTO del repo (case-sensitive, igual que en GitHub)
// para que NO aparezca en NINGUNA parte del sitio:
//   • Sección "Projects" del home  ( / )
//   • Página /projects
//
// A diferencia de EXCLUDE_REPOS (que solo excluye repos de GitHub),
// HIDDEN_REPOS también filtra los proyectos estáticos de data.ts,
// porque HomeLayout y projects.astro importan esta lista y la aplican
// sobre el array combinado [staticProjects, ...ghProjects].
//
// Ejemplo:
//   export const HIDDEN_REPOS: string[] = ["mi-repo-interno", "wip-project"];
//
// El repo sigue existiendo en GitHub; simplemente no se muestra en el portafolio.
// ─────────────────────────────────────────────────────────────────────────────
export const HIDDEN_REPOS: string[] = ["cristhobal", "landing-diagnost"];

// ─────────────────────────────────────────────────────────────────────────────
// DISABLE_HREF_REPOS
// ─────────────────────────────────────────────────────────────────────────────
// Repos cuya URL desplegada (homepage / href) NO debe mostrarse como enlace,
// aunque tengan una en GitHub. Útil cuando el proyecto está deployado pero
// no quieres que sea navegable desde el portafolio (por ejemplo: un cliente
// interno, un staging activo, o un proyecto sin terminar).
//
// Agrega el nombre EXACTO del repo (case-sensitive, igual que en GitHub):
//
//   const DISABLE_HREF_REPOS: string[] = ["mi-repo", "otro-proyecto"];
//
// El proyecto seguirá apareciendo en la grilla, pero el nombre se mostrará
// como texto plano (sin enlace externo) en lugar de un <a href>.
// ─────────────────────────────────────────────────────────────────────────────
const DISABLE_HREF_REPOS: string[] = ["cldr", "vault"];

// Si quieres que SOLO aparezcan los privados que tengan un topic específico
// (ej. para evitar que aparezcan drafts o experimentos), pon aquí el topic.
// Pon "" para mostrar todos los privados.
const PRIVATE_REPO_TOPIC_FILTER = "";

// Override manual de logos para repos específicos.
// Útil si quieres usar una URL externa en vez de un archivo local.
// Tiene prioridad sobre los archivos en public/logos/.
const REPO_LOGOS: Record<string, string> = {
  origin: "https://i.ibb.co/PGnJXjsj/origin.png",
  relay: "https://i.ibb.co/3mjbVK8B/relay.jpg",
  chrono: "https://i.ibb.co/Gf6gsmLP/chrono.jpg",
  "nora-core": "https://i.ibb.co/dwvZfL2c/nora-core.png",
  ignite: "https://i.ibb.co/1t9x0qpH/ignite.jpg",
  diagnost: "https://i.ibb.co/0RzmNbJp/diagnost.jpg",
  vault: "https://i.ibb.co/gbdm1Dc5/vault.jpg",
  // "mi-repo": "https://cdn.example.com/logo.png",
};

// Preview images for private repos (screenshot/preview of the site)
const REPO_PREVIEWS: Record<string, string> = {
  vault: "https://i.ibb.co/BFxJHhH/vault.png",
  chrono: "https://i.ibb.co/TMSjJbp7/chrono.png",
  ignite: "https://i.ibb.co/TqtTPmjY/ignite-2.jpg",
  // "mi-repo-privado": "https://cdn.example.com/preview.jpg",
};

// Extensiones soportadas para logos en public/logos/, en orden de prioridad
const LOGO_EXTENSIONS = ["svg", "png", "webp", "jpg", "jpeg"];

// Busca el logo de un repo: primero en REPO_LOGOS, luego en public/logos/
function findRepoLogo(repoName: string): string | undefined {
  if (REPO_LOGOS[repoName]) return REPO_LOGOS[repoName];

  const publicLogosDir = join(process.cwd(), "public", "logos");
  for (const ext of LOGO_EXTENSIONS) {
    const filename = `${repoName}.${ext}`;
    if (existsSync(join(publicLogosDir, filename))) {
      return `/logos/${filename}`;
    }
  }
  return undefined;
}

// Obtiene todos los lenguajes de un repo: { "TypeScript": 84123, "CSS": 6400, ... }
async function fetchRepoLanguages(
  owner: string,
  repo: string,
  headers: HeadersInit,
): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      { headers },
    );
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export async function fetchGitHubProjects(
  username: string,
): Promise<Project[]> {
  // Acceso al token: en build time (Layout.astro estatico), Vite reemplaza
  // import.meta.env.GITHUB_TOKEN con el valor del .env. En SSR runtime
  // (projects.astro con prerender=false en Vercel), el adapter inyecta las
  // env vars en process.env. Usamos ambos para cubrir los dos casos.
  const token =
    import.meta.env.GITHUB_TOKEN ??
    (typeof process !== "undefined" ? process.env.GITHUB_TOKEN : undefined);

  // ⚠️  FIX: Log de diagnóstico mejorado.
  //
  // PROBLEMA ANTERIOR: el log imprimía los primeros 12 caracteres del token
  // (token.slice(0, 12)), lo que expone el tipo del token en los Vercel Runtime Logs.
  // Aunque no es el secreto completo, es información innecesaria en los logs.
  //
  // FIX: ahora solo indicamos presencia/ausencia y la longitud del token,
  // sin revelar ningún fragmento del valor.
  if (token) {
    console.log(
      `[github.ts] GITHUB_TOKEN detectado (${token.length} chars). Pidiendo repos públicos + privados.`,
    );
  } else {
    console.warn(
      "[github.ts] GITHUB_TOKEN NO encontrado. Solo se pedirán repos públicos. " +
        "Verifica .env (local) o Project → Settings → Environment Variables (Vercel).",
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Con token: /user/repos -> trae publicos + privados del usuario autenticado.
  // Sin token: /users/:username/repos -> solo publicos.
  const baseUrl = token
    ? "https://api.github.com/user/repos?visibility=all&affiliation=owner&sort=updated&per_page=100"
    : `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  let allRepos: GitHubRepo[] = [];
  let page = 1;

  // Pagina automaticamente hasta traer todos los repos
  while (true) {
    const res = await fetch(`${baseUrl}&page=${page}`, { headers });

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      console.error(
        `[github.ts] Error ${res.status} ${res.statusText} al obtener repos${token ? "" : ` de @${username}`}. Body: ${errorBody.slice(0, 200)}`,
      );
      break;
    }

    const repos: GitHubRepo[] = await res.json();
    if (repos.length === 0) break;

    allRepos = [...allRepos, ...repos];
    if (repos.length < 100) break;
    page++;
  }

  // Log de diagnostico: cuantos trajimos y cuantos son privados
  const privateCount = allRepos.filter((r) => r.private).length;
  const publicCount = allRepos.length - privateCount;
  console.log(
    `[github.ts] Total repos recibidos: ${allRepos.length} (públicos: ${publicCount}, privados: ${privateCount})`,
  );

  const filteredRepos = allRepos
    .filter((r) => !r.fork)
    .filter((r) => !EXCLUDE_REPOS.includes(r.name))
    .filter((r) => !HIDDEN_REPOS.includes(r.name))
    .filter((r) => {
      if (r.private && PRIVATE_REPO_TOPIC_FILTER) {
        return r.topics.includes(PRIVATE_REPO_TOPIC_FILTER);
      }
      return true;
    });

  // Obtiene los lenguajes de todos los repos en paralelo
  const languagesList = await Promise.all(
    filteredRepos.map((repo) =>
      fetchRepoLanguages(repo.owner.login, repo.name, headers),
    ),
  );

  return filteredRepos.map((repo, i): Project => {
    const visibleTopics = repo.topics.filter(
      (t) => t !== PRIVATE_REPO_TOPIC_FILTER,
    );

    const tags: { name: string }[] = visibleTopics.length
      ? visibleTopics.map((t) => ({ name: normalizeTagName(t) }))
      : repo.language
        ? [{ name: normalizeTagName(repo.language) }]
        : [];

    const hrefDisabled = DISABLE_HREF_REPOS.includes(repo.name);

    return {
      name: repo.name,
      description: repo.description ?? "No description provided.",
      href: hrefDisabled ? undefined : repo.homepage || undefined,
      githubUrl: repo.private ? undefined : repo.html_url,
      isPrivate: repo.private,
      stars: repo.stargazers_count,
      logo: findRepoLogo(repo.name),
      preview: REPO_PREVIEWS[repo.name],
      tags,
      languages: languagesList[i],
    };
  });
}
