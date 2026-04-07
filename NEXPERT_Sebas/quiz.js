// ============================
//  js/quiz.js
//  Motor del quiz interactivo
// ============================

// Estado del quiz
let currentQuiz   = [];
let currentQ      = 0;
let hearts        = 3;
let score         = 0;
let answered      = false;
let quizType      = '';
let wordbankSentence = [];

/** Habla texto en inglés usando Web Speech API */
function speakEnglish(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.85;
  utter.pitch = 1;
  // Intenta usar una voz en inglés
  const voices = window.speechSynthesis.getVoices();
  const enVoice = voices.find(v => v.lang.startsWith('en'));
  if (enVoice) utter.voice = enVoice;
  window.speechSynthesis.speak(utter);
}

/** Inicia un quiz por tipo */
function startQuiz(type) {
  quizType      = type;
  currentQuiz   = QUIZ_DATA[type] || QUIZ_DATA.multiple;
  currentQ      = 0;
  hearts        = 3;
  score         = 0;
  answered      = false;
  wordbankSentence = [];

  showPage('quiz');
  renderQuestion();
}

/** Renderiza la pregunta actual */
function renderQuestion() {
  const content = document.getElementById('quiz-content');

  if (currentQ >= currentQuiz.length) {
    renderResult();
    return;
  }

  const q   = currentQuiz[currentQ];
  const pct = Math.round((currentQ / currentQuiz.length) * 100);

  answered = false;
  wordbankSentence = [];

  if (q.audio) {
    content.innerHTML = buildListeningHTML(q, pct);
    setTimeout(() => speakEnglish(q.audio), 400);
  } else if (q.type === 'multiple') {
    content.innerHTML = buildMultipleHTML(q, pct);
  } else if (q.type === 'fill' || q.type === 'translate') {
    content.innerHTML = buildFillHTML(q, pct);
    setTimeout(() => document.getElementById('fillinput')?.focus(), 100);
  } else if (q.type === 'wordbank') {
    content.innerHTML = buildWordbankHTML(q, pct);
  }
}

// -------- Builders de HTML --------

function buildHeader(pct) {
  const heartsHtml = '❤️'.repeat(hearts) + '🖤'.repeat(Math.max(0, 3 - hearts));
  return `
    <div class="quiz-header">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="quiz-counter">${currentQ + 1}/${currentQuiz.length}</div>
      <div class="hearts">${heartsHtml}</div>
    </div>
  `;
}

function buildMultipleHTML(q, pct) {
  const options = q.opts.map((o, i) =>
    `<button class="option-btn" onclick="checkAnswer(${i})">${o}</button>`
  ).join('');

  return `
    ${buildHeader(pct)}
    <div class="quiz-card">
      <div class="quiz-type-label">Opción múltiple</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-sub">${q.sub}</div>
      <div class="options-grid">${options}</div>
      <div class="quiz-feedback" id="qfeedback"></div>
    </div>
    <button class="quiz-next-btn" id="qnext" onclick="nextQuestion()">Continuar →</button>
  `;
}

function buildListeningHTML(q, pct) {
  const options = q.opts.map((o, i) =>
    `<button class="option-btn" onclick="checkAnswer(${i})">${o}</button>`
  ).join('');

  return `
    ${buildHeader(pct)}
    <div class="quiz-card">
      <div class="quiz-type-label">🎧 Comprensión auditiva</div>
      <div class="quiz-question">${q.q}</div>
      <div style="display:flex; justify-content:center; margin:20px 0;">
        <button onclick="speakEnglish('${q.audio.replace(/'/g, "\\'")}')"
          style="width:80px; height:80px; border-radius:50%; border:none;
                 background:linear-gradient(135deg, #6366f1, #8b5cf6); color:white;
                 font-size:2.2rem; cursor:pointer; box-shadow:0 4px 15px rgba(99,102,241,.4);
                 transition:transform .15s;" 
          onmouseover="this.style.transform='scale(1.1)'"
          onmouseout="this.style.transform='scale(1)'">
          🔊
        </button>
      </div>
      <div style="text-align:center; color:var(--mid); font-weight:600; font-size:.9rem; margin-bottom:16px;">Haz clic en 🔊 para escuchar de nuevo</div>
      <div class="options-grid">${options}</div>
      <div class="quiz-feedback" id="qfeedback"></div>
    </div>
    <button class="quiz-next-btn" id="qnext" onclick="nextQuestion()">Continuar →</button>
  `;
}

