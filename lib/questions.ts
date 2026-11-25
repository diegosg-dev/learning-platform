import type { Question } from "./lesson-types";

export const dailyQuiz: Question[] = [
  {
    id: "q-filter",
    prompt: "Quelle ligne garde uniquement les ventes de plus de 100\u00a0€\u202f?",
    choices: [
      { id: "a", label: 'df.filter(montant > 100)' },
      { id: "b", label: 'df[df["montant"] > 100]' },
      { id: "c", label: 'df.where("montant" > 100)' },
      { id: "d", label: 'df["montant"] > 100' },
    ],
    answer: "b",
    explanation:
      "La condition entre crochets renvoie seulement les lignes où elle est vraie. La réponse D produit une série de booléens, pas les lignes.",
  },
  {
    id: "q-sort",
    prompt: "Que fait ascending=False dans sort_values\u202f?",
    choices: [
      { id: "a", label: "Trie du plus petit au plus grand" },
      { id: "b", label: "Trie du plus grand au plus petit" },
      { id: "c", label: "Supprime les doublons" },
      { id: "d", label: "Ne trie que les textes" },
    ],
    answer: "b",
    explanation: "False inverse l’ordre par défaut. Les montants partent du plus grand.",
  },
  {
    id: "q-groupby",
    prompt: "Quelle méthode regroupe les lignes qui partagent une même valeur\u202f?",
    choices: [
      { id: "a", label: 'df.merge("ville")' },
      { id: "b", label: 'df.groupby("ville")' },
      { id: "c", label: 'df.split("ville")' },
      { id: "d", label: 'df.index("ville")' },
    ],
    answer: "b",
    explanation: "groupby rassemble les lignes d’une même ville avant une somme, une moyenne, un compte.",
  },
  {
    id: "q-median",
    prompt: "Pourquoi la médiane résiste-t-elle mieux qu’une moyenne à une vente exceptionnelle\u202f?",
    choices: [
      { id: "a", label: "Parce qu’elle ignore les textes" },
      { id: "b", label: "Parce qu’elle prend la valeur du milieu, pas la somme" },
      { id: "c", label: "Parce qu’elle supprime les colonnes vides" },
      { id: "d", label: "Parce qu’elle convertit tout en entier" },
    ],
    answer: "b",
    explanation: "Une vente énorme tire la moyenne. La médiane reste la valeur centrale.",
  },
  {
    id: "q-test-set",
    prompt: "Que faut-il garder de côté pour juger un modèle\u202f?",
    choices: [
      { id: "a", label: "Les exemples sur lesquels il a appris" },
      { id: "b", label: "Un jeu qu’il n’a pas vu pendant l’apprentissage" },
      { id: "c", label: "Uniquement les erreurs déjà corrigées" },
      { id: "d", label: "Le nom des colonnes" },
    ],
    answer: "b",
    explanation: "Mesurer sur les données d’entraînement dit surtout si le modèle a mémorisé.",
  },
];

export const reviewQuiz: Question[] = [
  {
    id: "r-paris",
    prompt: 'Que renvoie df[df["ville"] == "Paris"]\u202f?',
    choices: [
      { id: "a", label: "Les lignes dont la ville est Paris" },
      { id: "b", label: "Uniquement la colonne ville" },
      { id: "c", label: "Les lignes des autres villes" },
      { id: "d", label: "Une erreur" },
    ],
    answer: "a",
    explanation: "Les crochets filtrent les lignes. Les autres colonnes restent dans le résultat.",
  },
  {
    id: "r-median",
    prompt: "Sur des salaires très inégaux, quel chiffre décrit mieux «\u00a0la personne du milieu\u00a0»\u202f?",
    choices: [
      { id: "a", label: "La moyenne" },
      { id: "b", label: "La médiane" },
      { id: "c", label: "Le maximum" },
      { id: "d", label: "Le nombre de lignes" },
    ],
    answer: "b",
    explanation: "La médiane coupe le tas en deux. La moyenne suit les extrêmes.",
  },
];

