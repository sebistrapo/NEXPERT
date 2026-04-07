// ============================
//  data/quiz-data.js
//  Preguntas para todos los tipos de quiz
// ============================

const QUIZ_DATA = {
  multiple: [
    {
      type: "multiple",
      q: "¿Qué significa 'Good morning'?",
      sub: "Elige la traducción correcta",
      opts: ["Buenos días", "Buenas noches", "Buenas tardes", "Buen provecho"],
      ans: 0,
      exp: "Good morning = Buenos días. Se usa en la mañana."
    },
    {
      type: "multiple",
      q: "¿Cómo dices 'libro' en inglés?",
      sub: "Elige la respuesta correcta",
      opts: ["Pen", "Book", "Desk", "Chair"],
      ans: 1,
      exp: "Book = libro. Pen = bolígrafo. Desk = escritorio."
    },
    {
      type: "multiple",
      q: "¿Qué significa 'How are you?'",
      sub: "Elige la traducción correcta",
      opts: ["¿Cuántos años tienes?", "¿Dónde vives?", "¿Cómo estás?", "¿Cómo te llamas?"],
      ans: 2,
      exp: "How are you? = ¿Cómo estás? Es una pregunta de cortesía."
    },
    {
      type: "multiple",
      q: "¿Cuál es el plural de 'cat'?",
      sub: "Elige la forma correcta",
      opts: ["Cates", "Cats", "Catz", "Cat's"],
      ans: 1,
      exp: "La mayoría de sustantivos forman el plural agregando -s al final."
    },
    {
      type: "multiple",
      q: "¿Qué significa 'I like music'?",
      sub: "Elige la traducción correcta",
      opts: ["No me gusta la música", "Me gusta la música", "Escucho música", "Toco música"],
      ans: 1,
      exp: "I like = Me gusta / Me gustan. Es la forma base con 'I'."
    },
    {
      type: "multiple",
      q: "¿Cómo se dice 'rojo' en inglés?",
      sub: "Elige el color correcto",
      opts: ["Blue", "Green", "Red", "Yellow"],
      ans: 2,
      exp: "Red = rojo. Blue = azul. Green = verde. Yellow = amarillo."
    },
    {
      type: "multiple",
      q: "¿Qué significa 'brother'?",
      sub: "Elige la traducción",
      opts: ["Hermana", "Madre", "Hermano", "Padre"],
      ans: 2,
      exp: "Brother = hermano. Sister = hermana. Father = padre. Mother = madre."
    }
  ],

  fill: [
    {
      type: "fill",
      q: "Completa la oración:",
      sub: "My name ___ Carlos.",
      ans: "is",
      hint: "Verbo to be en 3ra persona singular",
      exp: "'Is' es el verbo to be para he/she/it. My name is..."
    },
    {
      type: "fill",
      q: "Completa la oración:",
      sub: "She ___ from Colombia.",
      ans: "is",
      hint: "Verbo to be",
      exp: "She is from = Ella es de. Usamos 'is' con he/she/it."
    },
    {
      type: "fill",
      q: "Completa la oración:",
      sub: "I ___ English every day.",
      ans: "study",
      hint: "Verbo en presente simple yo",
      exp: "Con I usamos el verbo en su forma base: I study."
    },
    {
      type: "fill",
      q: "Completa la oración:",
      sub: "They ___ two cats.",
      ans: "have",
      hint: "Verbo to have en plural",
      exp: "They have = Ellos tienen. He/she/it → has."
    },
    {
      type: "fill",
      q: "Completa con el adjetivo:",
      sub: "The sky is ___.",
      ans: "blue",
      hint: "Color del cielo en inglés",
      exp: "Blue = azul. The sky is blue = El cielo es azul."
    },
    {
      type: "fill",
      q: "Completa la pregunta:",
      sub: "___ are you from?",
      ans: "Where",
      hint: "Pregunta sobre lugar de origen",
      exp: "Where are you from? = ¿De dónde eres? Where = dónde."
    }
  ],

  translate: [
    {
      type: "translate",
      q: "Traduce al inglés:",
      sub: "Yo tengo veinte años.",
      ans: "I am twenty years old",
      hint: "En inglés se usa 'to be' para la edad",
      exp: "I am twenty years old. En inglés no se dice 'I have years'."
    },
    {
      type: "translate",
      q: "Traduce al inglés:",
      sub: "Ella trabaja en una escuela.",
      ans: "She works in a school",
      hint: "Presente simple 3ra persona: verbo + s",
      exp: "She works = Ella trabaja. Con she/he añadimos -s al verbo."
    },
    {
      type: "translate",
      q: "Traduce al inglés:",
      sub: "Nosotros aprendemos inglés.",
      ans: "We learn English",
      hint: "Presente simple con 'we'",
      exp: "We learn English. Con we/they/I usamos la forma base del verbo."
    },
    {
      type: "translate",
      q: "Traduce al inglés:",
      sub: "El gato está en la casa.",
      ans: "The cat is in the house",
      hint: "Artículo definido + sustantivo",
      exp: "The cat is in the house. The = el/la/los/las en inglés."
    },
    {
      type: "translate",
      q: "Traduce al inglés:",
      sub: "Me gustan los perros.",
      ans: "I like dogs",
      hint: "I like + sustantivo plural",
      exp: "I like dogs. En inglés no hay diferencia entre 'gusta' y 'gustan'."
    }
  ],

  wordbank: [
    {
      type: "wordbank",
      q: "Ordena las palabras:",
      sub: "Forma una oración correcta",
      words: ["name", "My", "Carlos", "is"],
      ans: "My name is Carlos",
      exp: "En inglés el sujeto siempre va primero: My name is Carlos."
    },
    {
      type: "wordbank",
      q: "Ordena las palabras:",
      sub: "Forma una oración correcta",
      words: ["are", "How", "?", "you"],
      ans: "How are you ?",
      exp: "How are you? — pregunta de cortesía muy común en inglés."
    },
    {
      type: "wordbank",
      q: "Ordena las palabras:",
      sub: "Forma una oración correcta",
      words: ["English", "study", "I", "every", "day"],
      ans: "I study English every day",
      exp: "Los adverbios de tiempo van generalmente al final de la oración."
    },
    {
      type: "wordbank",
      q: "Ordena las palabras:",
      sub: "Forma una oración correcta",
      words: ["a", "She", "teacher", "is"],
      ans: "She is a teacher",
      exp: "Para profesiones usamos artículo indefinido 'a/an': She is a teacher."
    },
    {
      type: "wordbank",
      q: "Ordena las palabras:",
      sub: "Forma una oración correcta",
      words: ["cats", "two", "have", "We"],
      ans: "We have two cats",
      exp: "We have two cats = Nosotros tenemos dos gatos."
    }
  ],

  listening: [
    {
      type: "multiple",
      q: "🎧 ¿Qué palabra escuchaste?",
      sub: '"Escucha y elige la respuesta correcta"',
      audio: "Dog",
      opts: ["Dog", "Log", "Fog", "Bog"],
      ans: 0,
      exp: "Dog = perro. Es uno de los animales domésticos más comunes."
    },
    {
      type: "multiple",
      q: "🎧 ¿Qué frase escuchaste?",
      sub: '"Escucha y elige la respuesta correcta"',
      audio: "Goodbye!",
      opts: ["Hello there", "Good morning", "Goodbye!", "Thank you"],
      ans: 2,
      exp: "Goodbye! = ¡Adiós! Se usa al despedirse. También: Bye!"
    },
    {
      type: "multiple",
      q: "🎧 ¿Qué número escuchaste?",
      sub: '"Escucha y elige la respuesta correcta"',
      audio: "Thirteen",
      opts: ["Thirteen", "Three", "Thirty", "Thirsty"],
      ans: 0,
      exp: "Thirteen = 13. Los números -teen van del 13 al 19."
    },
    {
      type: "multiple",
      q: "🎧 ¿Qué color escuchaste?",
      sub: '"Escucha y elige la respuesta correcta"',
      audio: "Yellow",
      opts: ["Purple", "Orange", "Yellow", "Brown"],
      ans: 2,
      exp: "Yellow = amarillo. Es el color del sol y los girasoles."
    }
  ],

  flashcards: [
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Cómo se dice 'manzana' en inglés?",
      opts: ["Orange", "Apple", "Banana", "Grape"],
      ans: 1,
      exp: "Apple = manzana. Orange = naranja. Banana = banano."
    },
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Qué significa 'happy'?",
      opts: ["Triste", "Enojado", "Feliz", "Cansado"],
      ans: 2,
      exp: "Happy = feliz. Sad = triste. Angry = enojado. Tired = cansado."
    },
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Cómo se dice 'agua' en inglés?",
      opts: ["Wine", "Juice", "Milk", "Water"],
      ans: 3,
      exp: "Water = agua. Juice = jugo. Milk = leche. Wine = vino."
    },
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Qué significa 'big'?",
      opts: ["Pequeño", "Grande", "Rápido", "Lento"],
      ans: 1,
      exp: "Big = grande. Small/little = pequeño. Fast = rápido. Slow = lento."
    },
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Cómo se dice 'correr' en inglés?",
      opts: ["Walk", "Jump", "Run", "Swim"],
      ans: 2,
      exp: "Run = correr. Walk = caminar. Jump = saltar. Swim = nadar."
    },
    {
      type: "multiple",
      q: "🃏 Flashcard:",
      sub: "¿Qué significa 'friend'?",
      opts: ["Enemigo", "Desconocido", "Amigo", "Vecino"],
      ans: 2,
      exp: "Friend = amigo/a. Best friend = mejor amigo/a."
    }
  ]
};
