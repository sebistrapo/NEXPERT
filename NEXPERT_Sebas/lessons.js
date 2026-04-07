// ============================
//  js/lessons.js
//  Renderizado de lecciones con progresión
// ============================

// Orden de niveles para progresión
const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1'];

/** Obtiene las lecciones completadas de localStorage */
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem('nexpert_progress') || '[]');
  } catch { return []; }
}

/** Marca una lección como completada */
function markLessonComplete(id) {
  const progress = getProgress();
  if (!progress.includes(id)) {
    progress.push(id);
    localStorage.setItem('nexpert_progress', JSON.stringify(progress));
  }
}

/** Obtiene todas las IDs de lecciones de un nivel en orden */
function getAllLessonIdsForLevel(level) {
  const units = UNITS[level];
  if (!units) return [];
  const ids = [];
  units.forEach(u => u.lessons.forEach(l => ids.push(l.id)));
  return ids;
}

/** Verifica si un nivel está completamente terminado */
function isLevelComplete(level) {
  const ids = getAllLessonIdsForLevel(level);
  if (ids.length === 0) return false;
  const progress = getProgress();
  return ids.every(id => progress.includes(id));
}

/** Calcula el status dinámico de cada lección */
function calculateLessonStatus(level) {
  const progress = getProgress();
  const units = UNITS[level];
  if (!units) return;

  // Verificar si los niveles anteriores están completos
  const levelIdx = LEVEL_ORDER.indexOf(level);
  let previousLevelsComplete = true;
  for (let i = 0; i < levelIdx; i++) {
    if (!isLevelComplete(LEVEL_ORDER[i])) {
      previousLevelsComplete = false;
      break;
    }
  }

  let foundNextToUnlock = false;
  const allLessonsInLevel = [];
  units.forEach(u => u.lessons.forEach(l => allLessonsInLevel.push(l)));

  allLessonsInLevel.forEach((lesson, index) => {
    if (progress.includes(lesson.id)) {
      lesson.status = 'completed';
    } else if (!foundNextToUnlock) {
      if (index === 0 && previousLevelsComplete) {
        lesson.status = 'new';
        foundNextToUnlock = true;
      } else if (index > 0 && progress.includes(allLessonsInLevel[index - 1].id)) {
        lesson.status = 'new';
        foundNextToUnlock = true;
      } else {
        lesson.status = 'locked';
      }
    } else {
      lesson.status = 'locked';
    }
  });

  // Recalcular progreso de cada unidad
  units.forEach(unit => {
    const completed = unit.lessons.filter(l => l.status === 'completed').length;
    unit.completed = completed;
    unit.total = unit.lessons.length;
    unit.progress = unit.total > 0 ? Math.round((completed / unit.total) * 100) : 0;
  });
}

/** Filtra las unidades visibles por nivel */
function filterLevel(btn, level) {
  document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderLessons(level);
}

