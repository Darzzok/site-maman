/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENU DU SITE
 *  Tous les textes, coordonnées et liens sont centralisés ici.
 *  Pour modifier un texte, un numéro ou un lien : c'est ce fichier.
 *  Les balises <strong>…</strong> mettent un mot en valeur.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Sérénité Gestion Conseils',
  shortName: 'Sérénité',
  tagline: 'Gestion Conseils',
  owner: 'Nadège MONZAT-MARECHAL',
  ownerFirstName: 'Nadège',
  role: 'Consultante indépendante',
  url: 'https://www.xn--srnitgestionconseils-b2bbd.fr',
  email: 'contact@xn--srnitgestionconseils-b2bbd.fr',
  emailLabel: 'contact@sérénitégestionconseils.fr',
  phone: '+33600000000', // À compléter
  phoneLabel: '06 00 00 00 00', // À compléter
  // Passer à true une fois le vrai numéro renseigné (il sera alors transmis à Google)
  phoneIsSet: false,
  // Adresse de l'entreprise (référencement local, fiche Google) : à compléter si elle peut être publiée
  address: { street: '', postalCode: '', locality: '' },
  linkedin: '#', // À compléter : lien de la page LinkedIn
  // Formulaire de devis : les réponses arrivent par e-mail via Formspree
  formspree: 'https://formspree.io/f/mbdnqoda',
  // Agenda de prise de rendez-vous
  calendly: 'https://calendly.com/contact-xn-srnitgestionconseils-b2bbd/30min?locale=fr',
  promise: 'Concentrez-vous sur votre métier, je m’occupe du reste.',
};

/** Zone d'intervention (référencement local) */
export const zone = {
  region: 'Normandie',
  short: 'Normandie — Eure (27) & Seine-Maritime (76)',
  departments: [
    {
      name: 'Eure',
      code: '27',
      cities: ['Évreux', 'Vernon', 'Louviers', 'Bernay', 'Pont-Audemer', 'Les Andelys'],
    },
    {
      name: 'Seine-Maritime',
      code: '76',
      cities: ['Rouen', 'Le Havre', 'Dieppe', 'Fécamp', 'Elbeuf', 'Yvetot'],
    },
  ],
};

/** Liens du menu principal (id = ancre de section sur la page d'accueil) */
export const nav: { label: string; id?: string; href?: string }[] = [
  { label: 'Accueil', id: 'accueil' },
  { label: 'Services', id: 'services' },
  { label: 'Métiers', href: '/metiers.html' },
  { label: 'À propos', id: 'a-propos' },
  { label: 'Cas clients', id: 'cas-clients' },
  { label: 'Conseils', href: '/conseils.html' },
  { label: 'FAQ', href: '/faq.html' },
];

/** Fil conducteur (points de navigation sur le côté de la page d'accueil) */
export const sections = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'services', label: 'Services' },
  { id: 'formules', label: 'Modes d’intervention' },
  { id: 'a-propos', label: 'À propos' },
  { id: 'pourquoi', label: 'Pourquoi moi' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'cas-clients', label: 'Cas clients' },
  { id: 'zone', label: 'Zone d’intervention' },
  { id: 'reseau-experts', label: 'Réseau' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'Optimisation d’exploitation & gestion externalisée',
  lead:
    'Je suis Nadège MONZAT-MARECHAL, consultante indépendante spécialisée en <strong>gestion de trésorerie</strong>, <strong>organisation opérationnelle</strong> et accompagnement des TPE, artisans et professions libérales. Mon objectif : vous <strong>libérer de la charge administrative</strong> et <strong>sécuriser votre organisation</strong>, pour vous permettre de vous concentrer pleinement sur le développement de votre activité.',
  trust: ['Échange découverte gratuit', 'Réponse sous 24h', 'Sans engagement', 'Eure (27) & Seine-Maritime (76)'],
};

