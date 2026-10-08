/**
 * Diagnostic de gestion (page /diagnostic-gestion.html)
 * ─────────────────────────────────────────────────────
 * 12 questions réparties en 4 domaines. Chaque réponse vaut de 0 à 3 points
 * (null = « non concerné », exclu du calcul). Le score d'un domaine est exprimé en %,
 * le score global est la moyenne des domaines.
 * - tip : « Bon à savoir » affiché après la réponse
 * - reco : recommandation proposée dans le plan d'action quand la réponse n'est pas la meilleure
 */

export type DomainId = 'tresorerie' | 'facturation' | 'organisation' | 'pilotage';

export interface Domain {
  id: DomainId;
  label: string;
  short: string;
  icon: string;
  /** Commentaire selon le niveau du domaine */
  comments: { high: string; mid: string; low: string };
}

export interface Question {
  id: string;
  domain: DomainId;
  text: string;
  /** Libellé court affiché dans « Vos points forts » */
  strength: string;
  options: { label: string; score: number | null }[];
  tip: string;
  reco: { title: string; text: string; help: string };
}

export const domains: Domain[] = [
  {
    id: 'tresorerie',
    label: 'Trésorerie',
    short: 'Trésorerie',
    icon: 'wallet',
    comments: {
      high: 'Votre trésorerie est suivie et anticipée : un vrai atout pour décider sereinement.',
      mid: 'Les bases sont là, mais la visibilité reste partielle : un prévisionnel et des encaissements plus rapides vous donneraient de l’air.',
      low: 'Votre trésorerie se subit plus qu’elle ne se pilote : c’est la priorité pour sécuriser votre activité.',
    },
  },
  {
    id: 'facturation',
    label: 'Facturation & relances',
    short: 'Facturation',
    icon: 'file',
    comments: {
      high: 'Facturation et relances sont maîtrisées : vous êtes payé(e) dans de bonnes conditions.',
      mid: 'Votre facturation fonctionne, mais des retards ou des relances irrégulières vous coûtent de la trésorerie.',
      low: 'Facturation tardive, relances rares : c’est de l’argent qui dort chez vos clients.',
    },
  },
  {
    id: 'organisation',
    label: 'Organisation administrative',
    short: 'Organisation',
    icon: 'list',
    comments: {
      high: 'Votre organisation administrative est efficace : peu de temps perdu, tout est à sa place.',
      mid: 'L’administratif vous prend un temps notable : quelques méthodes et outils vous feraient gagner des heures.',
      low: 'L’administratif déborde sur votre métier et vos soirées : il est temps de structurer et de déléguer.',
    },
  },
  {
    id: 'pilotage',
    label: 'Pilotage & personnel',
    short: 'Pilotage',
    icon: 'chart',
    comments: {
      high: 'Vous pilotez avec des chiffres fiables : vos décisions reposent sur du concret.',
      mid: 'Vous avez quelques repères, mais un suivi mensuel vous aiderait à anticiper.',
      low: 'Vous pilotez surtout à l’instinct : quelques indicateurs simples changeraient votre visibilité.',
    },
  },
];

