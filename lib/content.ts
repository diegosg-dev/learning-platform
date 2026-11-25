import { lessons } from "./lessons";
import type { Module, Programme } from "./lesson-types";

export const DATA_SLUG = "data-ia";

export const modules: Module[] = [
  {
    id: "m1",
    index: 1,
    title: "Bases de Python",
    hours: 6,
    blurb: "Variables, conditions, boucles, fonctions",
  },
  {
    id: "m2",
    index: 2,
    title: "Python pour la data",
    hours: 7,
    blurb: "Listes, dictionnaires, NumPy, fichiers",
  },
  {
    id: "m3",
    index: 3,
    title: "Analyse avec pandas",
    hours: 8,
    blurb: "DataFrame, filtres, regroupements, jointures",
  },
  {
    id: "m4",
    index: 4,
    title: "Visualisation de données",
    hours: 6,
    blurb: "Matplotlib, Seaborn, raconter avec des graphes",
  },
  {
    id: "m5",
    index: 5,
    title: "SQL pour l’analyse",
    hours: 8,
    blurb: "Requêtes, jointures, agrégations, fenêtres",
  },
  {
    id: "m6",
    index: 6,
    title: "Statistiques appliquées",
    hours: 8,
    blurb: "Distributions, tests, corrélation, A/B test",
  },
  {
    id: "m7",
    index: 7,
    title: "Introduction au machine learning",
    hours: 9,
    blurb: "Régression, classification, scikit-learn",
  },
  {
    id: "m8",
    index: 8,
    title: "Projet final",
    hours: 8,
    blurb: "Analyse complète d’un jeu de données réel",
  },
];

export const programmes: Programme[] = [
  {
    slug: DATA_SLUG,
    name: "Data & IA",
    short: "Data & IA",
    icon: "data",
    pitch:
      "Python, SQL, statistiques et machine learning, du premier notebook au projet final.",
    available: true,
    level: "Débutant",
    hours: 60,
    modulesCount: 8,
    skills: ["Python", "pandas", "SQL", "Statistiques", "Dataviz", "scikit-learn"],
    certificate: "Data Analyst",
    summary:
      "Apprends à collecter, nettoyer, analyser et visualiser des données avec Python et SQL, puis valide tes compétences par un examen surveillé et un projet final pour ton portfolio.",
  },
  {
    slug: "code",
    name: "Code",
    short: "Code",
    icon: "code",
    pitch:
      "Algorithmique, développement web et bonnes pratiques pour livrer de vrais projets.",
    available: false,
    level: "Débutant",
    hours: 80,
    modulesCount: 10,
    skills: ["Python", "Algorithmes", "Web", "Tests", "Git"],
    certificate: "Développeur",
    summary:
      "De l’algorithme au petit produit livré\u202f: lire un problème, écrire un programme, le tester, le relire.",
  },
  {
    slug: "business",
    name: "Business & entrepreneuriat",
    short: "Business",
    icon: "business",
    pitch: "Stratégie, marketing, produit et lancement d’un projet de A à Z.",
    available: false,
    level: "Intermédiaire",
    hours: 55,
    modulesCount: 8,
    skills: ["Stratégie", "Produit", "Marketing", "Finance d’un projet"],
    certificate: "Entrepreneuriat",
    summary:
      "Poser une offre, la tester auprès de vrais utilisateurs, et savoir quand s’arrêter ou continuer.",
  },
  {
    slug: "finance",
    name: "Finance",
    short: "Finance",
    icon: "finance",
    pitch: "Comptabilité, finance d’entreprise, marchés et modélisation sur tableur.",
    available: false,
    level: "Intermédiaire",
    hours: 60,
    modulesCount: 8,
    skills: ["Comptabilité", "Tableur", "Marchés", "Modélisation"],
    certificate: "Finance",
    summary:
      "Lire un compte de résultat, construire un modèle simple, et ne pas confondre un chiffre avec une décision.",
  },
  {
    slug: "leadership",
    name: "Leadership & communication",
    short: "Leadership",
    icon: "leadership",
    pitch: "Prise de parole, gestion d’équipe, négociation et pensée critique.",
    available: false,
    level: "Débutant",
    hours: 40,
    modulesCount: 6,
    skills: ["Prise de parole", "Équipe", "Négociation", "Écriture"],
    certificate: "Leadership",
    summary:
      "Préparer une prise de parole, conduire un entretien difficile, écrire pour être compris.",
  },
  {
    slug: "sciences",
    name: "Sciences & ingénierie",
    short: "Sciences",
    icon: "science",
    pitch: "Mathématiques appliquées, physique et méthodes de l’ingénieur.",
    available: false,
    level: "Avancé",
    hours: 90,
    modulesCount: 12,
    skills: ["Mathématiques", "Physique", "Modélisation", "Ordres de grandeur"],
    certificate: "Sciences appliquées",
    summary:
      "Remettre des ordres de grandeur sous les formules, et écrire un raisonnement qu’un pair peut vérifier.",
  },
];

