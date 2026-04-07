// ============================
//  js/ranking.js
//  Renderiza el ranking y pódium
// ============================

const RANKING_DATA = {
  weekly: [
    { pos: 1,  avatar: '🦁', bg: '#fef9c3', name: 'SofiaR',  streak: 28, xp: 1240 },
    { pos: 2,  avatar: '🐯', bg: '#f1f5f9', name: 'CarlosM', streak: 14, xp:  890 },
    { pos: 3,  avatar: '🐺', bg: '#fff7ed', name: 'PedroK',  streak:  9, xp:  760 },
    { pos: 4,  avatar: '🦊', bg: '#faf5ff', name: 'LunaV',   streak:  5, xp:  640 },
    { pos: 5,  avatar: '🐸', bg: '#f0fdf4', name: 'AndresT', streak:  3, xp:  520 },
    { pos: 6,  avatar: '🦋', bg: '#eff6ff', name: 'MariaP',  streak:  7, xp:  410 },
    { pos: 7,  avatar: '🐉', bg: '#fef2f2', name: 'JuanD',   streak:  2, xp:  380 },
    { pos: 8,  avatar: '😊', bg: '#dcfce7', name: 'Tú ←',    streak:  0, xp:    0, isMe: true }
  ],
  monthly: [
    { pos: 1,  avatar: '🦅', bg: '#fef9c3', name: 'RicardoG', streak: 30, xp: 4800 },
    { pos: 2,  avatar: '🦁', bg: '#f1f5f9', name: 'SofiaR',   streak: 28, xp: 4200 },
    { pos: 3,  avatar: '🐯', bg: '#fff7ed', name: 'CarlosM',  streak: 20, xp: 3600 },
    { pos: 4,  avatar: '🦊', bg: '#faf5ff', name: 'LunaV',    streak: 15, xp: 2800 },
    { pos: 5,  avatar: '🐺', bg: '#f0fdf4', name: 'PedroK',   streak: 12, xp: 2400 },
    { pos: 6,  avatar: '😊', bg: '#dcfce7', name: 'Tú ←',     streak:  0, xp:    0, isMe: true }
  ],
  alltime: [
    { pos: 1,  avatar: '👑', bg: '#fef9c3', name: 'MasterX',  streak: 365, xp: 52000 },
    { pos: 2,  avatar: '🦅', bg: '#f1f5f9', name: 'RicardoG', streak: 120, xp: 38000 },
    { pos: 3,  avatar: '🌟', bg: '#fff7ed', name: 'ElenaP',   streak: 90,  xp: 29000 },
    { pos: 4,  avatar: '🦁', bg: '#faf5ff', name: 'SofiaR',   streak: 60,  xp: 18000 },
    { pos: 5,  avatar: '🐯', bg: '#f0fdf4', name: 'CarlosM',  streak: 45,  xp: 12000 },
    { pos: 6,  avatar: '😊', bg: '#dcfce7', name: 'Tú ←',     streak:  0,  xp:     0, isMe: true }
  ]
};

let currentRankTab = 'weekly';

/** Renderiza todo el contenido de ranking */
function renderRanking() {
  const section = document.getElementById('ranking-section');
  if (!section) return;

  section.innerHTML = `
    ${buildTabsHTML()}
    ${buildPodiumHTML(currentRankTab)}
    <div class="rank-list" id="rank-list">
      ${buildRankListHTML(currentRankTab)}
    </div>
    <div class="ranking-cta">
      <div style="font-family:'Fredoka One',cursive; font-size:1.2rem; color:var(--green2); margin-bottom:6px;">¡Empieza a practicar!</div>
      <div style="font-size:.9rem; color:var(--mid); font-weight:600; margin-bottom:14px;">Completa ejercicios para ganar XP y escalar en el ranking</div>
      <button class="start-lesson-btn" style="max-width:300px; font-size:1rem;" onclick="showPage('practica')">
        🎯 Ir a Práctica
      </button>
    </div>
  `;
}

/** Cambia de pestaña de ranking */
function switchRankTab(btn, type) {
  document.querySelectorAll('.rtab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  currentRankTab = type;

  // Actualizar pódium y lista sin re-renderizar todo
  const section = document.getElementById('ranking-section');
  const podiumEl = section.querySelector('.podium');
  if (podiumEl) podiumEl.outerHTML = buildPodiumHTML(type);

  const listEl = document.getElementById('rank-list');
  if (listEl) listEl.innerHTML = buildRankListHTML(type);
}

// -------- Builders --------

function buildTabsHTML() {
  return `
    <div class="ranking-tabs">
      <button class="rtab active" onclick="switchRankTab(this,'weekly')">Semanal</button>
      <button class="rtab" onclick="switchRankTab(this,'monthly')">Mensual</button>
      <button class="rtab" onclick="switchRankTab(this,'alltime')">Todo el tiempo</button>
    </div>
  `;
}

function buildPodiumHTML(tab) {
  const data  = RANKING_DATA[tab];
  const top3  = data.filter(r => !r.isMe).slice(0, 3);
  const [p1, p2, p3] = top3;

  return `
    <div class="podium">
      <div class="podium-place p2">
        <div class="podium-avatar" style="background:${p2.bg};">${p2.avatar}</div>
        <div class="podium-name">${p2.name}</div>
        <div class="podium-xp">${p2.xp.toLocaleString()} XP</div>
        <div class="podium-bar">2</div>
      </div>
      <div class="podium-place p1">
        <div class="podium-avatar" style="background:${p1.bg}; width:66px; height:66px;">${p1.avatar}</div>
        <div class="podium-name">${p1.name}</div>
        <div class="podium-xp">${p1.xp.toLocaleString()} XP</div>
        <div class="podium-bar">1</div>
      </div>
      <div class="podium-place p3">
        <div class="podium-avatar" style="background:${p3.bg};">${p3.avatar}</div>
        <div class="podium-name">${p3.name}</div>
        <div class="podium-xp">${p3.xp.toLocaleString()} XP</div>
        <div class="podium-bar">3</div>
      </div>
    </div>
  `;
}

function buildRankListHTML(tab) {
  const data = RANKING_DATA[tab];
  return data.map(r => `
    <div class="rank-item ${r.isMe ? 'me' : ''}">
      <div class="rank-pos" style="${r.isMe ? 'color:var(--green1);' : ''}">${r.pos}</div>
      <div class="rank-avatar" style="background:${r.bg};">${r.avatar}</div>
      <div class="rank-name" style="${r.isMe ? 'color:var(--green2);' : ''}">${r.name}</div>
      <div class="rank-streak">🔥 ${r.streak} días</div>
      <div class="rank-xp" style="${r.isMe ? 'color:var(--green1);' : ''}">${r.xp.toLocaleString()} XP</div>
    </div>
  `).join('');
}