export const services = [
  {
    icon: 'wallet',
    title: 'Trésorerie & Recouvrement',
    badge: 'Spécialité',
    text: 'Suivi rigoureux des factures, <strong>relances clients diplomatiques</strong>, gestion des litiges et <strong>prévention des impayés</strong> pour sécuriser votre cash.',
    points: ['Suivi des factures et des échéances', 'Relances clients diplomatiques', 'Gestion des litiges', 'Prévention des impayés', 'Visibilité sur la trésorerie'],
  },
  {
    icon: 'file',
    title: 'Gestion administrative & ADV',
    text: 'Émission des devis et factures, <strong>suivi des commandes</strong>, relation clients/fournisseurs et organisation du secrétariat quotidien.',
    points: ['Devis et factures', 'Suivi des commandes', 'Relation clients / fournisseurs', 'Secrétariat quotidien', 'Situations de travaux (BTP)'],
  },
  {
    icon: 'chart',
    title: 'Pilotage & Optimisation',
    text: 'Analyse de rentabilité, <strong>optimisation des coûts fixes/fournisseurs</strong>, mise en place de tableaux de bord et structuration des processus.',
    points: ['Analyse de rentabilité', 'Optimisation des coûts fixes', 'Optimisation des coûts fournisseurs', 'Tableaux de bord', 'Structuration des processus'],
  },
  {
    icon: 'users',
    title: 'Ressources Humaines & Paie',
    text: 'Gestion administrative du personnel, <strong>contrats de travail, DPAE</strong>, préparation des éléments de paie et suivi des variables.',
    points: ['Dossiers du personnel', 'Contrats de travail', 'DPAE', 'Éléments de paie', 'Suivi des variables'],
  },
  {
    icon: 'shield',
    title: 'Patrimoine & Protection du Dirigeant',
    text: 'Bilan personnalisé, <strong>optimisation de votre retraite</strong>, prévoyance et conseil en stratégie patrimoniale en collaboration avec mon expert partenaire.',
    points: ['Bilan personnalisé', 'Retraite', 'Prévoyance', 'Stratégie patrimoniale'],
  },
  {
    icon: 'target',
    title: 'Accompagnement sur mesure',
    text: 'Intervention flexible en <strong>temps partagé</strong> (présentiel ou distanciel), adaptée au rythme et aux besoins réels de votre activité, qu’elle soit artisanale, libérale ou en TPE. Selon vos besoins, je peux également vous mettre en relation avec <strong>mon réseau d’experts partenaires</strong>.',
  },
];

/** Modes d'intervention — issus de l'accompagnement sur mesure, de l'À propos et de la FAQ */
export const formulas = {
  intro:
    'Un accompagnement <strong>sans engagement</strong>, adapté au rythme et aux besoins réels de votre activité. La facturation est définie ensemble lors du devis.',
  items: [
    {
      icon: 'zap',
      title: 'Renfort ponctuel',
      for: 'Pour un besoin précis ou passer un cap',
      text: 'Relances, mise à jour d’un suivi, structuration d’un process : une mission ciblée, avec un <strong>effet rapide</strong>.',
      billing: 'Au forfait ou à la mission',
    },
    {
      icon: 'calendar',
      title: 'Suivi régulier',
      for: 'Pour garder la maîtrise dans la durée',
      text: 'Un accompagnement sur plusieurs mois, au rythme défini ensemble, avec des <strong>points réguliers</strong> sur l’avancement.',
      billing: 'Rythme mensuel',
    },
    {
      icon: 'users',
      title: 'Temps partagé',
      for: 'Pour déléguer sans recruter',
      text: 'Une <strong>interlocutrice unique</strong> pour votre gestion, sans les contraintes d’un recrutement salarié : du renfort ponctuel au suivi stratégique au long cours.',
      billing: 'Rythme mensuel',
    },
  ],
  terms: ['Présentiel, distanciel ou les deux', 'Devis personnalisé après le premier échange', 'Sans engagement'],
};

export const about = {
  role: 'Fondatrice de Sérénité Gestion Conseils',
  intro:
    'Forte d’un <strong>parcours chevronné en direction d’exploitation et en gestion d’entreprise</strong>, j’ai fondé Sérénité Gestion Conseils avec une conviction : chaque dirigeant mérite un <strong>soutien fiable et expert</strong> pour faire grandir son activité en toute sérénité.',
  paragraphs: [
    'En tant que <strong>partenaire clé de votre quotidien</strong>, je mets mon exigence et ma maîtrise du terrain au service de votre structure. Mon engagement est de vous apporter un <strong>accompagnement immédiatement opérationnel</strong> pour fluidifier vos processus, sécuriser vos décisions et vous redonner la maîtrise de votre temps.',
    'Parce que vos enjeux sont uniques, mes interventions <strong>s’ajustent sur mesure</strong> à votre rythme : du <strong>renfort ponctuel</strong> pour passer un cap au <strong>suivi stratégique au long cours</strong>.',
  ],
  highlights: ['Renfort ponctuel', 'Suivi stratégique au long cours', 'Présentiel ou distanciel'],
};