export const questions: Question[] = [
  /* ---------- Trésorerie ---------- */
  {
    id: 'previsionnel',
    strength: 'Trésorerie anticipée',
    domain: 'tresorerie',
    text: 'Savez-vous aujourd’hui où en sera votre trésorerie dans 3 mois ?',
    options: [
      { label: 'Oui, j’ai un prévisionnel à jour', score: 3 },
      { label: 'À peu près, je l’estime de tête', score: 2 },
      { label: 'Je regarde surtout mon solde bancaire', score: 1 },
      { label: 'Non, je le découvre au fil de l’eau', score: 0 },
    ],
    tip: 'Un plan de trésorerie sur 3 à 6 mois permet d’anticiper un creux (TVA, charges sociales, saison basse) et d’en parler à temps avec votre banque.',
    reco: {
      title: 'Construire un plan de trésorerie à 3 mois',
      text: 'Listez vos encaissements attendus et vos dépenses certaines (salaires, Urssaf, TVA, loyers, crédits) semaine par semaine, puis mettez-le à jour chaque mois. Vous verrez les tensions venir au lieu de les subir.',
      help: 'Je construis votre plan de trésorerie et je le mets à jour avec vous chaque mois.',
    },
  },
  {
    id: 'delai',
    strength: 'Clients qui paient vite',
    domain: 'tresorerie',
    text: 'En moyenne, combien de temps vos clients mettent-ils à vous payer ?',
    options: [
      { label: 'Moins de 30 jours', score: 3 },
      { label: 'Entre 30 et 45 jours', score: 2 },
      { label: 'Plus de 45 jours', score: 1 },
      { label: 'Je ne sais pas vraiment', score: 0 },
    ],
    tip: 'Entre professionnels, le délai de paiement convenu ne peut pas dépasser 60 jours après la date de la facture (ou 45 jours fin de mois).',
    reco: {
      title: 'Réduire vos délais de paiement',
      text: 'Indiquez l’échéance et les pénalités sur chaque facture, proposez le virement ou le prélèvement, et demandez un acompte à la commande pour les montants importants. Chaque jour gagné, c’est de la trésorerie en plus.',
      help: 'Je revois vos conditions de paiement et je suis vos encaissements pour vous.',
    },
  },
  {
    id: 'impayes',
    strength: 'Aucun impayé ancien',
    domain: 'tresorerie',
    text: 'Avez-vous des factures impayées depuis plus de 60 jours ?',
    options: [
      { label: 'Aucune', score: 3 },
      { label: 'Une ou deux', score: 2 },
      { label: 'Plusieurs', score: 1 },
      { label: 'Je ne suis pas sûr(e)', score: 0 },
    ],
    tip: 'Avec un client professionnel, une indemnité forfaitaire de 40 € pour frais de recouvrement est due de plein droit en cas de retard, en plus des pénalités.',
    reco: {
      title: 'Récupérer vos impayés',
      text: 'Faites le point facture par facture, relancez par écrit puis par téléphone, et passez à la mise en demeure si nécessaire. Plus un impayé est ancien, plus il est difficile à recouvrer.',
      help: 'Je prends en charge le recouvrement amiable de vos factures en retard.',
    },
  },

  /* ---------- Facturation & relances ---------- */
  {
    id: 'facturation',
    strength: 'Facturation immédiate',
    domain: 'facturation',
    text: 'Quand établissez-vous vos factures ?',
    options: [
      { label: 'Dès la fin de la prestation ou du chantier', score: 3 },
      { label: 'Dans la semaine qui suit', score: 2 },
      { label: 'En fin de mois, toutes ensemble', score: 1 },
      { label: 'Quand je trouve le temps', score: 0 },
    ],
    tip: 'Le délai de paiement court à partir de la date de la facture : chaque jour de retard pour facturer est un jour de trésorerie en moins.',
    reco: {
      title: 'Facturer sans attendre',
      text: 'Préparez des modèles de devis et de factures, et facturez le jour même de la fin de prestation (ou par situations de travaux sur les chantiers longs). Un créneau fixe chaque semaine suffit pour ne plus rien laisser traîner.',
      help: 'J’établis vos devis et factures et je mets en place des modèles prêts à l’emploi.',
    },
  },
  {
    id: 'relances',
    strength: 'Relances planifiées',
    domain: 'facturation',
    text: 'Comment gérez-vous les retards de paiement ?',
    options: [
      { label: 'Des relances planifiées, à dates fixes', score: 3 },
      { label: 'Je relance, mais sans méthode précise', score: 2 },
      { label: 'Seulement quand la trésorerie se tend', score: 1 },
      { label: 'Je n’ose pas vraiment relancer', score: 0 },
    ],
    tip: 'Une relance courtoise quelques jours après l’échéance suffit souvent : la plupart des retards sont de simples oublis.',
    reco: {
      title: 'Mettre en place un circuit de relance',
      text: 'Un rappel amical à l’échéance, une relance à 15 jours, un appel, puis une mise en demeure : écrit une fois pour toutes, ce circuit tourne tout seul et dépersonnalise la démarche.',
      help: 'Je relance vos clients à votre place, avec tact et régularité.',
    },
  },
  {
    id: 'efacture',
    strength: 'Prêt(e) pour la facture électronique',
    domain: 'facturation',
    text: 'Où en êtes-vous avec la facturation électronique ?',
    options: [
      { label: 'Prêt(e) : ma plateforme est choisie', score: 3 },
      { label: 'Je m’informe, rien n’est décidé', score: 2 },
      { label: 'J’en ai entendu parler, sans plus', score: 1 },
      { label: 'Je ne pense pas être concerné(e)', score: 0 },
    ],
    tip: 'Depuis le 1er septembre 2026, toutes les entreprises doivent pouvoir recevoir des factures électroniques. Pour les TPE, l’émission devient obligatoire au 1er septembre 2027.',
    reco: {
      title: 'Préparer la facturation électronique',
      text: 'Choisissez une plateforme agréée, vérifiez vos nouvelles mentions obligatoires (SIREN du client, nature des opérations…) et testez l’émission avant septembre 2027. C’est aussi l’occasion de moderniser tout votre circuit de facturation.',
      help: 'Je vous aide à choisir la plateforme et j’accompagne la mise en place, pas à pas.',
    },
  },

  /* ---------- Organisation administrative ---------- */
  {
    id: 'temps',
    strength: 'Administratif maîtrisé',
    domain: 'organisation',
    text: 'Combien de temps consacrez-vous à l’administratif chaque semaine ?',
    options: [
      { label: 'Moins de 2 heures', score: 3 },
      { label: 'De 2 à 5 heures', score: 2 },
      { label: 'De 5 à 10 heures', score: 1 },
      { label: 'Plus de 10 heures, souvent le soir', score: 0 },
    ],
    tip: 'Chaque heure passée sur l’administratif est une heure en moins pour vos clients, votre développement… ou votre vie personnelle.',
    reco: {
      title: 'Alléger votre charge administrative',
      text: 'Repérez les tâches répétitives (saisie, classement, relances, préparation comptable) et ce qui peut être automatisé ou délégué. Quelques heures d’appui par mois libèrent souvent une à deux journées.',
      help: 'Je prends en charge tout ou partie de votre administratif, sur site ou à distance.',
    },
  },
  {
    id: 'classement',
    strength: 'Classement exemplaire',
    domain: 'organisation',
    text: 'Retrouvez-vous un document (facture, contrat, devis) en moins de 2 minutes ?',
    options: [
      { label: 'Toujours : tout est classé et numérisé', score: 3 },
      { label: 'Le plus souvent', score: 2 },
      { label: 'Il faut parfois chercher longtemps', score: 1 },
      { label: 'Rarement : c’est un peu partout', score: 0 },
    ],
    tip: 'Les pièces comptables se conservent 10 ans. Un classement numérique bien nommé fait gagner un temps précieux, notamment en cas de contrôle.',
    reco: {
      title: 'Organiser un classement numérique',
      text: 'Une arborescence simple (année / clients / fournisseurs / social / fiscal), des noms de fichiers normalisés et la numérisation au fil de l’eau : vous retrouvez tout en quelques secondes.',
      help: 'Je réorganise votre classement et je mets en place une méthode simple à tenir.',
    },
  },
  {
    id: 'echeances',
    strength: 'Échéances sous contrôle',
    domain: 'organisation',
    text: 'Comment suivez-vous vos échéances (TVA, Urssaf, assurances, contrats) ?',
    options: [
      { label: 'Un calendrier à jour, jamais de retard', score: 3 },
      { label: 'Je m’en sors, avec quelques rappels', score: 2 },
      { label: 'Il m’arrive d’oublier ou d’avoir des pénalités', score: 1 },
      { label: 'Je les découvre au dernier moment', score: 0 },
    ],
    tip: 'Un retard de déclaration ou de paiement entraîne des majorations : un calendrier annuel des échéances évite la plupart des mauvaises surprises.',
    reco: {
      title: 'Tenir un calendrier des échéances',
      text: 'Recensez toutes vos échéances fiscales, sociales et contractuelles de l’année, avec un rappel quelques jours avant chacune. Fini les majorations et les urgences de dernière minute.',
      help: 'Je tiens votre calendrier d’échéances et je prépare les éléments à temps.',
    },
  },

  /* ---------- Pilotage & personnel ---------- */
  {
    id: 'marges',
    strength: 'Marges suivies',
    domain: 'pilotage',
    text: 'Connaissez-vous la rentabilité de chaque chantier, prestation ou produit ?',
    options: [
      { label: 'Oui, je la calcule régulièrement', score: 3 },
      { label: 'Pour les principaux seulement', score: 2 },
      { label: 'J’ai une idée globale, sans détail', score: 1 },
      { label: 'Non, je regarde surtout le chiffre d’affaires', score: 0 },
    ],
    tip: 'Un chiffre d’affaires en hausse ne garantit pas une meilleure rentabilité : c’est la marge qui fait vivre l’entreprise.',
    reco: {
      title: 'Suivre vos marges',
      text: 'Calculez la marge de chaque chantier ou prestation (temps passé, achats, sous-traitance) et comparez-la au prévu. Vous saurez quelles activités développer et quels prix revoir.',
      help: 'Je mets en place le suivi de vos marges par chantier, client ou activité.',
    },
  },
  {
    id: 'tableau',
    strength: 'Tableau de bord mensuel',
    domain: 'pilotage',
    text: 'Disposez-vous d’un tableau de bord que vous consultez chaque mois ?',
    options: [
      { label: 'Oui : CA, marge, trésorerie, impayés', score: 3 },
      { label: 'Quelques chiffres, sans régularité', score: 2 },
      { label: 'J’attends le bilan de l’expert-comptable', score: 1 },
      { label: 'Non, je pilote à l’instinct', score: 0 },
    ],
    tip: 'Le bilan annuel arrive souvent plusieurs mois après la clôture : trop tard pour corriger le tir. Quelques indicateurs mensuels suffisent pour piloter.',
    reco: {
      title: 'Créer votre tableau de bord',
      text: 'Cinq ou six indicateurs suivis chaque mois (chiffre d’affaires, marge, trésorerie, encours clients, charges) sur une seule page : vous décidez sur des chiffres, et non plus à l’instinct.',
      help: 'Je construis votre tableau de bord et je vous le commente chaque mois.',
    },
  },
  {
    id: 'personnel',
    strength: 'Personnel bien suivi',
    domain: 'pilotage',
    text: 'La gestion de votre personnel (contrats, paie, absences, suivi médical) est-elle à jour ?',
    options: [
      { label: 'Oui, tout est suivi et à jour', score: 3 },
      { label: 'Globalement, avec quelques retards', score: 2 },
      { label: 'C’est la partie que je repousse', score: 1 },
      { label: 'Je ne sais pas vraiment', score: 0 },
      { label: 'Je n’ai pas de salarié', score: null },
    ],
    tip: 'Contrats, registre du personnel, visites médicales, entretiens professionnels : les obligations de l’employeur s’accumulent vite, même avec un seul salarié.',
    reco: {
      title: 'Sécuriser la gestion du personnel',
      text: 'Faites l’inventaire de vos obligations (contrats, registre unique du personnel, suivi médical, entretiens professionnels, éléments de paie) et tenez un tableau de suivi par salarié. Vous êtes serein(e) en cas de contrôle.',
      help: 'Je gère le suivi administratif de vos salariés et je prépare les éléments de paie.',
    },
  },
];

