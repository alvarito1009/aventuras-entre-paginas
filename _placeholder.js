// Pantalla provisional. Con ?debug en la URL aparece un botón para probar las estrellas.
export function renderPlaceholder(container, callbacks, title) {
  const debug = location.search.includes('debug');
  container.innerHTML = `
    <section class="panel">
      <h1>${title}</h1>
      <p>Esta aventura todavía está en preparación. ¡Pronto podrás jugarla!</p>
      <p><button class="btn" data-exit>Volver al menú</button></p>
      ${debug ? '<p class="aviso"><button class="btn suave" data-done>Simular final (solo pruebas)</button></p>' : ''}
    </section>`;
  container.querySelector('[data-exit]').onclick = callbacks.onExit;
  const d = container.querySelector('[data-done]');
  if (d) d.onclick = callbacks.onComplete;
}
