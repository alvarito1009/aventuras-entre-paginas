// Router mínimo por hash: #home, #leo, #emma, #nico, #victoria, #bruno, #diploma
const VALID = ['home', 'leo', 'emma', 'nico', 'victoria', 'bruno', 'diploma'];
export const currentRoute = () => { const r = location.hash.slice(1); return VALID.includes(r) ? r : 'home'; };
export const goTo = r => { location.hash = r; };
export function initRouter(onChange) {
  window.addEventListener('hashchange', () => onChange(currentRoute()));
  onChange(currentRoute());
}
