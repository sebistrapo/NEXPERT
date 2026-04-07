// ============================
//  data/lessons-data.js
//  Contenido de todas las lecciones
// ============================

const LESSONS_DETAIL = {
  greetings: {
    title: "Saludos básicos",
    icon: "👋",
    desc: "Aprende a saludar y despedirte en inglés en diferentes situaciones",
    level: "A1 · Básico", time: "15 min", xp: "20 XP",
    vocab: [
      { en: "Hello",          es: "Hola",            emoji: "👋" },
      { en: "Good morning",   es: "Buenos días",      emoji: "🌅" },
      { en: "Good afternoon", es: "Buenas tardes",    emoji: "☀️" },
      { en: "Good evening",   es: "Buenas noches",   emoji: "🌙" },
      { en: "Goodbye",        es: "Adiós",            emoji: "✌️" },
      { en: "See you later",  es: "Hasta luego",      emoji: "👀" },
      { en: "Nice to meet you", es: "Mucho gusto",   emoji: "🤝" },
      { en: "How are you?",   es: "¿Cómo estás?",    emoji: "😊" }
    ],
    examples: [
      { en: "Hello! My name is Maria.",       es: "¡Hola! Mi nombre es María." },
      { en: "Good morning! How are you?",     es: "¡Buenos días! ¿Cómo estás?" },
      { en: "Nice to meet you, Carlos!",      es: "¡Mucho gusto, Carlos!" },
      { en: "Goodbye! See you tomorrow.",     es: "¡Adiós! Hasta mañana." }
    ]
  },
  introductions: {
    title: "Presentaciones",
    icon: "🙋",
    desc: "Aprende a presentarte y hablar sobre ti mismo en inglés",
    level: "A1 · Básico", time: "18 min", xp: "22 XP",
    vocab: [
      { en: "My name is",      es: "Mi nombre es",      emoji: "🏷️" },
      { en: "I am from",       es: "Soy de",            emoji: "🌍" },
      { en: "I am ... years old", es: "Tengo ... años", emoji: "🎂" },
      { en: "I like",          es: "Me gusta",          emoji: "❤️" },
      { en: "I work as",       es: "Trabajo como",      emoji: "💼" },
      { en: "I study",         es: "Estudio",           emoji: "📚" },
      { en: "I live in",       es: "Vivo en",           emoji: "🏠" },
      { en: "My hobby is",     es: "Mi pasatiempo es",  emoji: "🎨" }
    ],
    examples: [
      { en: "Hi! My name is Juan and I am from Colombia.", es: "¡Hola! Mi nombre es Juan y soy de Colombia." },
      { en: "I am 25 years old and I study English.",      es: "Tengo 25 años y estudio inglés." },
      { en: "I like music and I play the guitar.",         es: "Me gusta la música y toco la guitarra." },
      { en: "I work as a teacher in Medellín.",            es: "Trabajo como maestro en Medellín." }
    ]
  },
  numbers: {
    title: "Números 1-100",
    icon: "🔢",
    desc: "Aprende a contar y usar números en conversaciones cotidianas",
    level: "A1 · Básico", time: "20 min", xp: "25 XP",
    vocab: [
      { en: "One",     es: "Uno",       emoji: "1️⃣" },
      { en: "Two",     es: "Dos",       emoji: "2️⃣" },
      { en: "Three",   es: "Tres",      emoji: "3️⃣" },
      { en: "Ten",     es: "Diez",      emoji: "🔟" },
      { en: "Twenty",  es: "Veinte",    emoji: "✌️" },
      { en: "Fifty",   es: "Cincuenta", emoji: "5️⃣" },
      { en: "Hundred", es: "Cien",      emoji: "💯" },
      { en: "First",   es: "Primero",   emoji: "🥇" }
    ],
    examples: [
      { en: "I have three cats.",             es: "Tengo tres gatos." },
      { en: "She is twenty years old.",       es: "Ella tiene veinte años." },
      { en: "There are fifty students.",      es: "Hay cincuenta estudiantes." },
      { en: "My phone number is...",          es: "Mi número de teléfono es..." }
    ]
  }
};

