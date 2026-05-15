import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchGitHubProjects } from "../github.service";

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeRepo(overrides: Record<string, unknown> = {}) {
  return {
    name: "mi-repo",
    description: "Un repositorio de prueba",
    html_url: "https://github.com/cristhobal/mi-repo",
    homepage: null,
    private: false,
    fork: false,
    topics: [],
    language: "TypeScript",
    stargazers_count: 5,
    updated_at: "2024-01-01T00:00:00Z",
    owner: { avatar_url: "https://avatars.githubusercontent.com/u/1" },
    ...overrides,
  };
}

function mockFetch(pages: unknown[][]) {
  let callCount = 0;
  return vi.fn().mockImplementation(async () => {
    const body = pages[callCount] ?? [];
    callCount++;
    return {
      ok: true,
      json: async () => body,
    };
  });
}

// ── fetchGitHubProjects() ─────────────────────────────────────────────────────

describe("fetchGitHubProjects()", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("mapea un repo básico al formato Project", async () => {
    global.fetch = mockFetch([[makeRepo()], []]);

    const result = await fetchGitHubProjects("cristhobal");

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      name: "mi-repo",
      description: "Un repositorio de prueba",
      githubUrl: "https://github.com/cristhobal/mi-repo",
      isPrivate: false,
    });
  });

  it("excluye repos fork", async () => {
    global.fetch = mockFetch([[makeRepo({ fork: true })], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result).toHaveLength(0);
  });

  it("excluye repos en la lista EXCLUDE_REPOS", async () => {
    global.fetch = mockFetch([[makeRepo({ name: "cldr" })], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result).toHaveLength(0);
  });

  it("usa homepage como href cuando existe", async () => {
    const repo = makeRepo({ homepage: "https://www.cristhobal.cl" });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].href).toBe("https://www.cristhobal.cl");
  });

  it("deja href undefined cuando homepage es null", async () => {
    global.fetch = mockFetch([[makeRepo({ homepage: null })], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].href).toBeUndefined();
  });

  it("mapea topics como tags cuando existen, normalizando nombres", async () => {
    const repo = makeRepo({ topics: ["astro", "react", "typescript"] });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    // Los topics de GitHub vienen en lowercase y se normalizan al nombre
    // canonico para que matcheen con TAG_ICONS.
    expect(result[0].tags).toEqual([
      { name: "Astro" },
      { name: "React" },
      { name: "TypeScript" },
    ]);
  });

  it("normaliza alias comunes (nextjs -> Next.js, tailwindcss -> Tailwind CSS)", async () => {
    const repo = makeRepo({ topics: ["nextjs", "tailwindcss", "shadcn-ui"] });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].tags).toEqual([
      { name: "Next.js" },
      { name: "Tailwind CSS" },
      { name: "shadcn/ui" },
    ]);
  });

  it("usa el lenguaje como tag cuando no hay topics", async () => {
    const repo = makeRepo({ topics: [], language: "TypeScript" });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].tags).toEqual([{ name: "TypeScript" }]);
  });

  it("usa el lenguaje como tag aunque no haya alias para el", async () => {
    const repo = makeRepo({ topics: [], language: "Rust" });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].tags).toEqual([{ name: "Rust" }]);
  });

  it("retorna tags vacíos cuando no hay topics ni lenguaje", async () => {
    const repo = makeRepo({ topics: [], language: null });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].tags).toEqual([]);
  });

  it("usa 'No description provided.' cuando description es null", async () => {
    const repo = makeRepo({ description: null });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].description).toBe("No description provided.");
  });

  it("retorna array vacío si la API falla (status no-ok)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 403 });
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await fetchGitHubProjects("cristhobal");
    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("pagina correctamente cuando hay 100 repos en la primera página", async () => {
    const page1 = Array.from({ length: 100 }, (_, i) =>
      makeRepo({ name: `repo-${i}` }),
    );
    const page2 = [makeRepo({ name: "repo-100" })];
    global.fetch = mockFetch([page1, page2, []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result).toHaveLength(101);
  });

  it("incluye repos privados con el topic 'portfolio' y los marca como isPrivate", async () => {
    const repo = makeRepo({ private: true, topics: ["portfolio", "astro"] });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result).toHaveLength(1);
    expect(result[0].isPrivate).toBe(true);
  });

  it("mapea stargazers_count al campo stars", async () => {
    const repo = makeRepo({ stargazers_count: 42 });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].stars).toBe(42);
  });

  it("oculta el githubUrl de los repos privados", async () => {
    const repo = makeRepo({ private: true, topics: ["portfolio"] });
    global.fetch = mockFetch([[repo], []]);

    const result = await fetchGitHubProjects("cristhobal");
    expect(result[0].githubUrl).toBeUndefined();
  });
});
