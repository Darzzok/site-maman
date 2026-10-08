/**
 * Cadran d'exemple du diagnostic : un nouveau score est tiré au hasard à chaque cycle et le cadran
 * glisse d'une valeur à l'autre (accueil de la page diagnostic et bandeau de la page d'accueil).
 * L'animation ne tourne que lorsque le cadran est visible.
 */
interface DemoDialOptions {
  /** Élément observé : l'animation s'arrête quand il sort de l'écran */
  root: Element;
  /** Cercle SVG de la jauge (pathLength = 100, arc de 75 %) */
  circle: SVGCircleElement;
  num: HTMLElement;
  /** Barres facultatives (domaines), dont la largeur varie autour du score */
  bars?: HTMLElement[];
  min?: number;
  max?: number;
  /** Durée d'un cycle en millisecondes */
  period?: number;
}

export function startDemoDial({ root, circle, num, bars = [], min = 34, max = 92, period = 4200 }: DemoDialOptions) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = 0;
  let raf = 0;

  const set = (v: number) => {
    circle.style.strokeDasharray = `${(v * 0.75).toFixed(2)} 100`;
    num.textContent = String(Math.round(v));
  };
  // Nouveau score suffisamment différent du précédent pour que le changement se voie
  const pick = () => {
    let v = current;
    while (Math.abs(v - current) < 15) v = min + Math.round(Math.random() * (max - min));
    return v;
  };

  function next() {
    const from = current;
    const to = pick();
    current = to;
    bars.forEach((b) => {
      const w = Math.max(14, Math.min(96, to + Math.round(Math.random() * 50 - 25)));
      b.style.width = `${w}%`;
    });
    if (reduce || document.hidden) return set(to);
    const t0 = performance.now();
    const ms = 1500;
    cancelAnimationFrame(raf);
    const tick = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      set(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function loop() {
    next();
    if (!reduce) timer = window.setTimeout(loop, period);
  }

  set(0);
  new IntersectionObserver(([entry]) => {
    window.clearTimeout(timer);
    if (!entry.isIntersecting) return;
    if (reduce && current) return; // une seule valeur, sans animation
    loop();
  }).observe(root);
}