export const reasons = [
  {
    icon: 'hardhat',
    title: 'Expertise terrain',
    text: 'Une solide maîtrise des réalités de la <strong>gestion opérationnelle des TPE, artisans et professions libérales</strong>.',
  },
  {
    icon: 'zap',
    title: 'Réactivité',
    text: 'Des <strong>réponses rapides</strong> et des interventions concrètes pour traiter efficacement vos urgences.',
  },
  {
    icon: 'sliders',
    title: 'Flexibilité',
    text: 'Un accompagnement <strong>adapté à votre rythme</strong>, sans les contraintes d’un recrutement salarié.',
  },
  {
    icon: 'heart',
    title: 'Proximité',
    text: 'Une <strong>interlocutrice unique</strong>, disponible et à l’écoute pour instaurer une relation de confiance.',
  },
  {
    icon: 'eye',
    title: 'Transparence',
    text: 'Des <strong>tarifs clairs dès le départ</strong> et un suivi régulier de l’avancement de vos missions.',
  },
  {
    icon: 'lock',
    title: 'Confidentialité',
    text: 'Une <strong>discrétion totale</strong> sur vos données financières, RH et administratives.',
  },
];

/** Frise du parcours client */
export const steps = [
  {
    icon: 'phone',
    title: 'Premier contact',
    text: 'Vous me présentez votre besoin par téléphone, e-mail ou via le formulaire du site.',
  },
  {
    icon: 'search',
    title: 'Échange & diagnostic',
    text: 'Nous faisons le point ensemble sur votre activité, vos priorités et vos contraintes.',
  },
  {
    icon: 'fileCheck',
    title: 'Proposition sur mesure',
    text: 'Je vous transmets un devis clair et sans engagement, adapté à votre besoin réel.',
  },
  {
    icon: 'rocket',
    title: 'Mise en œuvre',
    text: 'Je prends en main vos dossiers et démarre la mission, avec des points réguliers.',
  },
  {
    icon: 'flag',
    title: 'Réalisation & suivi',
    text: 'Votre demande est traitée, avec un suivi transparent jusqu’à son aboutissement.',
  },
];

export const cases = [
  {
    icon: 'hardhat',
    tag: 'Artisan du BTP',
    title: 'Entreprise de maçonnerie',
    metier: 'artisans-btp',
    problem: 'Devis en retard, suivi de chantiers approximatif et relances clients jamais faites faute de temps.',
    result: 'Délai de facturation divisé par deux',
  },
  {
    icon: 'briefcase',
    tag: 'Profession libérale',
    title: 'Cabinet de conseil indépendant',
    metier: 'professions-liberales',
    problem: 'Un dirigeant seul, submergé par l’administratif au point de repousser ses rendez-vous clients.',
    result: 'Plus de 10h/semaine récupérées',
  },
  {
    icon: 'store',
    tag: 'TPE commerce',
    title: 'Commerce de proximité',
    metier: 'commerces-de-proximite',
    problem: 'Aucun process RH formalisé : contrats, DPAE et suivi de paie gérés dans l’urgence à chaque embauche.',
    result: 'Personnel et paie enfin sécurisés',
  },
  {
    icon: 'wrench',
    tag: 'Artisan',
    title: 'Entreprise de plomberie',
    metier: 'artisans-btp',
    problem: 'Trésorerie tendue en fin de mois, sans visibilité claire sur les impayés ni les échéances à venir.',
    result: 'Trésorerie suivie et sécurisée au quotidien',
  },
  {
    icon: 'stethoscope',
    tag: 'Profession libérale',
    title: 'Cabinet médical',
    metier: 'professions-de-sante',
    problem: 'Secrétariat administratif débordé entre la prise de rendez-vous, la facturation et le suivi des dossiers.',
    result: 'Organisation administrative fluidifiée',
  },
  {
    icon: 'home',
    tag: 'TPE BTP',
    title: 'Entreprise de rénovation',
    metier: 'artisans-btp',
    problem: 'Sous-traitance mal suivie et situations de travaux transmises en retard, avec un impact direct sur la trésorerie.',
    result: 'Chantiers et sous-traitance sous contrôle',
  },
];