/** Heures d'administratif par semaine selon la réponse à la question « temps » (pour l'estimation mensuelle) */
export const hoursPerWeek = [1.5, 3.5, 7.5, 12];

export const activites = [
  {
    value: 'btp',
    label: 'Artisan du BTP',
    icon: 'hardhat',
    metier: 'artisans-btp',
    hint: 'Pour un artisan du BTP, les acomptes, les situations de travaux et le suivi des chantiers sont les premiers leviers de trésorerie.',
  },
  {
    value: 'sante',
    label: 'Profession de santé',
    icon: 'stethoscope',
    metier: 'professions-de-sante',
    hint: 'En cabinet, le suivi des encaissements, des cotisations et du temps administratif pèse vite sur le temps consacré aux patients.',
  },
  {
    value: 'liberal',
    label: 'Profession libérale',
    icon: 'briefcase',
    metier: 'professions-liberales',
    hint: 'Pour une profession libérale, des revenus irréguliers se pilotent avec un prévisionnel et des provisions pour les charges à venir.',
  },
  {
    value: 'commerce',
    label: 'Commerce / artisan',
    icon: 'store',
    metier: 'commerces-de-proximite',
    hint: 'Pour un commerce, le suivi des marges, des stocks et du personnel est au cœur de la rentabilité.',
  },
  {
    value: 'tpe',
    label: 'Autre TPE',
    icon: 'building',
    metier: '',
    hint: 'Dans une TPE, chaque heure d’administratif gagnée se transforme en temps pour vos clients et votre développement.',
  },
];

