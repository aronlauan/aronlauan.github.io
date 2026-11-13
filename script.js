document.getElementById('year').textContent = new Date().getFullYear();

const root = document.documentElement;
document.getElementById('theme-toggle').addEventListener('click', () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = isDark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Tabs: show one section at a time, driven by the URL hash (#about, #projects, …)
// so links, refresh, and the back button all work. Without JS, the page stays one long scroll.
root.classList.add('tabbed');
const panels = [...document.querySelectorAll('main > section[id]')];
const ids = panels.map((p) => p.id);
const links = document.querySelectorAll('.nav nav a');
let current = null;

function show(id) {
  if (!ids.includes(id)) id = ids[0];
  if (id === current) return;
  const dir = current && ids.indexOf(id) < ids.indexOf(current) ? 'enter-left' : 'enter-right';
  panels.forEach((p) => {
    const on = p.id === id;
    p.hidden = !on;
    p.classList.remove('enter-left', 'enter-right');
    if (on && current) { void p.offsetWidth; p.classList.add(dir); }
  });
  links.forEach((a) => {
    const on = a.getAttribute('href') === '#' + id;
    a.classList.toggle('active', on);
    if (on) { a.setAttribute('aria-current', 'page'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    else a.removeAttribute('aria-current');
  });
  current = id;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function step(n) {
  const i = ids.indexOf(current) + n;
  if (i >= 0 && i < ids.length) location.hash = ids[i];
}

// Paginated highlights inside a card (fixed height, so nothing jumps around)
document.querySelectorAll('.pages').forEach((wrap) => {
  const pages = [...wrap.querySelectorAll('.page')];
  const pager = wrap.parentElement.querySelector('.pager');
  const [prev, next] = pager.querySelectorAll('.pager-btn');
  const count = pager.querySelector('.pager-count');
  let i = 0;
  const go = (n) => {
    i = Math.max(0, Math.min(pages.length - 1, n));
    pages.forEach((p, k) => { p.classList.toggle('active', k === i); p.toggleAttribute('inert', k !== i); });
    count.textContent = `${i + 1} / ${pages.length}`;
    prev.disabled = i === 0;
    next.disabled = i === pages.length - 1;
  };
  prev.addEventListener('click', () => go(i - 1));
  next.addEventListener('click', () => go(i + 1));
  pager.hidden = false;
  go(0);
});

addEventListener('hashchange', () => show(location.hash.slice(1)));
show(location.hash.slice(1));

// Left/right arrow keys switch tabs
addEventListener('keydown', (e) => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
  if (e.target.closest('input, textarea, select, [contenteditable]')) return;
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});

// Horizontal swipe on touch screens switches tabs
let sx = 0, sy = 0;
const main = document.querySelector('main');
main.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
main.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
}, { passive: true });
