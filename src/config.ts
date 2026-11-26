export const SITE = {
  name: 'dajomar',
  logo: 'dajomar_',
  title: 'dajomar — Apuntes de TI',
  description: 'Cheat sheets, notas de estudio y lo que aprendo montando mi homelab. Linux, redes, contenedores, infraestructura como código y seguridad, en español y al grano.',
  author: 'David Maza',
  city: 'Montreal',
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'https://dajomar.com',
  pdfBaseUrl: import.meta.env.PUBLIC_PDF_BASE_URL || '/pdfs',
  github: 'https://github.com/dajomar',
  linkedin: 'https://linkedin.com/in/davidmaza',
  personalSite: 'https://davidmaza.co',
} as const;

export const NAV_ITEMS = [
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Artículos', href: '/articulos/' },
  { label: 'Homelab', href: '/homelab/' },
  { label: 'Sobre mí', href: '/sobre-mi/' },
] as const;