const outlines: Record<string, { title: string; blurb: string }[]> = {
  code: [
    { title: "Lire un problème", blurb: "Entrées, sorties, exemples, avant d’écrire une ligne." },
    { title: "Structures et algorithmes", blurb: "Listes, dictionnaires, complexité au feeling juste." },
    { title: "Le web, petit", blurb: "Une page, une requête, une réponse." },
    { title: "Tests et relecture", blurb: "Ce qui casse, ce qu’on laisse, ce qu’on nomme." },
  ],
  business: [
    { title: "Le problème", blurb: "Qui a mal, et comment on le sait." },
    { title: "L’offre", blurb: "Ce qu’on vend, à quel prix, et ce qu’on ne vend pas." },
    { title: "Les premiers utilisateurs", blurb: "Parler à dix personnes avant de construire dix pages." },
    { title: "Le lancement", blurb: "Un canal, une mesure, une décision." },
  ],
  finance: [
    { title: "Lire les comptes", blurb: "Résultat, bilan, ce que chaque ligne promet." },
    { title: "La trésorerie", blurb: "Le bénéfice n’est pas l’argent sur le compte." },
    { title: "Un modèle simple", blurb: "Hypothèses visibles, et ce qui casse si elles bougent." },
    { title: "Les marchés", blurb: "Prix, risque, et ce qu’un graphique ne dit pas." },
  ],
  leadership: [
    { title: "Parler debout", blurb: "Une idée, une salle, un temps limité." },
    { title: "Écrire court", blurb: "Le message que l’autre peut relire demain." },
    { title: "Tenir une équipe", blurb: "Décider, déléguer, revenir sur ce qui coince." },
    { title: "Négocier", blurb: "Ce qu’on veut, ce qu’on peut céder, ce qu’on vérifie." },
  ],
  sciences: [
    { title: "Ordres de grandeur", blurb: "Avant la formule, le bon nombre de zéros." },
    { title: "Modéliser", blurb: "Ce qu’on garde, ce qu’on néglige, et pourquoi." },
    { title: "La mesure", blurb: "Incertitude, unité, et un protocole qu’on peut refaire." },
    { title: "Écrire la preuve", blurb: "Un raisonnement qu’un pair peut suivre sans nous." },
  ],
};

export function getProgramme(slug: string) {
  return programmes.find((item) => item.slug === slug) ?? null;
}

export function moduleLessons(moduleId: string) {
  return lessons.filter((item) => item.moduleId === moduleId);
}

export function moduleById(moduleId: string) {
  return modules.find((item) => item.id === moduleId) ?? null;
}

export function outlineFor(slug: string) {
  return outlines[slug] ?? [];
}

