/**
 * Calcul du diagnostic de gestion, partagé par la page du diagnostic et le rapport remis au client.
 * Le résultat ne dépend que des réponses : il peut donc être recalculé à partir d'un simple code
 * (lien « Rapport » envoyé à Nadège), sans aucune donnée personnelle.
 */
import {
  activites,
  chiffresAffaires,
  domains,
  effectifs,
  hoursPerDay,
  hoursPerWeek,
  invoiceLagDays,
  levels,
  paymentDays,
  questions,
  targetDays,
  workWeeks,
  type DomainId,
} from '../data/diagnostic';

export type Level = 'high' | 'mid' | 'low';

export interface DiagnosticInput {
  answers: Record<string, number>;
  activite?: string;
  effectif?: string;
  /** Index de la tranche de chiffre d'affaires */
  ca?: number;
}

export const levelLabel: Record<Level, string> = { high: 'Point fort', mid: 'À consolider', low: 'Prioritaire' };

export function levelOf(pct: number): Level {
  return pct >= 75 ? 'high' : pct >= 45 ? 'mid' : 'low';
}

export function roundMoney(v: number) {
  const step = v < 1000 ? 100 : v < 10000 ? 500 : 1000;
  return Math.round(v / step) * step;
}

export const money = (v: number) => `${new Intl.NumberFormat('fr-FR').format(v)} €`;

export function computeDiagnostic(input: DiagnosticInput) {
  const { answers } = input;
  const items = questions.map((q) => {
    const opt = q.options[answers[q.id]];
    return { q, score: opt ? opt.score : null, answer: opt?.label ?? '—' };
  });
  const dom = domains.map((d) => {
    const own = items.filter((x) => x.q.domain === d.id && x.score !== null);
    const sum = own.reduce((a, x) => a + (x.score ?? 0), 0);
    const pct = own.length ? Math.round((sum / (own.length * 3)) * 100) : 100;
    return { d, pct, level: levelOf(pct), todo: own.filter((x) => (x.score ?? 3) < 3).length };
  });
  const pctOf = (id: DomainId) => dom.find((x) => x.d.id === id)!.pct;
  const global = Math.round(dom.reduce((a, x) => a + x.pct, 0) / dom.length);
  const level = levels.find((l) => global >= l.min)!;
  const todo = items
    .filter((x) => x.score !== null && x.score < 3)
    .sort((a, b) => a.score! - b.score! || pctOf(a.q.domain) - pctOf(b.q.domain));
  const strengths = items.filter((x) => x.score === 3);

  // Temps administratif : par mois et en journées de travail par an
  const t = answers.temps;
  const hours = t === undefined ? null : Math.round(hoursPerWeek[t] * 4.33);
  const daysYear = t === undefined ? null : Math.round((hoursPerWeek[t] * workWeeks) / hoursPerDay);

  // Trésorerie qui dort chez les clients : jours de chiffre d'affaires au-delà d'une facture
  // envoyée tout de suite et payée à 30 jours
  const caValue = input.ca === undefined ? null : (chiffresAffaires[input.ca]?.value ?? null);
  const lag = invoiceLagDays[answers.facturation] ?? 0;
  const pay = paymentDays[answers.delai] ?? targetDays;
  const totalDays = lag + pay;
  const extraDays = Math.max(0, totalDays - targetDays);
  const cash = caValue === null ? null : roundMoney((caValue / 365) * extraDays);

  // Domaine prioritaire : le plus faible, s'il n'est pas déjà un point fort
  const weakest = [...dom].sort((a, b) => a.pct - b.pct)[0];
  const priority = weakest.level === 'high' ? null : weakest.d;

  return { items, dom, global, level, todo, strengths, hours, daysYear, cash, totalDays, priority, pctOf };
}

export type DiagnosticResult = ReturnType<typeof computeDiagnostic>;

/* ---------- Code compact du diagnostic (lien vers le rapport) ----------
   Format : 1-activité-effectif-CA-réponses-date  (index en chiffres, « x » = sans réponse, date en base 36)
   Exemple : 1-0-1-1-210320112101-mgx3k2a0 */

export function encodeDiagnostic(input: DiagnosticInput, date = Date.now()) {
  const idx = (list: string[], v?: string) => {
    const i = v === undefined ? -1 : list.indexOf(v);
    return i < 0 ? 'x' : String(i);
  };
  const act = idx(activites.map((a) => a.value), input.activite);
  const eff = idx(effectifs, input.effectif);
  const ca = input.ca === undefined ? 'x' : String(input.ca);
  const ans = questions.map((q) => (input.answers[q.id] === undefined ? 'x' : String(input.answers[q.id]))).join('');
  return `1-${act}-${eff}-${ca}-${ans}-${date.toString(36)}`;
}

export function decodeDiagnostic(code: string): { input: DiagnosticInput; date: Date } | null {
  const m = /^1-(\w)-(\w)-(\w)-([0-9x]+)-([0-9a-z]+)$/.exec(code.trim());
  if (!m || m[4].length !== questions.length) return null;
  const num = (c: string) => (c === 'x' ? undefined : Number(c));
  const answers: Record<string, number> = {};
  questions.forEach((q, i) => {
    const v = num(m[4][i]);
    if (v !== undefined && q.options[v]) answers[q.id] = v;
  });
  const a = num(m[1]);
  const e = num(m[2]);
  const ca = num(m[3]);
  return {
    input: {
      answers,
      activite: a === undefined ? undefined : activites[a]?.value,
      effectif: e === undefined ? undefined : effectifs[e],
      ca: ca !== undefined && chiffresAffaires[ca] ? ca : undefined,
    },
    date: new Date(parseInt(m[5], 36)),
  };
}

/* ---------- Proposition commerciale ---------- */

/** Formule d'accompagnement recommandée (titres identiques à `formulas` dans site.ts) */
export function recommendFormula(r: DiagnosticResult, input: DiagnosticInput) {
  const t = input.answers.temps ?? 0;
  const bigTeam = input.effectif === '6 à 10' || input.effectif === 'Plus de 10';
  if (t >= 2 || bigTeam || r.todo.length >= 8) {
    return {
      title: 'Temps partagé',
      reason:
        'L’administratif vous prend beaucoup de temps et plusieurs domaines sont à reprendre : une interlocutrice unique, quelques heures par semaine ou par mois, vous libère durablement sans recruter.',
    };
  }
  if (r.todo.length <= 3 && r.global >= 70) {
    return {
      title: 'Renfort ponctuel',
      reason:
        'Votre gestion est solide : une mission ciblée sur vos priorités suffit pour corriger les points faibles et vous faire gagner du temps rapidement.',
    };
  }
  return {
    title: 'Suivi régulier',
    reason:
      'Vos priorités demandent une mise en place puis un suivi dans la durée : un accompagnement mensuel installe les bonnes habitudes et sécurise les résultats.',
  };
}