function buildFillHTML(q, pct) {
  const label = q.type === 'fill' ? 'Rellena el espacio' : 'Traducción';
  return `
    ${buildHeader(pct)}
    <div class="quiz-card">
      <div class="quiz-type-label">${label}</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-sub" style="font-size:1.1rem; color:var(--dark); font-weight:800;">${q.sub}</div>
      <div style="color:var(--mid); font-size:.85rem; margin:8px 0 4px; font-weight:600;">💡 Pista: ${q.hint}</div>
      <input
        type="text"
        class="fill-input"
        id="fillinput"
        placeholder="Escribe tu respuesta..."
        onkeydown="if(event.key==='Enter') checkFill()"
      >
      <button
        onclick="checkFill()"
        style="margin-top:12px; width:100%; background:var(--teal); color:white; border:none;
               border-radius:12px; padding:12px; font-family:'Nunito',sans-serif;
               font-weight:800; font-size:1rem; cursor:pointer;"
      >Verificar ✓</button>
      <div class="quiz-feedback" id="qfeedback"></div>
    </div>
    <button class="quiz-next-btn" id="qnext" onclick="nextQuestion()">Continuar →</button>
  `;
}

function buildWordbankHTML(q, pct) {
  const shuffled = [...q.words].sort(() => Math.random() - 0.5);
  const chips = shuffled.map(w =>
    `<button class="word-chip" onclick="addWord(this, '${w}')">${w}</button>`
  ).join('');

  return `
    ${buildHeader(pct)}
    <div class="quiz-card">
      <div class="quiz-type-label">Banco de palabras</div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-sub">${q.sub}</div>
      <div id="sentence-area"
           style="min-height:44px; border:2.5px dashed #e2e8f0; border-radius:12px;
                  padding:10px 14px; margin:16px 0; font-weight:800; font-size:1rem; color:var(--dark);">
        <span style="color:var(--mid); font-size:.9rem;">Haz clic en las palabras...</span>
      </div>
      <div class="word-bank" id="word-bank">${chips}</div>
      <button
        onclick="checkWordbank()"
        style="margin-top:16px; width:100%; background:var(--teal); color:white; border:none;
               border-radius:12px; padding:12px; font-family:'Nunito',sans-serif;
               font-weight:800; font-size:1rem; cursor:pointer;"
      >Verificar ✓</button>
      <div class="quiz-feedback" id="qfeedback"></div>
    </div>
    <button class="quiz-next-btn" id="qnext" onclick="nextQuestion()">Continuar →</button>
  `;
}

// -------- Verificación de respuestas --------

function checkAnswer(i) {
  if (answered) return;
  answered = true;

  const q    = currentQuiz[currentQ];
  const btns = document.querySelectorAll('.option-btn');

  btns[q.ans].classList.add('correct');

  if (i !== q.ans) {
    btns[i].classList.add('wrong');
    hearts = Math.max(0, hearts - 1);
    showFeedback(false, q.exp);
    if (hearts <= 0) { setTimeout(() => renderGameOver(), 1200); return; }
  } else {
    score++;
    showFeedback(true, q.exp);
  }

  btns.forEach(b => b.disabled = true);
  document.getElementById('qnext')?.classList.add('show');
}

function checkFill() {
  if (answered) return;

  const input = document.getElementById('fillinput');
  if (!input) return;

  const q        = currentQuiz[currentQ];
  const userAns  = input.value.trim().toLowerCase();
  const correct  = q.ans.toLowerCase();
  // Aceptar si coincide exactamente o incluye la primera palabra clave
  const isCorrect = userAns === correct || userAns.includes(correct.split(' ')[0]);

  answered = true;
  input.classList.add(isCorrect ? 'correct-input' : 'wrong-input');
  input.disabled = true;

  if (isCorrect) score++;
  else {
    hearts = Math.max(0, hearts - 1);
    if (hearts <= 0) { setTimeout(() => renderGameOver(), 1200); return; }
  }

  showFeedback(isCorrect, `Respuesta correcta: "${q.ans}". ${q.exp}`);
  document.getElementById('qnext')?.classList.add('show');
}