export const SEEDED_COMPLETE = lessons
  .filter((item) => {
    const [moduleNumber, lessonNumber] = item.id.split(".").map(Number);
    return moduleNumber < 3 || (moduleNumber === 3 && lessonNumber <= 3);
  })
  .map((item) => item.id);

export function nextLessonId(completed: string[]) {
  return lessons.find((item) => !completed.includes(item.id))?.id ?? null;
}

export function programmeRatio(completed: string[]) {
  const done = lessons.filter((item) => completed.includes(item.id)).length;
  return { done, total: lessons.length, ratio: done / lessons.length };
}

export type ModuleStatus = "done" | "current" | "upcoming";

export function moduleStatuses(completed: string[]) {
  let foundCurrent = false;
  return modules.map((mod) => {
    const items = moduleLessons(mod.id);
    const done = items.filter((item) => completed.includes(item.id)).length;
    let status: ModuleStatus;
    if (done === items.length) status = "done";
    else if (!foundCurrent) {
      status = "current";
      foundCurrent = true;
    } else status = "upcoming";
    return {
      module: mod,
      lessons: items,
      done,
      total: items.length,
      remaining: items.length - done,
      status,
    };
  });
}

export function buildSyllabusText() {
  const lines = [
    "Académie — Syllabus Data Analyst",
    "Parcours Data & IA",
    "Durées et volumes donnés à titre d’exemple.",
    "",
  ];
  for (const mod of modules) {
    lines.push(`Module ${mod.index}. ${mod.title} (~${mod.hours} h)`);
    lines.push(mod.blurb);
    for (const item of moduleLessons(mod.id)) {
      lines.push(`  ${item.id}  ${item.title}  (${item.minutes} min)`);
      lines.push(`       ${item.summary}`);
    }
    lines.push("");
  }
  lines.push("Certification\u202f: examen surveillé de 90 min, note minimale 70/100.");
  lines.push("Aucune accréditation RNCP à ce stade. Reconnaissance visée à terme.");
  return lines.join("\n");
}

export const reasons = [
  {
    number: "01",
    title: "La profondeur d’une école",
    text: "Des cursus de 6 à 12 modules, conçus comme de vrais cours\u202f: vidéos courtes, fiches, exercices et un projet.",
  },
  {
    number: "02",
    title: "L’habitude d’une appli",
    text: "Séries, XP, niveaux et ligues. Dix minutes par jour suffisent pour ne plus décrocher.",
  },
  {
    number: "03",
    title: "La pratique dans le navigateur",
    text: "Code Python et SQL exécuté sur place, avec un retour immédiat à chaque exercice.",
  },
  {
    number: "04",
    title: "Une certification qui compte",
    text: "Un examen final surveillé valide les compétences et alimente le portfolio. L’accréditation, elle, reste à obtenir.",
  },
];

export const discoveryPerks = [
  { label: "Premières leçons de chaque programme", included: true },
  { label: "Séries, XP et classement", included: true },
  { label: "Exercices interactifs limités", included: true },
  { label: "Examen de certification", included: false },
];

export const annualPerks = [
  "Accès illimité à tous les programmes pendant 12 mois",
  "Les 6 programmes en illimité",
  "Exercices et projets illimités",
  "Ligues, cohortes et retours de correcteurs",
  "Examen certifiant\u202f: XX\u00a0€ (hypothèse)",
];

export const examRules = [
  {
    title: "Caméra et micro activés",
    text: "La session est enregistrée et vérifiée. Une pièce d’identité est demandée au début.",
  },
  {
    title: "Plein écran obligatoire",
    text: "Quitter le plein écran ou changer d’onglet est signalé automatiquement.",
  },
  {
    title: "Aucune ressource externe",
    text: "Pas de notes, pas de recherche web, pas d’assistant. Seul l’éditeur intégré est autorisé.",
  },
  {
    title: "Une tentative, puis 14 jours d’attente",
    text: "En cas d’échec, l’examen peut être repassé après 14 jours.",
  },
];