// Unidades por nivel
const UNITS = {
  A1: [
    {
      id: 1,
      title: "Saludos y presentaciones",
      badgeGradient: "linear-gradient(135deg, #22c55e, #0ea5e9)",
      completed: 2,
      total: 6,
      progress: 33,
      lessons: [
        { id: "greetings",      icon: "👋", name: "Saludos básicos",   type: "Vocabulario",   status: "completed" },
        { id: "introductions",  icon: "🙋", name: "Presentaciones",    type: "Conversación",  status: "completed" },
        { id: "numbers",        icon: "🔢", name: "Números 1-100",     type: "Vocabulario",   status: "new"       },
        { id: "colors",         icon: "🎨", name: "Colores",           type: "Vocabulario",   status: "locked"    },
        { id: "days",           icon: "📅", name: "Días y meses",      type: "Vocabulario",   status: "locked"    },
        { id: "home",           icon: "🏠", name: "En casa",           type: "Vocabulario",   status: "locked"    }
      ]
    },
    {
      id: 2,
      title: "Verbo To Be y presente simple",
      badgeGradient: "linear-gradient(135deg, #f97316, #facc15)",
      completed: 0,
      total: 5,
      progress: 0,
      lessons: [
        { id: "tobe",     icon: "✅", name: "Verbo To Be",       type: "Gramática",   status: "locked" },
        { id: "yesno",    icon: "❓", name: "Preguntas Yes/No",  type: "Gramática",   status: "locked" },
        { id: "actions",  icon: "🚶", name: "Acciones diarias",  type: "Vocabulario", status: "locked" },
        { id: "time",     icon: "⏰", name: "La hora",           type: "Vocabulario", status: "locked" },
        { id: "routine",  icon: "📝", name: "Mi rutina",         type: "Escritura",   status: "locked" }
      ]
    }
  ],
  A2: [
    {
      id: 3,
      title: "Pasado simple y experiencias",
      badgeGradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
      completed: 0,
      total: 6,
      progress: 0,
      lessons: [
        { id: "pastsimple", icon: "⏪", name: "Pasado simple",      type: "Gramática",   status: "locked" },
        { id: "irregular",  icon: "🔄", name: "Verbos irregulares", type: "Vocabulario", status: "locked" },
        { id: "travel",     icon: "🗺️", name: "De viaje",           type: "Conversación",status: "locked" },
        { id: "shopping",   icon: "🛒", name: "De compras",         type: "Vocabulario", status: "locked" },
        { id: "restaurant", icon: "🍽️", name: "En el restaurante",  type: "Conversación",status: "locked" },
        { id: "emotions",   icon: "😀", name: "Emociones",          type: "Vocabulario", status: "locked" }
      ]
    }
  ],
  B1: [
    {
      id: 5,
      title: "Futuro, condicionales y opiniones",
      badgeGradient: "linear-gradient(135deg, #a855f7, #ec4899)",
      completed: 0,
      total: 6,
      progress: 0,
      lessons: [
        { id: "will",        icon: "🔮", name: "Will & Going to",  type: "Gramática",   status: "locked" },
        { id: "conditional", icon: "🤔", name: "Condicionales",   type: "Gramática",   status: "locked" },
        { id: "opinions",    icon: "💬", name: "Dar opiniones",   type: "Conversación",status: "locked" },
        { id: "media",       icon: "📰", name: "Medios y noticias",type: "Vocabulario", status: "locked" },
        { id: "work",        icon: "💼", name: "Trabajo y empleo", type: "Vocabulario", status: "locked" },
        { id: "environment", icon: "🌍", name: "Medio ambiente",  type: "Lectura",     status: "locked" }
      ]
    }
  ],
  B2: [
    {
      id: 6,
      title: "Inglés de negocios y escritura formal",
      badgeGradient: "linear-gradient(135deg, #0f172a, #1e40af)",
      completed: 0,
      total: 5,
      progress: 0,
      lessons: [
        { id: "biz1", icon: "📧", name: "Emails formales",    type: "Escritura",   status: "locked" },
        { id: "biz2", icon: "🤝", name: "Reuniones",          type: "Conversación",status: "locked" },
        { id: "biz3", icon: "📊", name: "Presentaciones",     type: "Conversación",status: "locked" },
        { id: "biz4", icon: "📑", name: "Reportes",           type: "Escritura",   status: "locked" },
        { id: "biz5", icon: "💡", name: "Negociación",        type: "Conversación",status: "locked" }
      ]
    }
  ],
  C1: [
    {
      id: 7,
      title: "Nivel experto: matices y registro",
      badgeGradient: "linear-gradient(135deg, #7c3aed, #db2777)",
      completed: 0,
      total: 5,
      progress: 0,
      lessons: [
        { id: "c1a", icon: "📜", name: "Escritura académica",  type: "Escritura",   status: "locked" },
        { id: "c1b", icon: "🎭", name: "Lenguaje figurado",   type: "Gramática",   status: "locked" },
        { id: "c1c", icon: "🗣️", name: "Debate y argumento",  type: "Conversación",status: "locked" },
        { id: "c1d", icon: "📖", name: "Literatura inglesa",  type: "Lectura",     status: "locked" },
        { id: "c1e", icon: "🎙️", name: "Pronunciación avanzada", type: "Pronunciación", status: "locked" }
      ]
    }
  ]
};