export const examQuiz: Question[] = [
  {
    id: "e1",
    prompt: "Quelle expression garde les ventes strictement supérieures à 100\u00a0€\u202f?",
    choices: [
      { id: "a", label: 'df.filter(montant > 100)' },
      { id: "b", label: 'df[df["montant"] > 100]' },
      { id: "c", label: 'df.where("montant" > 100)' },
      { id: "d", label: 'df["montant"] > 100' },
    ],
    answer: "b",
    explanation: "L’indexation booléenne garde les lignes où la condition est vraie.",
  },
  {
    id: "e2",
    prompt: "Pour trier les montants du plus grand au plus petit, on écrit\u202f:",
    choices: [
      { id: "a", label: 'df.sort_values("montant")' },
      { id: "b", label: 'df.sort_values("montant", ascending=False)' },
      { id: "c", label: 'df.order("montant", desc)' },
      { id: "d", label: 'df["montant"].head()' },
    ],
    answer: "b",
    explanation: "Sans ascending=False, pandas trie du plus petit au plus grand.",
  },
  {
    id: "e3",
    prompt: "Le total des ventes par ville s’écrit\u202f:",
    choices: [
      { id: "a", label: 'df.groupby("ville")["montant"].sum()' },
      { id: "b", label: 'df.sum("ville")' },
      { id: "c", label: 'df["ville"].mean()' },
      { id: "d", label: 'df.merge("montant")' },
    ],
    answer: "a",
    explanation: "On groupe par ville, puis on somme la colonne montant.",
  },
  {
    id: "e4",
    prompt: "En SQL, le filtre des lignes s’écrit\u202f:",
    choices: [
      { id: "a", label: "SELECT" },
      { id: "b", label: "WHERE" },
      { id: "c", label: "GROUP" },
      { id: "d", label: "ORDER" },
    ],
    answer: "b",
    explanation: "WHERE joue le même rôle que la condition entre crochets en pandas.",
  },
  {
    id: "e5",
    prompt: "Une corrélation élevée signifie\u202f:",
    choices: [
      { id: "a", label: "Que l’une des séries cause l’autre" },
      { id: "b", label: "Que les deux séries bougent ensemble, sans dire pourquoi" },
      { id: "c", label: "Que le modèle est prêt pour l’examen" },
      { id: "d", label: "Que les données n’ont pas de trous" },
    ],
    answer: "b",
    explanation: "La corrélation décrit un mouvement commun. La cause est une autre question.",
  },
  {
    id: "e6",
    prompt: "COUNT(*) et COUNT(montant)\u202f:",
    choices: [
      { id: "a", label: "Comptent toujours la même chose" },
      { id: "b", label: "Le second ignore les montants manquants" },
      { id: "c", label: "Le premier ignore les doublons" },
      { id: "d", label: "Aucun des deux ne compte des lignes" },
    ],
    answer: "b",
    explanation: "COUNT(colonne) saute les valeurs vides. COUNT(*) compte les lignes.",
  },
  {
    id: "e7",
    prompt: "On évalue un modèle sur un jeu de test parce que\u202f:",
    choices: [
      { id: "a", label: "Il est plus petit, donc plus rapide" },
      { id: "b", label: "Le modèle ne l’a pas vu en apprenant" },
      { id: "c", label: "Il ne contient que des erreurs" },
      { id: "d", label: "scikit-learn l’exige sous ce nom exact" },
    ],
    answer: "b",
    explanation: "Un score sur les données d’entraînement surestime ce que le modèle sait généraliser.",
  },
  {
    id: "e8",
    prompt: "Une jointure interne\u202f:",
    choices: [
      { id: "a", label: "Garde toutes les lignes des deux tables" },
      { id: "b", label: "Ne garde que les lignes qui trouvent une correspondance" },
      { id: "c", label: "Supprime les colonnes numériques" },
      { id: "d", label: "Trie automatiquement par date" },
    ],
    answer: "b",
    explanation: "Les lignes sans clé commune disparaissent. Il faut le vouloir.",
  },
];

export const PASS_MARK = 70;