export const effectifs = ['Seul(e)', '2 à 5', '6 à 10', 'Plus de 10'];

/* ---------- Chiffrage des enjeux (estimations affichées dans les résultats) ---------- */

/** Chiffre d'affaires annuel : value = milieu de tranche utilisé pour le calcul (null = non communiqué) */
export const chiffresAffaires: { label: string; value: number | null }[] = [
  { label: 'Moins de 100 000 €', value: 60000 },
  { label: '100 000 à 300 000 €', value: 200000 },
  { label: '300 000 € à 1 M€', value: 600000 },
  { label: 'Plus de 1 M€', value: 1500000 },
  { label: 'Je préfère ne pas le dire', value: null },
];
/** Jours entre la fin de la prestation et l'envoi de la facture, selon la réponse à « facturation » */
export const invoiceLagDays = [0, 4, 15, 25];
/** Délai moyen de paiement des clients en jours, selon la réponse à « delai » */
export const paymentDays = [25, 38, 60, 45];
/** Délai de référence : facture envoyée tout de suite et payée à 30 jours */
export const targetDays = 30;
/** Semaines travaillées par an et heures par journée (conversion du temps administratif en jours) */
export const workWeeks = 47;
export const hoursPerDay = 7;

/* ---------- Bilan offert ---------- */

