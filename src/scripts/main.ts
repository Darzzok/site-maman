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
window.matchMedia('(min-width: 1200px)').addEventListener('change', (e) => e.matches && setMenu(false));

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

/* ---------- Frise du parcours client : défilement automatique ---------- */
const timeline = document.querySelector<HTMLElement>('[data-timeline]');
const tlSteps = timeline ? [...timeline.querySelectorAll<HTMLElement>('[data-step]')] : [];
const tlNodes = tlSteps.map((s) => s.querySelector<HTMLElement>('[data-node]')!);
const tlPrev = document.querySelector<HTMLButtonElement>('[data-tl-prev]');
const tlNext = document.querySelector<HTMLButtonElement>('[data-tl-next]');
const tlPlay = document.querySelector<HTMLButtonElement>('[data-tl-play]');
const tlCurrent = document.querySelector<HTMLElement>('[data-tl-current]');
const tlTimerBar = document.querySelector<HTMLElement>('[data-tl-timer]');
const tlZone = timeline?.closest('section') ?? timeline;
const tlLast = tlSteps.length - 1;

// Rythme : le temps de lire une carte, une pause plus longue à la fin, puis reprise après un clic
const TL_STEP_MS = 4500;
const TL_END_MS = 6500;
const TL_RESUME_MS = 9000;

let tlThresholds: number[] = [];
let tlIndex = reduceMotion ? tlLast : -1; // -1 : la frise n'a pas encore démarré
let tlInView = false;
let tlHover = false;
let tlFocus = false;
let tlUserPaused = false;
let tlHold = false;
let tlTimer = 0;
let tlHoldTimer = 0;

function measureTimeline() {
  if (!timeline || tlNodes.length < 2) return;
  const box = timeline.getBoundingClientRect();
  const centers = tlNodes.map((n) => {
    const r = n.getBoundingClientRect();
    return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
  });
  const first = centers[0];
  const last = centers[centers.length - 1];
  const vertical = Math.abs(last.x - first.x) < 4;
  const startPos = vertical ? first.y : first.x;
  const length = Math.max(1, (vertical ? last.y : last.x) - startPos);
  tlThresholds = centers.map((c) => ((vertical ? c.y : c.x) - startPos) / length);
  timeline.dataset.orientation = vertical ? 'vertical' : 'horizontal';
  timeline.style.setProperty('--tl-x', `${first.x}px`);
  timeline.style.setProperty('--tl-y', `${first.y}px`);
  timeline.style.setProperty('--tl-len', `${length}px`);
  renderTimeline();
}

function renderTimeline() {
  if (!timeline || !tlThresholds.length) return;
  const p = tlIndex < 0 ? 0 : Math.max(0.001, tlThresholds[tlIndex]);
  timeline.style.setProperty('--p', p.toFixed(4));
  tlSteps.forEach((step, i) => {
    step.classList.toggle('is-active', i <= tlIndex);
    step.classList.toggle('is-current', i === tlIndex);
  });
  if (tlCurrent) tlCurrent.textContent = String(Math.max(0, tlIndex) + 1);
  if (tlPrev) tlPrev.disabled = tlIndex <= 0;
  if (tlNext) tlNext.disabled = tlIndex === tlLast;
}

const tlCanPlay = () =>
  !reduceMotion && tlInView && !tlHover && !tlFocus && !tlUserPaused && !tlHold && !document.hidden;

/** Programme l'étape suivante et anime la barre de progression */
function scheduleTimeline() {
  window.clearTimeout(tlTimer);
  timeline?.classList.toggle('is-playing', tlCanPlay());
  if (!tlCanPlay()) return;
  const delay = tlIndex === tlLast ? TL_END_MS : TL_STEP_MS;
  if (tlTimerBar) {
    tlTimerBar.style.animation = 'none';
    void tlTimerBar.offsetWidth; // relance l'animation
    tlTimerBar.style.animation = `tl-timer ${delay}ms linear forwards`;
  }
  tlTimer = window.setTimeout(() => {
    tlIndex = tlIndex >= tlLast ? 0 : tlIndex + 1;
    renderTimeline();
    scheduleTimeline();
  }, delay);
}

/** Choix manuel : l'autoplay se met en pause quelques secondes */
function goToStep(index: number) {
  tlIndex = Math.max(0, Math.min(tlLast, index));
  renderTimeline();
  tlHold = true;
  window.clearTimeout(tlHoldTimer);
  tlHoldTimer = window.setTimeout(() => {
    tlHold = false;
    scheduleTimeline();
  }, TL_RESUME_MS);
  scheduleTimeline();
}

function setUserPaused(paused: boolean) {
  tlUserPaused = paused;
  if (tlPlay) {
    tlPlay.setAttribute('aria-pressed', String(paused));
    tlPlay.setAttribute('aria-label', paused ? 'Reprendre le défilement automatique' : 'Mettre en pause le défilement automatique');
    tlPlay.classList.toggle('is-paused', paused);
  }
  scheduleTimeline();
}

if (timeline) {
  new ResizeObserver(measureTimeline).observe(timeline);
  document.fonts?.ready.then(measureTimeline);
  measureTimeline();

  tlNodes.forEach((node, i) => node.addEventListener('click', () => goToStep(i)));
  tlPrev?.addEventListener('click', () => goToStep(tlIndex - 1));
  tlNext?.addEventListener('click', () => goToStep(tlIndex + 1));
  tlPlay?.addEventListener('click', () => setUserPaused(!tlUserPaused));
  if (reduceMotion && tlPlay) tlPlay.hidden = true;

  // Démarre quand la frise est bien visible, s'arrête quand elle sort de l'écran
  new IntersectionObserver(
    ([entry]) => {
      tlInView = entry.isIntersecting;
      if (tlInView && tlIndex < 0) {
        window.setTimeout(() => {
          if (tlIndex < 0) {
            tlIndex = 0;
            renderTimeline();
          }
          scheduleTimeline();
        }, 500);
      } else scheduleTimeline();
    },
    { threshold: 0.45 },
  ).observe(timeline);

  // Pause au survol (souris) et pendant la navigation au clavier
  if (finePointer) {
    timeline.addEventListener('pointerenter', () => {
      tlHover = true;
      scheduleTimeline();
    });
    timeline.addEventListener('pointerleave', () => {
      tlHover = false;
      scheduleTimeline();
    });
  }
  tlZone?.addEventListener('focusin', (e) => {
    tlFocus = (e.target as HTMLElement).matches(':focus-visible') && e.target !== tlPlay;
    scheduleTimeline();
  });
  tlZone?.addEventListener('focusout', () => {
    tlFocus = false;
    scheduleTimeline();
  });
  document.addEventListener('visibilitychange', scheduleTimeline);
}

/* ---------- Année du pied de page ---------- */
document.querySelectorAll('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

onScrollFrame();