function addWord(btn, word) {
  if (btn.classList.contains('used')) return;
  btn.classList.add('used');
  wordbankSentence.push(word);

  const area = document.getElementById('sentence-area');
  area.innerHTML = wordbankSentence.length
    ? wordbankSentence.join(' ')
    : '<span style="color:var(--mid);font-size:.9rem;">Haz clic en las palabras...</span>';
}

function checkWordbank() {
  if (answered) return;

  const q        = currentQuiz[currentQ];
  const userAns  = wordbankSentence.join(' ').trim().toLowerCase();
  const correct  = q.ans.toLowerCase();
  const isCorrect = userAns === correct;

  answered = true;
  if (isCorrect) score++;
  else {
    hearts = Math.max(0, hearts - 1);
    if (hearts <= 0) { setTimeout(() => renderGameOver(), 1200); return; }
  }

  showFeedback(isCorrect, q.exp);
  document.getElementById('qnext')?.classList.add('show');
}

function showFeedback(correct, explanation) {
  const fb = document.getElementById('qfeedback');
  if (!fb) return;
  fb.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');
  fb.innerHTML = `
    <div class="feedback-title">${correct ? '✅ ¡Correcto!' : '❌ ¡Casi!'}</div>
    <div class="feedback-body">${explanation}</div>
  `;
}

function nextQuestion() {
  wordbankSentence = [];
  currentQ++;
  if (currentQ >= currentQuiz.length) renderResult();
  else renderQuestion();
}

// -------- Pantalla de Game Over --------

function renderGameOver() {
  document.getElementById('quiz-content').innerHTML = `
    <div class="quiz-result">
      <div class="result-emoji">💔</div>
      <div class="result-title">¡Te quedaste sin vidas!</div>
      <div class="result-sub">No te preocupes, puedes intentarlo de nuevo. ¡Tú puedes!</div>
      <div class="result-stats">
        <div class="result-stat">
          <div class="result-stat-num">${score}/${currentQuiz.length}</div>
          <div class="result-stat-label">Correctas</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-num">${currentQ + 1}/${currentQuiz.length}</div>
          <div class="result-stat-label">Progreso</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-num">0❤️</div>
          <div class="result-stat-label">Vidas</div>
        </div>
      </div>
      <div class="result-btns">
        <button
          class="btn-hero btn-primary"
          style="background:var(--green1); color:white;"
          onclick="startQuiz('${quizType}')"
        >🔄 Reintentar lección</button>
        <button
          class="btn-hero"
          style="background:#f1f5f9; color:var(--dark);"
          onclick="showPage('lecciones')"
        >← Volver a lecciones</button>
      </div>
    </div>
  `;
}

// -------- Pantalla de resultado --------

function renderResult() {
  const pct   = Math.round((score / currentQuiz.length) * 100);
  const xp    = score * 10;
  const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪';
  const title = pct >= 80 ? '¡Excelente trabajo!' : pct >= 50 ? '¡Bien hecho!' : '¡Sigue practicando!';

  document.getElementById('quiz-content').innerHTML = `
    <div class="quiz-result">
      <div class="result-emoji">${emoji}</div>
      <div class="result-title">${title}</div>
      <div class="result-sub">Completaste el ejercicio</div>
      <div class="result-stats">
        <div class="result-stat">
          <div class="result-stat-num">${score}/${currentQuiz.length}</div>
          <div class="result-stat-label">Correctas</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-num">${pct}%</div>
          <div class="result-stat-label">Precisión</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-num">+${xp}</div>
          <div class="result-stat-label">XP ganados</div>
        </div>
        <div class="result-stat">
          <div class="result-stat-num">${hearts}❤️</div>
          <div class="result-stat-label">Vidas</div>
        </div>
      </div>
      <div class="result-btns">
        <button
          class="btn-hero btn-primary"
          style="background:var(--green1); color:white;"
          onclick="startQuiz('${quizType}')"
        >🔄 Repetir</button>
        <button
          class="btn-hero"
          style="background:#f1f5f9; color:var(--dark);"
          onclick="showPage('practica')"
        >← Práctica</button>
      </div>
    </div>
  `;
}
