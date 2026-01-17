export const siteConfig = {
  name: "v1 torres",
  description:
    "Tech Lead em Dados/IA/Desenvolvimento. Engenheiro-arquiteto sênior especializado em Machine Learning, infraestrutura, system design e cloud.",
  url: "https://v1torres.dev",
  author: {
    name: "Vinícius Torres",
    handle: "v1",
    email: "contato@v1torres.dev",
    github: "https://github.com/v1torres",
    linkedin: "https://linkedin.com/in/v1torres",
  },
  links: {
    github: "https://github.com/v1torres",
    linkedin: "https://linkedin.com/in/v1torres",
  },
  keywords: [
    "Machine Learning",
    "Inteligência Artificial",
    "Data Engineering",
    "MLOps",
    "System Design",
    "Cloud Architecture",
    "AWS",
    "Python",
    "TypeScript",
    "DevOps",
    "Econometria",
  ],
  nav: [
    { title: "Blog", href: "/blog" },
    { title: "Projetos", href: "/projects" },
    { title: "Notes", href: "/notes" },
    { title: "About", href: "/about" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
