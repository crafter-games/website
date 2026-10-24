export type Game = {
  slug: string;
  name: string;
  kind: "recreativo" | "educativo";
  tagline: string;
  blurb: string;
  url: string;
  repo?: string;
  media: { poster: string; video?: string };
  accent: string;
  tags: string[];
  credit?: string;
};

export const games: Game[] = [
  {
    slug: "smash",
    name: "Crafter Smash",
    kind: "recreativo",
    tagline: "Pelea de plataformas con los crafters",
    blurb:
      "Railly, Anthony, Jibaru, Shiara y Edward se ponen a pelear sobre una azotea de Lima. Física tipo Melee, 1P vs CPU, local para dos y soporte de mandos.",
    url: "https://smash.crafter.run",
    repo: "https://github.com/crafter-games/crafter-smash",
    media: { poster: "/media/smash.jpg", video: "/media/smash.mp4" },
    accent: "#FFB23F",
    tags: ["Pelea", "2 jugadores", "Gamepad"],
  },
  {
    slug: "craft-ones",
    name: "Craft Ones",
    kind: "recreativo",
    tagline: "Small paws. Big trouble.",
    blurb:
      "Artillería 1v1 por turnos con criaturas peruanas. Seis herramientas, terreno destructible y turnos de 15 segundos. Local, online o dentro de Discord.",
    url: "https://craft-ones.crafter.run",
    media: { poster: "/media/ones.jpg", video: "/media/ones.mp4" },
    accent: "#9BE08A",
    tags: ["Artillería", "Online", "Discord"],
  },
  {
    slug: "iris",
    name: "Iris.exe",
    kind: "recreativo",
    tagline: "¿Confías en mí?",
    blurb:
      "Visual novel de citas y misterio. Un match, un Code Brew en Barranco y mensajes que se borran solos. Juega con audífonos.",
    url: "https://iris.crafter.run",
    repo: "https://github.com/crafter-games/iris-vn",
    media: { poster: "/media/iris.jpg", video: "/media/iris.mp4" },
    accent: "#6FE3EC",
    tags: ["Visual novel", "Misterio", "Historia"],
    credit: "Jibaru",
  },
  {
    slug: "learnclaudecode",
    name: "learnclaudecode",
    kind: "educativo",
    tagline: "Domina Claude Code jugando",
    blurb:
      "Una hora al día. Rondas cortas, repetición espaciada por concepto, calibración de confianza y labs reales en la terminal.",
    url: "https://learnclaudecode.crafter.run",
    repo: "https://github.com/crafter-games/learnclaudecode",
    media: {
      poster: "/media/learnclaudecode.jpg",
      video: "/media/learnclaudecode.mp4",
    },
    accent: "#FF7A4D",
    tags: ["FSRS", "Labs", "Terminal"],
  },
  {
    slug: "learnaws",
    name: "learnaws",
    kind: "educativo",
    tagline: "Aprueba AWS SAA-C03",
    blurb:
      "Unas 800 preguntas originales verificadas contra la documentación de AWS. Pretesting, intercalado de servicios confundibles y un tutor que solo da pistas después de tu intento.",
    url: "https://learnaws.crafter.run",
    repo: "https://github.com/crafter-games/learnaws",
    media: { poster: "/media/learnaws.jpg", video: "/media/learnaws.mp4" },
    accent: "#FFD23F",
    tags: ["Certificación", "Retrieval", "Tutor IA"],
  },
];
