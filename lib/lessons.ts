import type { Lesson } from "./lesson-types";

function lesson(
  id: string,
  moduleId: string,
  title: string,
  minutes: number,
  summary: string,
  paragraphs: [string, string],
  example?: string,
): Lesson {
  return {
    id,
    moduleId,
    title,
    minutes,
    xp: 15,
    summary,
    steps: [
      {
        type: "concept",
        title,
        minutes,
        paragraphs: [...paragraphs],
        example,
        remember: paragraphs[1],
        frames: [
          { title, body: paragraphs[0] },
          { title: "À retenir", body: paragraphs[1] },
        ],
      },
    ],
  };
}

const filterStarter = `import pandas as pd

df = pd.read_csv("ventes.csv")

# Garde les commandes de plus de 100 €,
# triées de la plus grande à la plus petite.
`;

const groupStarter = `import pandas as pd

df = pd.read_csv("ventes.csv")

# Montant total des ventes pour chaque ville.
`;

const lesson34: Lesson = {
  id: "3.4",
  moduleId: "m3",
  title: "Filtrer et trier un DataFrame",
  minutes: 6,
  xp: 40,
  summary: "Garder des lignes avec une condition, puis les ordonner.",
  steps: [
    {
      type: "concept",
      title: "Filtrer des lignes avec une condition",
      minutes: 6,
      paragraphs: [
        "Pour garder seulement certaines lignes d’un DataFrame, on écrit une condition entre crochets. pandas renvoie un nouveau DataFrame qui ne contient que les lignes où la condition est vraie.",
        "Le tri est un second geste. sort_values ordonne le résultat. ascending=False part du plus grand.",
      ],
      example: 'df[df["ville"] == "Paris"]',
      remember:
        "df[condition] filtre les lignes. La condition est une série de booléens, une par ligne.",
      frames: [
        {
          title: "Une table",
          body: "Un DataFrame a des colonnes nommées et une ligne par enregistrement. Ici, une ligne est une commande.",
        },
        {
          title: "Une condition",
          body: "montant > 100 est vraie ou fausse pour chaque ligne. Rien n’est encore filtré.",
        },
        {
          title: "Les crochets",
          body: "df[condition] ne garde que les lignes vraies. Les colonnes, elles, restent.",
        },
        {
          title: "Le tri",
          body: "sort_values(\"montant\", ascending=False) range le résultat du plus grand montant au plus petit.",
        },
      ],
    },
    {
      type: "quiz",
      prompt: 'Que renvoie df[df["ville"] == "Paris"]\u202f?',
      choices: [
        { id: "a", label: "Un nouveau tableau, avec seulement les lignes de Paris" },
        { id: "b", label: "Uniquement la colonne ville" },
        { id: "c", label: "Les lignes dont la ville n’est pas Paris" },
        { id: "d", label: "Une erreur\u202f: on ne compare pas une colonne à un texte" },
      ],
      answer: "a",
      explanation:
        "Les crochets filtrent les lignes. Les autres colonnes restent. L’égalité s’écrit ==.",
      xp: 10,
    },
    {
      type: "complete",
      title: "Complète le code pour garder les montants > 100",
      prompt: "Choisis le bon opérateur.",
      code: 'df[df["montant"] ___ 100]',
      options: ["<", ">", "=", "≠"],
      answer: ">",
      explanation:
        "Le signe > garde les lignes strictement au-dessus de 100. En Python, l’égalité s’écrirait ==, pas =.",
      xp: 10,
    },
    {
      type: "code",
      title: "Filtrer et trier",
      prompt:
        "Affiche les commandes dont le montant est supérieur à 100\u00a0€, triées de la plus grande à la plus petite.",
      starter: filterStarter,
      hint: 'Écris df[df["montant"] > 100], puis enchaîne .sort_values("montant", ascending=False).',
      exerciseId: "filter-sort",
      xp: 20,
    },
  ],
};

