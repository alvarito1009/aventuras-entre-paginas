import { renderPlaceholder } from './_placeholder.js';
// Contrato: start(container, { onComplete, onExit })
export function start(container, callbacks) {
  renderPlaceholder(container, callbacks, 'La fiesta sorpresa de Nico');
}