export const network = {
  intro:
    'Parce que chaque entreprise a des besoins différents, je m’entoure de professionnels de confiance afin de vous proposer un accompagnement global. Ensemble, nous mettons nos expertises au service du développement de votre activité.',
  outroTitle: 'Un seul interlocuteur, plusieurs expertises',
  outro:
    'Lorsque votre projet nécessite des compétences complémentaires, je peux vous orienter vers des partenaires sélectionnés pour leur professionnalisme, leur sérieux et la qualité de leur accompagnement. Mon objectif est de vous faire gagner du temps en vous mettant directement en relation avec les bons interlocuteurs.',
};

export const partners = [
  {
    name: 'Nicolas',
    role: 'Conseiller en Gestion de Patrimoine',
    photo: '/images/nicolas.jpg',
    icon: 'shield',
    paragraphs: [
      'Nicolas accompagne les entrepreneurs, dirigeants, professions libérales et indépendants dans la protection, l’optimisation et le développement de leur patrimoine.',
      'Son accompagnement permet d’anticiper les décisions importantes tout au long de la vie de l’entreprise.',
    ],
    tagsTitle: 'Domaines d’intervention',
    tags: [
      'Optimisation fiscale',
      'Protection du dirigeant',
      'Prévoyance',
      'Épargne',
      'Investissements',
      'Retraite',
      'Transmission d’entreprise',
      'Accompagnement patrimonial',
      'Assurance emprunteur',
      'Défiscalisation',
    ],
  },
  {
    name: 'Geoffrey',
    role: 'Créateur de sites internet & Communication digitale',
    photo: '/images/geoffrey.jpg',
    icon: 'code',
    paragraphs: [
      'Geoffrey accompagne les entreprises dans leur développement numérique en créant des outils modernes, performants et adaptés à leurs objectifs.',
      'Son objectif est d’améliorer la visibilité des entreprises, renforcer leur image et générer davantage de contacts.',
    ],
    tagsTitle: 'Prestations',
    tags: [
      'Création de sites internet',
      'Refonte de sites existants',
      'Maintenance',
      'Optimisation SEO',
      'Création de logos',
      'Charte graphique',
      'Cartes de visite',
      'Flyers',
      'Supports de communication',
      'Accompagnement digital',
    ],
  },
];

export const promise = {
  text: 'J’accompagne les dirigeants dans la gestion administrative, le suivi de leur activité et l’organisation de leur entreprise afin de leur faire gagner du temps et de la sérénité.',
};

/** Thèmes de la FAQ (ordre d'affichage) */
export const faqCategories = [
  { id: 'demarrer', label: 'Bien démarrer', short: 'Démarrer', icon: 'rocket', intro: 'Le premier contact et le lancement d’une mission.' },
  { id: 'services', label: 'Services & méthode', short: 'Services', icon: 'briefcase', intro: 'Ce que je prends en charge, et comment.' },
  { id: 'tarifs', label: 'Tarifs & engagement', short: 'Tarifs', icon: 'wallet', intro: 'Devis, facturation et souplesse.' },
  { id: 'organisation', label: 'Zone & organisation', short: 'Organisation', icon: 'mapPin', intro: 'Où, quand et comment nous travaillons ensemble.' },
  { id: 'confiance', label: 'Confidentialité', short: 'Confidentialité', icon: 'lock', intro: 'La sécurité de vos données et de vos accès.' },
] as const;

export type FaqCategory = (typeof faqCategories)[number]['id'];