const lesson36: Lesson = {
  id: "3.6",
  moduleId: "m3",
  title: "Grouper et agréger",
  minutes: 8,
  xp: 30,
  summary: "Une somme, une moyenne, un compte\u202f: par ville, par produit, par mois.",
  steps: [
    {
      type: "concept",
      title: "Réduire sans perdre la question",
      minutes: 8,
      paragraphs: [
        "groupby rassemble les lignes qui partagent une valeur, puis un agrégat réduit chaque groupe à un chiffre.",
        "df.groupby(\"ville\")[\"montant\"].sum() répond à «\u00a0combien par ville\u00a0», pas à «\u00a0montre-moi tout\u00a0».",
      ],
      example: 'df.groupby("ville")["montant"].sum()',
      remember: "On groupe par la catégorie, on agrège la mesure. Les deux colonnes n’ont pas le même rôle.",
      frames: [
        {
          title: "Des paquets",
          body: "Toutes les commandes de Lyon d’un côté, celles de Paris de l’autre.",
        },
        {
          title: "Un chiffre par paquet",
          body: "sum additionne les montants. mean ferait la moyenne. count compterait les lignes.",
        },
      ],
    },
    {
      type: "code",
      title: "Somme par ville",
      prompt: "Calcule le montant total des ventes pour chaque ville.",
      starter: groupStarter,
      hint: 'df.groupby("ville")["montant"].sum()',
      exerciseId: "group-sum",
      xp: 20,
    },
  ],
};

