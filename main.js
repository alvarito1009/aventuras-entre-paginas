import { initRouter, goTo } from './router.js';
import { completeAdventure, isCompleted, getStarCount } from './progress.js';

const ADVENTURES = [
  { id: 'leo',      icon: '🗝️', title: 'Leo y el tesoro perdido',          text: 'Resuelve tres acertijos y abre el cofre.' },
  { id: 'emma',     icon: '📔', title: 'El diario secreto de Emma',         text: 'Elige con cariño en tres situaciones.' },
  { id: 'nico',     icon: '🎈', title: 'La fiesta sorpresa de Nico',        text: 'Compra con tu presupuesto y cuida cada moneda.' },
  { id: 'victoria', icon: '🧵', title: 'El taller de moda de Victoria',     text: 'Combina prendas para tres retos.' },
  { id: 'bruno',    icon: '🛡️', title: 'Las aventuras del caballero Bruno', text: 'Lee tres escenas y responde.' },
];
const app = document.getElementById('app');
const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

function renderHome() {
  const n = getStarCount();
  app.innerHTML = `
    <header>
      <h1>Aventuras entre páginas</h1>
      <p class="intro">Elige una aventura. Complétala y gana una estrella.</p>
      <p class="estrellas" role="status"><span class="fila" aria-hidden="true">${stars(n)}</span><span>${n} de 5 estrellas</span></p>
    </header>
    <ul class="tarjetas">
      ${ADVENTURES.map(a => `
        <li><a class="tarjeta" style="--color:var(--c-${a.id})" href="#${a.id}">
          <span class="icono" aria-hidden="true">${a.icon}</span>
          <h2>${a.title}</h2><p>${a.text}</p>
          <span class="hecho">${isCompleted(a.id) ? '★ ¡Completada!' : 'Jugar'}</span>
        </a></li>`).join('')}
    </ul>
    ${n === 5
      ? '<a class="btn" href="#diploma">Ver mi diploma</a>'
      : '<span class="btn suave" aria-disabled="true">Diploma: reúne las 5 estrellas</span>'}`;
}

async function renderGame(id) {
  const adv = ADVENTURES.find(a => a.id === id);
  app.innerHTML = '<div id="juego"></div>';
  try {
    const mod = await import(`./${id}.js`);
    mod.start(document.getElementById('juego'), {
      onComplete: () => { completeAdventure(id); renderResult(adv); },
      onExit: () => goTo('home'),
    });
  } catch (e) {
    app.innerHTML = `<section class="panel"><h1>Esta aventura no está disponible</h1>
      <p>Vuelve al menú y prueba otra.</p><a class="btn" href="#home">Volver al menú</a></section>`;
  }
}

function renderResult(adv) {
  app.innerHTML = `<section class="panel"><h1>¡Aventura completada!</h1>
    <p>${adv.title}: ganaste una estrella (${getStarCount()} de 5).</p>
    <a class="btn" href="#home">Volver al menú</a></section>`;
}

function renderDiploma() {
  if (getStarCount() < 5) { goTo('home'); return; }
  app.innerHTML = `
    <section class="diploma"><h1>Diploma de aventurero</h1>
      <p class="fila" aria-hidden="true">★★★★★</p>
      <p>Completó las cinco aventuras</p>
      <p><strong id="nombre-diploma"></strong></p></section>
    <div class="no-imprimir panel">
      <label for="nombre">Nombre (opcional, solo se usa para imprimir)</label><br>
      <input id="nombre" maxlength="40" autocomplete="off">
      <p><button class="btn" id="imprimir">Imprimir diploma</button>
      <a class="btn suave" href="#home">Volver al menú</a></p></div>`;
  const nombre = document.getElementById('nombre'), out = document.getElementById('nombre-diploma');
  nombre.oninput = () => { out.textContent = nombre.value; }; // no se guarda en ningún lado
  document.getElementById('imprimir').onclick = () => window.print();
}

initRouter(route => {
  if (route === 'home') renderHome();
  else if (route === 'diploma') renderDiploma();
  else renderGame(route);
  app.focus({ preventScroll: true }); window.scrollTo(0, 0);
});