/** Questions fréquentes (la réponse peut contenir des balises HTML simples et des liens) */
export const faqs: { q: string; a: string; cat: FaqCategory }[] = [
  /* — Bien démarrer — */
  {
    cat: 'demarrer',
    q: 'Quels types d’entreprises accompagnez-vous ?',
    a: 'J’accompagne les <strong>TPE, artisans et professions libérales</strong>, quel que soit leur secteur d’activité. Chaque intervention est adaptée à la réalité et aux besoins spécifiques de votre entreprise.',
  },
  {
    cat: 'demarrer',
    q: 'Comment se déroule un premier échange ?',
    a: 'Tout commence par un <strong>appel découverte gratuit de 30 minutes</strong>, en visioconférence ou par téléphone. Nous faisons le point sur votre organisation actuelle, vos besoins et vos objectifs, afin d’identifier ensemble les solutions les plus adaptées.',
  },
  {
    cat: 'demarrer',
    q: 'Comment démarre concrètement une mission ?',
    a: 'Après notre échange, je vous adresse un <strong>devis personnalisé</strong>. Une fois validé, nous commençons par un état des lieux : vos documents, vos outils, vos échéances. Nous fixons ensuite les priorités et un calendrier, pour que vous sachiez toujours ce qui est fait et quand.',
  },
  {
    cat: 'demarrer',
    q: 'Que dois-je préparer avant notre premier rendez-vous ?',
    a: 'Rien d’obligatoire : le premier échange sert justement à faire le point. Si vous le souhaitez, quelques éléments aident à aller plus vite : la liste des <strong>factures en attente</strong>, vos <strong>prochaines échéances</strong> (TVA, cotisations, salaires) et les outils que vous utilisez déjà.',
  },
  {
    cat: 'demarrer',
    q: 'Je viens de créer mon entreprise : pouvez-vous m’aider ?',
    a: 'Oui, et c’est même le meilleur moment ! Mettre en place une <strong>organisation solide dès le départ</strong> (facturation, classement, suivi des échéances, tableau de bord simple) vous évite bien des rattrapages par la suite.',
  },

  /* — Services & méthode — */
  {
    cat: 'services',
    q: 'Quelle est la différence avec un expert-comptable ?',
    a: 'Nos rôles sont <strong>complémentaires</strong>. Votre expert-comptable tient votre comptabilité et établit vos comptes annuels et déclarations. Je m’occupe de la <strong>gestion administrative et financière du quotidien</strong> : factures, relances, trésorerie, organisation, préparation des éléments à lui transmettre. Je travaille volontiers en lien avec lui.',
  },
  {
    cat: 'services',
    q: 'Pouvez-vous gérer les relances de mes factures impayées ?',
    a: 'Oui, c’est l’une de mes spécialités. Je mets en place un <strong>suivi des échéances</strong> et je relance vos clients de façon <strong>diplomatique</strong> (e-mail, téléphone, courrier), pour préserver la relation commerciale. Si un recouvrement judiciaire devient nécessaire, je vous oriente vers les bons professionnels.',
  },
  {
    cat: 'services',
    q: 'Vous occupez-vous de la paie et des formalités RH ?',
    a: 'Je prends en charge la <strong>gestion administrative du personnel</strong> : contrats de travail, DPAE, dossiers salariés, suivi des absences et préparation des <strong>éléments variables de paie</strong>, en lien avec votre gestionnaire de paie ou votre expert-comptable.',
  },
  {
    cat: 'services',
    q: 'Pouvez-vous m’aider à passer à la facturation électronique ?',
    a: 'Oui. Je vous aide à <strong>choisir une plateforme agréée</strong>, à mettre à jour vos données clients et vos modèles de factures, et à adapter vos habitudes. Pour en savoir plus, consultez mon article <a href="/conseils/facturation-electronique-ce-qui-change-pour-les-tpe.html">Facturation électronique : ce qui change pour les TPE et les artisans</a>.',
  },
  {
    cat: 'services',
    q: 'Quels outils utilisez-vous ?',
    a: 'Je m’adapte en priorité à <strong>vos outils existants</strong>. Si vous n’en avez pas encore, je vous propose des solutions simples et adaptées à votre taille : logiciel de facturation, tableau de suivi partagé, espace de stockage sécurisé. L’objectif est que vous restiez autonome.',
  },
  {
    cat: 'services',
    q: 'Combien de temps avant de voir des résultats concrets ?',
    a: 'Cela dépend de la nature de votre besoin. Certaines actions (relances, mise à jour d’un suivi) produisent un <strong>effet rapide</strong>, tandis qu’une réorganisation plus large se déploie sur plusieurs semaines. Nous en discutons ensemble dès le premier échange.',
  },

  /* — Tarifs & engagement — */
  {
    cat: 'tarifs',
    q: 'Combien coûte votre accompagnement ?',
    a: 'Chaque mission étant différente, il n’y a pas de tarif fixe : je vous propose un <strong>devis personnalisé</strong> après notre premier échange, en fonction du volume de travail et de la régularité souhaitée.',
  },
  {
    cat: 'tarifs',
    q: 'Le premier échange est-il vraiment gratuit ?',
    a: 'Oui. L’appel découverte de 30 minutes est <strong>offert et sans engagement</strong> : vous repartez avec un regard extérieur sur votre situation, que vous décidiez ou non de poursuivre ensemble.',
  },
  {
    cat: 'tarifs',
    q: 'Comment se passe la facturation ?',
    a: 'La facturation est définie ensemble lors du devis : <strong>au forfait</strong>, <strong>à la mission</strong>, ou selon un <strong>rythme mensuel</strong> pour un suivi régulier.',
  },
  {
    cat: 'tarifs',
    q: 'Y a-t-il un engagement minimum ?',
    a: 'Non. Mon accompagnement est <strong>sans engagement</strong> : ponctuel pour un besoin précis, ou régulier sur plusieurs mois, selon ce qui vous convient le mieux.',
  },
  {
    cat: 'tarifs',
    q: 'Puis-je faire appel à vous pour une mission ponctuelle ?',
    a: 'Bien sûr. Un retard de classement à rattraper, une vague de relances, la mise en place d’un tableau de bord, un renfort pendant une absence : une <strong>mission ciblée</strong>, au forfait, avec un effet rapide.',
  },

  /* — Zone & organisation — */
  {
    cat: 'organisation',
    q: 'Où intervenez-vous ?',
    a: 'J’interviens en <strong>Normandie</strong>, dans l’<strong>Eure (27)</strong> et en <strong>Seine-Maritime (76)</strong> : Rouen, Le Havre, Évreux, Dieppe, Vernon, Louviers et leurs environs. L’accompagnement peut aussi se faire à distance, ou en combinant les deux.',
  },
  {
    cat: 'organisation',
    q: 'Intervenez-vous à distance ou en présentiel ?',
    a: 'Les deux sont possibles. Mon accompagnement s’adapte à votre rythme et à vos préférences : <strong>intervention sur site</strong>, <strong>suivi à distance</strong>, ou une combinaison des deux.',
  },
  {
    cat: 'organisation',
    q: 'Combien de temps devrai-je y consacrer de mon côté ?',
    a: 'Très peu : l’objectif est justement de vous <strong>libérer du temps</strong>. En général, un court point régulier (par exemple chaque semaine ou chaque quinzaine) et la transmission de vos documents suffisent. Je vous sollicite uniquement pour les décisions qui vous reviennent.',
  },
  {
    cat: 'organisation',
    q: 'Comment échangeons-nous les documents ?',
    a: 'Selon vos habitudes : un <strong>espace de partage sécurisé</strong>, l’e-mail, ou une récupération sur place lors de mes passages. Nous définissons ensemble une méthode simple, que vous pourrez conserver ensuite.',
  },

  /* — Confidentialité — */
  {
    cat: 'confiance',
    q: 'Mes données et documents sont-ils confidentiels ?',
    a: 'Oui. Toutes les informations que vous me confiez sont traitées avec la plus <strong>stricte confidentialité</strong>, conformément à ma <a href="/confidentialite.html">politique de confidentialité</a> et au RGPD.',
  },
  {
    cat: 'confiance',
    q: 'Aurez-vous accès à mes comptes bancaires ?',
    a: 'Uniquement si vous le souhaitez, et de préférence en <strong>simple consultation</strong> pour suivre votre trésorerie. Aucun paiement n’est effectué sans votre <strong>validation</strong> : vous gardez toujours la main sur votre argent.',
  },
  {
    cat: 'confiance',
    q: 'Que se passe-t-il à la fin de notre collaboration ?',
    a: 'Vous récupérez l’ensemble de vos <strong>documents et accès</strong>, et les outils mis en place restent les vôtres. Je vous remets un point d’étape clair pour que vous, ou la personne qui prendra le relais, puissiez <strong>poursuivre sans rupture</strong>.',
  },
];