/** Accroche du bilan selon le domaine le plus faible */
export const bilanFocus: Record<DomainId, { label: string; pitch: string }> = {
  tresorerie: {
    label: 'la trésorerie',
    pitch: 'En 30 minutes, nous posons ensemble les bases de votre plan de trésorerie et nous repérons l’argent à récupérer en priorité.',
  },
  facturation: {
    label: 'la facturation',
    pitch: 'En 30 minutes, nous dessinons votre circuit de facturation et de relance pour être payé(e) plus vite, sans y passer vos soirées.',
  },
  organisation: {
    label: 'l’organisation',
    pitch: 'En 30 minutes, nous repérons les tâches administratives à alléger ou à déléguer en premier pour vous rendre du temps.',
  },
  pilotage: {
    label: 'le pilotage',
    pitch: 'En 30 minutes, nous choisissons les indicateurs qui comptent vraiment pour votre activité, et une façon simple de les suivre.',
  },
};

/** Créneaux proposés pour être rappelé(e) */
export const creneaux = ['Le matin', 'Le midi', 'L’après-midi', 'En fin de journée'];

/** Niveaux du score global (du plus haut au plus bas) */
export const levels = [
  {
    min: 75,
    label: 'Gestion sereine',
    text: 'Votre gestion est solide. Quelques ajustements peuvent encore vous faire gagner du temps et de la sérénité.',
  },
  {
    min: 50,
    label: 'Bonnes bases, à consolider',
    text: 'Les fondations sont là, mais plusieurs points freinent votre trésorerie ou vous prennent un temps précieux.',
  },
  {
    min: 30,
    label: 'Zone de vigilance',
    text: 'Plusieurs fragilités se cumulent. Bonne nouvelle : elles se corrigent vite, avec une méthode et un suivi.',
  },
  {
    min: 0,
    label: 'À reprendre en main',
    text: 'Votre gestion vous expose à des risques réels (trésorerie, retards, pénalités). Agir maintenant vous évitera bien des difficultés.',
  },
];

/** Prestation de Sérénité Gestion Conseils qui répond à chaque question (titres de `services` dans site.ts) */
export const serviceByQuestion: Record<string, string> = {
  previsionnel: 'Trésorerie & Recouvrement',
  delai: 'Trésorerie & Recouvrement',
  impayes: 'Trésorerie & Recouvrement',
  facturation: 'Gestion administrative & ADV',
  relances: 'Trésorerie & Recouvrement',
  efacture: 'Gestion administrative & ADV',
  temps: 'Accompagnement sur mesure',
  classement: 'Gestion administrative & ADV',
  echeances: 'Gestion administrative & ADV',
  marges: 'Pilotage & Optimisation',
  tableau: 'Pilotage & Optimisation',
  personnel: 'Ressources Humaines & Paie',
};
