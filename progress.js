// Contrato de progreso v1. Único módulo que escribe en localStorage.
const KEY = 'aventurasEntrePaginas.progress.v1';
export const ADVENTURE_IDS = ['leo', 'emma', 'nico', 'victoria', 'bruno'];
const initial = () => ({ version: 1, completed: Object.fromEntries(ADVENTURE_IDS.map(id => [id, false])) });
function save(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch (e) { /* sin almacenamiento */ } }
export function loadProgress() {
  const p = initial();
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    if (data && data.version === 1 && data.completed) {
      ADVENTURE_IDS.forEach(id => { p.completed[id] = data.completed[id] === true; });
    }
  } catch (e) { /* vacío o corrupto: estado inicial */ }
  return p;
}
export function completeAdventure(id) {
  if (!ADVENTURE_IDS.includes(id)) return;
  const p = loadProgress(); p.completed[id] = true; save(p);
}
export const isCompleted = id => loadProgress().completed[id] === true;
export const getStarCount = () => Object.values(loadProgress().completed).filter(Boolean).length;
export function resetProgress() { save(initial()); }
