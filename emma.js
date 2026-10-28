import { renderPlaceholder } from './placeholder.js';
// Contrato: start(container, { onComplete, onExit })
export function start(container, callbacks) {
  renderPlaceholder(container, callbacks, 'El diario secreto de Emma');
}
