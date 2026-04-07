// ============================
//  js/practica.js
//  Renderiza las tarjetas de práctica
// ============================

const PRACTICA_CARDS = [
  {
    type:    'multiple',
    icon:    '🧩',
    bg:      '#f0fdf4',
    title:   'Opción múltiple',
    desc:    'Lee la pregunta y elige la respuesta correcta entre 4 opciones. Ideal para vocabulario.',
    diff:    'easy',
    diffLabel: 'Fácil'
  },
  {
    type:    'fill',
    icon:    '✍️',
    bg:      '#fff7ed',
    title:   'Rellena el espacio',
    desc:    'Completa oraciones en inglés con la palabra correcta. Entrena tu memoria activa.',
    diff:    'medium',
    diffLabel: 'Medio'
  },
  {
    type:    'translate',
    icon:    '🔄',
    bg:      '#faf5ff',
    title:   'Traducción',
    desc:    'Traduce oraciones del español al inglés. El ejercicio más completo para avanzar.',
    diff:    'hard',
    diffLabel: 'Difícil'
  },
  {
    type:    'wordbank',
    icon:    '🧠',
    bg:      '#eff6ff',
    title:   'Banco de palabras',
    desc:    'Ordena las palabras del banco para formar oraciones correctas en inglés.',
    diff:    'medium',
    diffLabel: 'Medio'
  },
  {
    type:    'listening',
    icon:    '🎧',
    bg:      '#fef2f2',
    title:   'Comprensión auditiva',
    desc:    'Escucha la palabra o frase en inglés y elige lo que oyes. Entrena tu oído.',
    diff:    'medium',
    diffLabel: 'Medio'
  },
  {
    type:    'flashcards',
    icon:    '🃏',
    bg:      '#f0fdfa',
    title:   'Flashcards',
    desc:    'Tarjetas de vocabulario: ve la palabra en inglés y recuerda su significado en español.',
    diff:    'easy',
    diffLabel: 'Fácil'
  }
];

/** Renderiza las tarjetas de práctica en el grid */
function renderPractica() {
  const grid = document.getElementById('practica-grid');
  if (!grid) return;

  grid.innerHTML = PRACTICA_CARDS.map(card => `
    <div class="practica-card" onclick="startQuiz('${card.type}')">
      <div class="practica-card-header">
        <div class="practica-card-icon" style="background:${card.bg};">${card.icon}</div>
        <div class="practica-card-body">
          <div class="practica-card-title">${card.title}</div>
          <div class="practica-card-desc">${card.desc}</div>
        </div>
      </div>
      <div class="practica-card-footer">
        <span class="diff-badge diff-${card.diff}">${card.diffLabel}</span>
        <button class="go-arrow">→</button>
      </div>
    </div>
  `).join('');
}
