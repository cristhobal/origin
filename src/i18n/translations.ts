export type Lang = "en" | "zh" | "hi" | "es" | "fr";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
];

type Translations = Record<string, string>;

const en: Translations = {
  "nav.home": "cristhobal.cl",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "about.title": "About Me",
  "about.desc1":
    "I'm a Full-Stack Developer with {years}+ years of experience building modern web applications. I specialize in React, TypeScript, Node.js, and cloud technologies.",
  "about.desc2":
    "I'm passionate about open source, continuous learning, and creating tools that make developers' lives easier. I created and maintain several open-source projects including React Doctor, Astro's diagnost, and more.",
  "projects.title": "Projects",
  "projects.subtitle": "A selection of projects I've built and contributed to.",
  "projects.search": "Search projects...",
  "projects.coming_soon": "Coming soon",
  "projects.view_all": "View all projects",
  "projects.count": "{count} projects",
  "experience.title": "Experience",
  "experience.subtitle": "My professional journey and career highlights.",
  "experience.more": "More",
  "experience.current": "Present",
  "skills.title": "Skills & Technologies",
  "footer.tagline": "Build. Break. Improve. Create.",
  "footer.inspired": "Inspired by",
  "header.discord_unavailable": "Unavailable",
};

const zh: Translations = {
  "nav.home": "cristhobal.cl",
  "nav.projects": "项目",
  "nav.experience": "经历",
  "about.title": "关于我",
  "about.desc1":
    "我是一名全栈开发者，拥有 {years}+ 年的现代 Web 应用开发经验。我专注于 React、TypeScript、Node.js 和云技术。",
  "about.desc2":
    "我热衷于开源、持续学习，以及创建让开发者生活更轻松的工具。我创建并维护了多个开源项目，包括 React Doctor、Astro's diagnost 等。",
  "projects.title": "项目",
  "projects.subtitle": "我构建和贡献的一些项目。",
  "projects.search": "搜索项目...",
  "projects.coming_soon": "即将推出",
  "projects.view_all": "查看所有项目",
  "projects.count": "{count} 个项目",
  "experience.title": "经历",
  "experience.subtitle": "我的职业生涯和亮点。",
  "experience.more": "更多",
  "experience.current": "至今",
  "skills.title": "技能与技术",
  "footer.tagline": "构建。突破。改进。创造。",
  "footer.inspired": "灵感来自",
  "header.discord_unavailable": "不可用",
};

const hi: Translations = {
  "nav.home": "cristhobal.cl",
  "nav.projects": "परियोजनाएं",
  "nav.experience": "अनुभव",
  "about.title": "मेरे बारे में",
  "about.desc1":
    "मैं {years}+ वर्षों के अनुभव के साथ एक फुल-स्टैक डेवलपर हूं। मैं React, TypeScript, Node.js और क्लाउड तकनीकों में विशेषज्ञ हूं।",
  "about.desc2":
    "मुझे ओपन सोर्स, निरंतर सीखने और डेवलपर्स के जीवन को आसान बनाने वाले टूल बनाने का शौक है।",
  "projects.title": "परियोजनाएं",
  "projects.subtitle": "मेरे द्वारा बनाई और योगदान की गई परियोजनाएं।",
  "projects.search": "परियोजनाएं खोजें...",
  "projects.coming_soon": "जल्द आ रहा है",
  "projects.view_all": "सभी परियोजनाएं देखें",
  "projects.count": "{count} परियोजनाएं",
  "experience.title": "अनुभव",
  "experience.subtitle": "मेरा पेशेवर सफर और करियर की मुख्य बातें।",
  "experience.more": "और",
  "experience.current": "वर्तमान",
  "skills.title": "कौशल और प्रौद्योगिकी",
  "footer.tagline": "बनाएं। तोड़ें। सुधारें। रचना करें।",
  "footer.inspired": "से प्रेरित",
  "header.discord_unavailable": "अनुपलब्ध",
};

const es: Translations = {
  "nav.home": "cristhobal.cl",
  "nav.projects": "Proyectos",
  "nav.experience": "Experiencia",
  "about.title": "Sobre mí",
  "about.desc1":
    "Soy desarrollador Full-Stack con {years}+ años de experiencia creando aplicaciones web modernas. Me especializo en React, TypeScript, Node.js y tecnologías cloud.",
  "about.desc2":
    "Me apasiona el código abierto, el aprendizaje continuo y crear herramientas que faciliten la vida de los desarrolladores. Creé y mantengo varios proyectos open-source.",
  "projects.title": "Proyectos",
  "projects.subtitle":
    "Una selección de proyectos que he construido y a los que he contribuido.",
  "projects.search": "Buscar proyectos...",
  "projects.coming_soon": "Próximamente",
  "projects.view_all": "Ver todos los proyectos",
  "projects.count": "{count} proyectos",
  "experience.title": "Experiencia",
  "experience.subtitle":
    "Mi trayectoria profesional y lo más destacado de mi carrera.",
  "experience.more": "Más",
  "experience.current": "Presente",
  "skills.title": "Habilidades",
  "footer.tagline": "Construir. Romper. Mejorar. Crear.",
  "footer.inspired": "Inspirado por",
  "header.discord_unavailable": "No disponible",
};

const fr: Translations = {
  "nav.home": "cristhobal.cl",
  "nav.projects": "Projets",
  "nav.experience": "Expérience",
  "about.title": "À propos",
  "about.desc1":
    "Je suis un développeur Full-Stack avec {years}+ années d'expérience dans la création d'applications web modernes. Je me spécialise en React, TypeScript, Node.js et technologies cloud.",
  "about.desc2":
    "Je suis passionné par l'open source, l'apprentissage continu et la création d'outils qui facilitent la vie des développeurs.",
  "projects.title": "Projets",
  "projects.subtitle":
    "Une sélection de projets que j'ai créés et auxquels j'ai contribué.",
  "projects.search": "Rechercher des projets...",
  "projects.coming_soon": "Bientôt disponible",
  "projects.view_all": "Voir tous les projets",
  "projects.count": "{count} projets",
  "experience.title": "Expérience",
  "experience.subtitle":
    "Mon parcours professionnel et les faits marquants de ma carrière.",
  "experience.more": "Plus",
  "experience.current": "Présent",
  "skills.title": "Compétences et Technologies",
  "footer.tagline": "Construire. Casser. Améliorer. Créer.",
  "footer.inspired": "Inspiré par",
  "header.discord_unavailable": "Indisponible",
};

export const translations: Record<Lang, Translations> = { en, zh, hi, es, fr };

export function detectLanguage(): Lang {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.split("-")[0]?.toLowerCase() ?? "en";
  if (lang === "zh") return "zh";
  if (lang === "hi") return "hi";
  if (lang === "es") return "es";
  if (lang === "fr") return "fr";
  return "en";
}

export function t(
  key: string,
  lang: Lang,
  vars?: Record<string, string | number>,
): string {
  const text = translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