/** Renderiza las unidades de un nivel en el contenedor */
function renderLessons(level) {
  calculateLessonStatus(level);
  const container = document.getElementById('lesson-list-container');
  const units = UNITS[level];

  if (!units || units.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:60px 20px; color:var(--mid);">
        <div style="font-size:3rem; margin-bottom:16px;">🚧</div>
        <div style="font-family:'Fredoka One',cursive; font-size:1.5rem; margin-bottom:8px;">¡Próximamente!</div>
        <div style="font-weight:600;">Este nivel estará disponible muy pronto.</div>
      </div>`;
    return;
  }

  container.innerHTML = units.map(unit => buildUnitHTML(unit)).join('');
}

/** Construye el HTML de una unidad */
function buildUnitHTML(unit) {
  const lessonCards = unit.lessons.map(l => buildLessonCardHTML(l)).join('');

  return `
    <div class="lesson-unit">
      <div class="unit-header">
        <div class="unit-badge" style="background:${unit.badgeGradient}">Unidad ${unit.id}</div>
        <div class="unit-title">${unit.title}</div>
        <div class="unit-progress-text">${unit.completed}/${unit.total} completadas</div>
      </div>
      <div class="progress-wrap" style="margin-bottom:16px;">
        <div class="progress-fill" style="width:${unit.progress}%"></div>
      </div>
      <div class="lesson-cards">${lessonCards}</div>
    </div>
  `;
}

/** Construye el HTML de una tarjeta de lección */
function buildLessonCardHTML(lesson) {
  const isLocked    = lesson.status === 'locked';
  const isCompleted = lesson.status === 'completed';

  const statusIcon  = isCompleted ? '✓' : isLocked ? '🔒' : '!';
  const statusClass = isCompleted ? 'done' : isLocked ? 'lock' : 'new';
  const cardClass   = isCompleted ? 'lesson-card completed'
                    : isLocked    ? 'lesson-card locked'
                    : 'lesson-card';

  const clickAttr = isLocked
    ? ''
    : `onclick="openLesson('${lesson.id}')"`;

  return `
    <div class="${cardClass}" ${clickAttr}>
      <div class="lc-status ${statusClass}">${statusIcon}</div>
      <div class="lc-icon">${lesson.icon}</div>
      <div class="lc-name">${lesson.name}</div>
      <div class="lc-type">${lesson.type}</div>
    </div>
  `;
}

/** Abre la página de detalle de una lección */
function openLesson(id) {
  const lesson = LESSONS_DETAIL[id];
  const container = document.getElementById('lesson-detail-content');

  if (!lesson) {
    container.innerHTML = `
      <button class="back-btn" onclick="showPage('lecciones')">← Volver a Lecciones</button>
      <div style="text-align:center; padding:60px 20px; color:var(--mid);">
        <div style="font-size:3rem; margin-bottom:16px;">📝</div>
        <div style="font-family:'Fredoka One',cursive; font-size:1.5rem; margin-bottom:8px;">Lección en construcción</div>
        <div style="font-weight:600;">Este contenido estará disponible pronto.</div>
      </div>`;
    showPage('lesson-detail');
    return;
  }

  container.innerHTML = buildLessonDetailHTML(lesson, id);
  showPage('lesson-detail');
}

/** Construye el HTML completo de la vista de detalle */
function buildLessonDetailHTML(lesson, lessonId) {
  const vocabCards = lesson.vocab.map(v => `
    <div class="vocab-card">
      <div class="vocab-emoji">${v.emoji}</div>
      <div class="vocab-en">${v.en}</div>
      <div class="vocab-es">${v.es}</div>
    </div>
  `).join('');

  const examples = lesson.examples.map(e => `
    <div class="example-sentence" style="cursor:pointer;" onclick="speakEnglish('${e.en.replace(/'/g, "\\'")}')">
      <div class="en">🔊 ${e.en}</div>
      <div class="es">🇪🇸 ${e.es}</div>
    </div>
  `).join('');

  const progress = getProgress();
  const isCompleted = progress.includes(lessonId);
  const completedBadge = isCompleted
    ? `<div style="background:#22c55e; color:white; padding:8px 16px; border-radius:12px; font-weight:800; text-align:center; margin-bottom:16px;">✅ Lección completada</div>`
    : '';

  return `
    <button class="back-btn" onclick="showPage('lecciones')">← Volver a Lecciones</button>

    ${completedBadge}

    <div class="lesson-detail-header">
      <div style="font-size:3rem; margin-bottom:12px;">${lesson.icon}</div>
      <h2>${lesson.title}</h2>
      <p>${lesson.desc}</p>
      <div class="lesson-meta">
        <span>📊 ${lesson.level}</span>
        <span>⏱️ ${lesson.time}</span>
        <span>⭐ ${lesson.xp}</span>
      </div>
    </div>

    <div class="content-block">
      <h3>📚 Vocabulario clave</h3>
      <div class="vocab-grid">${vocabCards}</div>
    </div>

    <div class="content-block">
      <h3>💬 Ejemplos en contexto</h3>
      ${examples}
    </div>

    <div class="content-block">
      <h3>🎯 ¿Listo para practicar?</h3>
      <p style="color:var(--mid); font-weight:600; margin-bottom:16px;">
        Pon a prueba lo que aprendiste con un quiz de preguntas. ¡Gana ${lesson.xp} al completarlo!
      </p>
      <button class="start-lesson-btn" onclick="startLessonQuiz('${lessonId}')">
        🚀 Practicar esta lección
      </button>
    </div>
  `;
}
