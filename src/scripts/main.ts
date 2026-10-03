/**
 * Interactions communes à toutes les pages.
 */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- Apparition des éléments au défilement ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
);
document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

/* ---------- En-tête : effet "pilule" + masquage en descendant ---------- */
const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');
const backToTop = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
let menuOpen = false;
let lastY = window.scrollY;
let ticking = false;

function onScrollFrame() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  const goingDown = y > lastY + 4;
  const goingUp = y < lastY - 4;
  if (goingDown && y > 700 && !menuOpen) header?.classList.add('is-hidden');
  else if (goingUp || y < 700) header?.classList.remove('is-hidden');
  lastY = y;

  if (backToTop) {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    backToTop.style.setProperty('--progress', String(max > 0 ? Math.min(1, y / max) : 0));
    backToTop.classList.toggle('is-visible', y > 500);
  }
  updateTimeline();
  ticking = false;
}
window.addEventListener(
  'scroll',
  () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScrollFrame);
    }
  },
  { passive: true },
);

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
});

/* ---------- Menu mobile ---------- */
function setMenu(open: boolean) {
  if (!menuToggle || !mobileMenu) return;
  menuOpen = open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  mobileMenu.classList.toggle('is-open', open);
  mobileMenu.inert = !open;
  document.body.classList.toggle('no-scroll', open);
  header?.classList.remove('is-hidden');
}
menuToggle?.addEventListener('click', () => setMenu(!menuOpen));
document.querySelectorAll('[data-mobile-link]').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOpen) {
    setMenu(false);
    menuToggle?.focus();
  }
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------- Lien actif (menu + fil conducteur) selon la section visible ---------- */
const navLinks = document.querySelectorAll<HTMLAnchorElement>('[data-nav]');
const railLinks = document.querySelectorAll<HTMLAnchorElement>('[data-rail]');
const trackedSections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
if (trackedSections.length && (navLinks.length || railLinks.length)) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.dataset.nav === id));
        railLinks.forEach((a) => {
          const active = a.dataset.rail === id;
          a.classList.toggle('is-active', active);
          if (active) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  trackedSections.forEach((s) => sectionObserver.observe(s));
}

/* ---------- Cartes repliées sur mobile ("Voir toutes les cartes") ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-collapse-toggle]').forEach((btn) => {
  const target = document.getElementById(btn.getAttribute('aria-controls') ?? '');
  const label = btn.querySelector('[data-label]');
  if (!target || !label) return;
  btn.addEventListener('click', () => {
    const next = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(next));
    target.classList.toggle('is-expanded', next);
    label.textContent = next ? btn.dataset.less ?? 'Réduire' : btn.dataset.more ?? 'Voir toutes les cartes';
    if (!next) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

/* ---------- Halo lumineux qui suit la souris sur les cartes ---------- */
if (finePointer) {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- Parallaxe douce de l'illustration d'accueil ---------- */
const parallaxRoot = document.querySelector<HTMLElement>('[data-parallax-root]');
if (parallaxRoot && finePointer && !reduceMotion) {
  parallaxRoot.addEventListener('pointermove', (e) => {
    const r = parallaxRoot.getBoundingClientRect();
    parallaxRoot.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    parallaxRoot.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
  parallaxRoot.addEventListener('pointerleave', () => {
    parallaxRoot.style.setProperty('--px', '0');
    parallaxRoot.style.setProperty('--py', '0');
  });
}

/* ---------- Frise du parcours client, pilotée par le défilement ---------- */
const timeline = document.querySelector<HTMLElement>('[data-timeline]');
const tlSteps = timeline ? [...timeline.querySelectorAll<HTMLElement>('[data-step]')] : [];
const tlNodes = tlSteps.map((s) => s.querySelector<HTMLElement>('[data-node]')!);
let tlVertical = false;
let tlStart = 0;
let tlLength = 1;
let tlThresholds: number[] = [];

function measureTimeline() {
  if (!timeline || tlNodes.length < 2) return;
  const box = timeline.getBoundingClientRect();
  const centers = tlNodes.map((n) => {
    const r = n.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  });
  const first = centers[0];
  const last = centers[centers.length - 1];
  tlVertical = Math.abs(last.x - first.x) < 4;
  tlStart = tlVertical ? first.y : first.x;
  tlLength = Math.max(1, (tlVertical ? last.y : last.x) - tlStart);
  tlThresholds = centers.map((c) => ((tlVertical ? c.y : c.x) - tlStart) / tlLength);
  timeline.dataset.orientation = tlVertical ? 'vertical' : 'horizontal';
  timeline.style.setProperty('--tl-x', `${first.x}px`);
  timeline.style.setProperty('--tl-y', `${first.y}px`);
  timeline.style.setProperty('--tl-len', `${tlLength}px`);
  updateTimeline();
}

function updateTimeline() {
  if (!timeline || !tlThresholds.length) return;
  const box = timeline.getBoundingClientRect();
  const vh = window.innerHeight;
  let p: number;
  if (reduceMotion) p = 1;
  else if (tlVertical) p = (vh * 0.62 - (box.top + tlStart)) / tlLength;
  else p = (vh * 0.85 - box.top) / (vh * 0.5);
  p = Math.min(1, Math.max(0, p));
  timeline.style.setProperty('--p', p.toFixed(4));
  tlSteps.forEach((step, i) => step.classList.toggle('is-active', p > 0 && p >= tlThresholds[i] - 0.002));
}

if (timeline) {
  new ResizeObserver(measureTimeline).observe(timeline);
  document.fonts?.ready.then(measureTimeline);
  measureTimeline();
}

/* ---------- Année du pied de page ---------- */
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

onScrollFrame();