const base: Lesson[] = [
  lesson("1.1", "m1", "Variables et types", 8, "Nommer un nombre, un texte, un booléen.", [
    "Un nom, une valeur. age = 27 range un entier, ville = \"Lyon\" une chaîne. Le type se déduit de la valeur, et type(age) le confirme.",
    "Avant d’analyser quoi que ce soit, on sait dire ce qu’on manipule\u202f: nombre, texte ou booléen.",
  ], 'ville = "Lyon"'),
  lesson("1.2", "m1", "Conditions", 8, "Un if choisit un chemin, sans demi-mesure.", [
    "Un if choisit un chemin. La condition est vraie ou fausse, jamais «\u00a0un peu\u00a0».",
    "else couvre le reste. On n’imbrique que si la question l’exige vraiment.",
  ], "if montant > 100:"),
  lesson("1.3", "m1", "Boucles", 7, "Répéter un geste sur chaque élément.", [
    "for nom in clients: parcourt une liste, un élément à la fois.",
    "Si tu copies trois fois le même bloc, une boucle est souvent plus claire.",
  ]),
  lesson("1.4", "m1", "Fonctions", 9, "Nommer un geste pour le réutiliser.", [
    "def ttc(prix): nomme un geste. Les arguments entrent, return ressort.",
    "Une fonction fait une chose que tu peux nommer. Si le nom est vague, la fonction l’est aussi.",
  ], "def ttc(prix):\n    return prix * 1.2"),
  lesson("1.5", "m1", "Listes", 8, "Un ordre, un index qui commence à zéro.", [
    "Une liste garde un ordre\u202f: notes = [14, 9, 17]. L’index commence à 0.",
    "append ajoute à la fin. On ne mélange pas, dans la même liste, des choses qui n’ont rien à voir.",
  ]),
  lesson("1.6", "m1", "Un carnet de notes", 10, "Le premier petit programme qui ressemble à un outil.", [
    "On assemble variable, liste et boucle pour calculer une moyenne.",
    "C’est encore petit. C’est déjà un programme qu’on peut relire.",
  ]),
  lesson("2.1", "m2", "Dictionnaires", 8, "Une clé, une valeur, une ligne de données.", [
    "Un dictionnaire associe une clé à une valeur\u202f: une ville, un montant, un client.",
    "On s’en sert pour une ligne, avant même de parler de tableau.",
  ], '{ "ville": "Lyon", "montant": 480 }'),
  lesson("2.2", "m2", "Tableaux NumPy", 9, "Calculer sur des nombres sans écrire la boucle.", [
    "Une liste Python n’est pas un tableau de calcul. NumPy range des nombres du même type.",
    "np.array([12, 7, 9]).mean() est le premier réflexe, pas une formule recopiée.",
  ]),
  lesson("2.3", "m2", "Lire un fichier", 8, "Un CSV\u202f: une ligne par enregistrement.", [
    "Pour un texte, open suffit. Pour un tableau, on préfère un CSV\u202f: une ligne par enregistrement, un séparateur entre les champs.",
    "On ferme le fichier, ou on utilise with, pour ne pas le laisser ouvert.",
  ]),
  lesson("2.4", "m2", "Convertir les types", 7, "«\u00a0480\u00a0» n’est pas encore un nombre.", [
    "Un CSV ne contient que du texte. \"480\" ne se somme pas tant qu’on ne l’a pas converti.",
    "int, float et str sont les trois conversions qu’on vérifie, même quand elles ont l’air évidentes.",
  ]),
  lesson("2.5", "m2", "Textes et dates", 8, "Lyon, lyon et LYON ne sont pas trois villes.", [
    "Les dates arrivent souvent comme du texte. On les convertit pour les trier et les soustraire.",
    "Une ville écrite de trois façons fera trois groupes si on ne nettoie pas la casse.",
  ]),
  lesson("2.6", "m2", "Le premier trou dans les données", 8, "Une cellule vide n’est pas un zéro.", [
    "Zéro est une mesure. Le vide est une absence. Les additionner sans le dire change le résultat.",
    "Avant de calculer, on compte les absences. Le taux de remplissage fait partie du résultat.",
  ]),
  lesson("2.7", "m2", "Nettoyer une colonne", 10, "Écrire les choix, pas seulement les faire.", [
    "On enlève les espaces, on unifie la casse, on décide quoi faire des valeurs impossibles.",
    "Le nettoyage se note. Sinon, personne ne peut refaire le chiffre.",
  ]),
  lesson("3.1", "m3", "Anatomie d’un DataFrame", 7, "Des colonnes, des lignes, un index.", [
    "Un DataFrame est une table\u202f: des colonnes nommées, des lignes, un index.",
    "df.shape donne le nombre de lignes et de colonnes. df.head() montre le début, sans tout imprimer.",
  ], "df.head()"),
  lesson("3.2", "m3", "Lire un CSV", 7, "read_csv, puis tout de suite les types.", [
    "pd.read_csv(\"ventes.csv\") construit le tableau. On regarde les types avec df.dtypes.",
    "Si une colonne de nombres est restée en texte, les calculs d’après seront faux ou vides.",
  ], 'pd.read_csv("ventes.csv")'),
  lesson("3.3", "m3", "Choisir des colonnes", 6, "Une Series, ou un tableau plus étroit.", [
    "df[\"ville\"] est une Series. df[[\"client\", \"montant\"]] est un DataFrame à deux colonnes.",
    "On ne garde que ce qui sert la question. Le reste n’a pas besoin de voyager.",
  ]),
  lesson34,
  lesson("3.5", "m3", "Valeurs manquantes", 8, "Compter les trous avant de les traiter.", [
    "df.isna().sum() compte les trous par colonne.",
    "Supprimer, remplir, ou laisser\u202f: les trois choix se justifient. Le silence ne se justifie pas.",
  ], "df.isna().sum()"),
  lesson36,
  lesson("3.7", "m3", "Joindre deux tables", 9, "Deux tableaux, une clé, un merge.", [
    "Les ventes d’un côté, les clients de l’autre, une clé en commun. merge aligne les lignes sur cette clé.",
    "Une jointure interne oublie les lignes sans correspondance. Il faut savoir si c’est voulu.",
  ]),
  lesson("3.8", "m3", "Relire un résultat", 7, "Un total qui boucle vaut mieux qu’un tableau qui a l’air bien.", [
    "On vérifie l’ordre de grandeur, le nombre de lignes, une somme qu’on sait refaire à la main.",
    "Un tableau qui «\u00a0a l’air bien\u00a0» n’est pas un résultat.",
  ]),
  lesson("4.1", "m4", "Une question, un graphe", 7, "Le graphe répond, il ne décore pas.", [
    "On choisit un graphe parce qu’il répond à une question\u202f: comparer, évoluer, distribuer.",
    "Si la question n’est pas écrite, le graphe n’a pas de titre possible.",
  ]),
  lesson("4.2", "m4", "Barres", 8, "Une longueur par valeur, un axe qui part de zéro.", [
    "Une barre par catégorie. Matplotlib trace, le titre dit la phrase.",
    "L’axe d’une barre commence à zéro. Le couper fait mentir la longueur.",
  ]),
  lesson("4.3", "m4", "Courbes", 7, "Une courbe suppose un ordre.", [
    "Une courbe relie des points dans le temps. Elle suppose que l’ordre existe.",
    "Sans ordre, une courbe invente une continuité qui n’est pas dans les données.",
  ]),
  lesson("4.4", "m4", "Distributions", 8, "Où se trouvent les valeurs, pas seulement leur moyenne.", [
    "Un histogramme montre la forme du tas.",
    "Une moyenne peut cacher deux groupes. La forme le dit, le chiffre seul non.",
  ]),
  lesson("4.5", "m4", "Titre, axe, couleur", 6, "Le titre est une phrase.", [
    "Le titre dit ce qu’on voit, pas le nom de la colonne. Les axes ont une unité.",
    "La couleur distingue. Deux couleurs suffisent souvent.",
  ]),
  lesson("4.6", "m4", "La phrase du graphe", 6, "Pouvoir le dire à voix haute.", [
    "On doit pouvoir dire le graphe en une phrase.",
    "Si on n’y arrive pas, le graphe est trop chargé, ou la question était floue.",
  ]),
  lesson("5.1", "m5", "Lire une table", 8, "SELECT choisit, FROM dit d’où ça vient.", [
    "SELECT client, montant FROM ventes choisit des colonnes. Rien n’est encore filtré.",
    "On lit la requête depuis la table\u202f: FROM, puis WHERE, puis SELECT.",
  ], "SELECT client, montant\nFROM ventes"),
  lesson("5.2", "m5", "WHERE", 8, "Le filtre, avant les agrégats.", [
    "WHERE montant > 100 garde des lignes, comme les crochets de pandas.",
    "On ne moyenne pas des lignes qu’on voulait exclure.",
  ]),
  lesson("5.3", "m5", "Agréger", 8, "Réduire la table à un nombre, en le disant.", [
    "SUM(montant) réduit la table à un total. COUNT(*) compte des lignes.",
    "COUNT(montant) ignore les montants vides. Ce n’est pas le même geste.",
  ]),
  lesson("5.4", "m5", "GROUP BY", 9, "Une somme par ville, pas une somme tout court.", [
    "GROUP BY ville fait une somme par ville, comme groupby en pandas.",
    "Toute colonne du SELECT est soit groupée, soit agrégée. Le reste est ambigu.",
  ]),
  lesson("5.5", "m5", "Joindre", 9, "Nommer les colonnes qui se ressemblent.", [
    "JOIN aligne deux tables sur une clé.",
    "ventes.montant vaut mieux que montant quand les deux tables en ont un.",
  ]),
  lesson("5.6", "m5", "Écrire pour être relu", 6, "Une requête se relit dans trois mois.", [
    "Les alias courts aident s’ils restent peu nombreux. L’indentation aussi.",
    "Une requête en une seule ligne est un brouillon, pas un livrable.",
  ]),
  lesson("5.7", "m5", "Fenêtres, l’idée", 9, "Calculer à côté des lignes, sans les écraser.", [
    "Une fonction de fenêtre calcule «\u00a0par rapport aux voisines\u00a0»\u202f: un rang, un cumul.",
    "SUM(montant) OVER (PARTITION BY ville) garde chaque commande et ajoute le total de sa ville.",
  ]),
  lesson("6.1", "m6", "Centre et étendue", 8, "Moyenne, médiane, minimum, maximum.", [
    "La moyenne est tirée par les extrêmes. La médiane dit la valeur du milieu.",
    "Sur des montants, on donne souvent les deux, plus le minimum et le maximum.",
  ]),
  lesson("6.2", "m6", "Dispersion", 8, "Deux moyennes égales, deux tas très différents.", [
    "Deux groupes peuvent partager une moyenne et avoir des écarts très différents.",
    "L’écart type résume la dispersion. Il ne remplace pas un histogramme.",
  ]),
  lesson("6.3", "m6", "Échantillon", 8, "On n’a presque jamais toute la population.", [
    "On a ceux qui sont dans le fichier, pas «\u00a0les clients\u00a0» en général.",
    "Dire plus que ce que le fichier contient est déjà une erreur d’analyse.",
  ]),
  lesson("6.4", "m6", "Corrélation", 8, "Bouger ensemble n’est pas causer.", [
    "Deux séries qui bougent ensemble sont corrélées. Cela ne dit pas que l’une cause l’autre.",
    "L’histoire qu’on en tire se marque comme une hypothèse.",
  ]),
  lesson("6.5", "m6", "Un test, une question", 9, "La question s’écrit avant le chiffre.", [
    "Un test statistique répond à une question écrite avant de regarder le résultat.",
    "Chercher un test jusqu’à ce qu’il soit «\u00a0significatif\u00a0» n’est pas une analyse.",
  ]),
  lesson("6.6", "m6", "L’A/B test", 9, "Deux versions, une mesure, une durée.", [
    "Deux versions, des groupes comparables, une mesure décidée à l’avance.",
    "Arrêter le jour où ça «\u00a0gagne\u00a0» fausse le résultat. La durée fait partie du protocole.",
  ]),
  lesson("7.1", "m7", "Ce qu’est un modèle", 8, "Une fonction apprise sur des exemples.", [
    "Un modèle prédit. Il n’explique pas tout seul.",
    "S’il n’y a pas de variable à prédire, il n’y a pas besoin de modèle.",
  ]),
  lesson("7.2", "m7", "Régression", 9, "Prédire un nombre, parfois avec une droite.", [
    "La régression prédit un nombre\u202f: un montant, une durée, une quantité.",
    "Une droite peut suffire. On le vérifie avant d’en prendre un modèle plus lourd.",
  ]),
  lesson("7.3", "m7", "Classification", 9, "Prédire une catégorie, et regarder ce qu’on rate.", [
    "La classification prédit une catégorie\u202f: parti, resté, à relancer.",
    "Le taux de bonnes réponses ne suffit pas si une classe est rare.",
  ]),
  lesson("7.4", "m7", "Le jeu de test", 8, "Juger le modèle sur ce qu’il n’a pas vu.", [
    "On met de côté des exemples que le modèle n’a pas vus. C’est sur eux qu’on le juge.",
    "Mesurer sur l’entraînement dit surtout s’il a mémorisé.",
  ]),
  lesson("7.5", "m7", "Surapprentissage", 8, "Briller à l’entraînement, se tromper après.", [
    "Un modèle trop souple colle au bruit.",
    "Simplifier, ou donner plus d’exemples\u202f: les deux réponses existent, aucune n’est automatique.",
  ]),
  lesson("7.6", "m7", "scikit-learn, le minimum", 10, "fit apprend, predict applique.", [
    "Le même schéma sert pour une régression et un arbre\u202f: fit, puis predict.",
    "On importe peu. On sait dire en une phrase ce que l’objet a appris à faire.",
  ]),
  lesson("8.1", "m8", "La question", 8, "Une décision, pas «\u00a0explorer les données\u00a0».", [
    "Le projet part d’une décision\u202f: que veut-on savoir, et qu’est-ce qui changerait si on le savait\u202f?",
    "«\u00a0Explorer les données\u00a0» n’est pas une question. C’est une étape.",
  ]),
  lesson("8.2", "m8", "Les données", 8, "D’où vient le fichier, ce qu’une ligne représente.", [
    "Qui a produit le fichier, et ce qu’une ligne représente\u202f: on l’écrit avant de coder.",
    "Un jeu de données sans dictionnaire des colonnes se lit à moitié.",
  ]),
  lesson("8.3", "m8", "Le nettoyage", 9, "Chaque choix noté, pour pouvoir le refaire.", [
    "Lignes ôtées, types convertis, trous remplis\u202f: chacun de ces gestes s’écrit.",
    "Quelqu’un d’autre doit pouvoir refaire le tableau propre à partir du fichier brut.",
  ]),
  lesson("8.4", "m8", "L’analyse", 10, "Quelques chiffres, chacun avec une phrase.", [
    "Quelques chiffres qui répondent à la question, pas tous les chiffres possibles.",
    "Chaque résultat a une phrase. Le reste va en annexe.",
  ]),
  lesson("8.5", "m8", "Les limites", 7, "Ce que les données ne permettent pas de dire.", [
    "Ce qu’on ne peut pas affirmer fait partie du projet.",
    "Une limite écrite protège le lecteur, et elle protège l’auteur.",
  ]),
  lesson("8.6", "m8", "Le récit", 8, "Question, données, geste, résultat, limite.", [
    "On raconte dans cet ordre. Le notebook est le brouillon.",
    "Le récit est ce qu’on peut envoyer.",
  ]),
];

export const lessons: Lesson[] = base;

export function getLesson(id: string) {
  return lessons.find((item) => item.id === id) ?? null;
}

export function lessonParam(id: string) {
  return id.replace(".", "-");
}

export function lessonIdFromParam(param: string) {
  return param.replace("-", ".");
}

export function lessonPath(id: string) {
  return `/lecons/${lessonParam(id)}`;
}
