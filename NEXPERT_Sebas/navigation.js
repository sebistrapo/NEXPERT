// ============================
//  js/navigation.js
//  Manejo de rutas / páginas
// ============================

/**
 * Muestra una página y oculta las demás.
 * @param {string} pageId - 'home' | 'lecciones' | 'lesson-detail' | 'practica' | 'quiz' | 'ranking'
 */
function showPage(pageId) {
  // Ocultar todas las páginas
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Mostrar la página solicitada
  const target = document.getElementById(pageId + '-page');
  if (target) {
    target.classList.add('active');
  } else {
    console.warn('Página no encontrada:', pageId);
    return;
  }

  // Actualizar estado activo en navegación
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const text = link.textContent.toLowerCase();
    if (
      (pageId === 'lecciones'      && text.includes('lecci'))  ||
      (pageId === 'lesson-detail'  && text.includes('lecci'))  ||
      (pageId === 'practica'       && text.includes('pr'))     ||
      (pageId === 'quiz'           && text.includes('pr'))     ||
      (pageId === 'ranking'        && text.includes('rank'))
    ) {
      link.classList.add('active');
    }
  });

  // Ir al tope de la página
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
