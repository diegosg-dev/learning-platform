# Académie

École en ligne, en français. La profondeur d’un cursus (leçons courtes, QCM, certificat, examen final) et le rythme d’une appli (XP, série, ligue). Cette première version se concentre sur le parcours **Data & IA**. Les cinq autres programmes sont annoncés, pas encore ouverts.

Les prix, durées, classements et frais d’examen sont des **hypothèses**. Rien n’est vendu, rien n’est accrédité. La progression reste dans le navigateur (`localStorage`, clé `academie.v1`).

## Lancer en local

```bash
npm install
npm run dev
```

Le site écoute sur [http://127.0.0.1:43219](http://127.0.0.1:43219).

```bash
npm test    # mini-interpréteur pandas de la leçon
npm run lint
npm run build
```

`npm run build` produit un site statique dans `out/`.

## Où restyler

Tout le thème est dans `app/globals.css`, bloc `:root` : navy `#14213D`, bleu `#2541B2`, or `#FFC94D`, vert `#16A34A`, papier `#F5F7FC`, rayons 18 et 24. Les polices (Plus Jakarta Sans, Newsreader pour les titres, JetBrains Mono) sont branchées dans `app/layout.tsx`. Pour revenir à un sans partout, faire pointer `--font-display` vers Jakarta.

## Déployer gratuitement

Le build est un export statique Next.js (`output: "export"`). Aucune variable d’environnement.

### Vercel

1. Créer un projet sur [vercel.com](https://vercel.com) à partir du dépôt, ou en local : `npx vercel login` puis `npx vercel`.
2. Framework : Next.js. Commande de build : `npm run build`. Aucun réglage supplémentaire : Vercel publie le dossier `out/` quand `output: "export"` est présent.
3. Pas de variable d’environnement.

### Netlify ou Cloudflare Pages

- Build : `npm run build`
- Dossier publié : `out`

### Sans compte Git

Après `npm run build`, déposer le dossier `out/` sur [Netlify Drop](https://app.netlify.com/drop).

## Parcours de démo

L’élève d’exemple est Pierre Leclerc d’Orleac (2 450 XP, série de 12 jours, modules 1 et 2 terminés). « Réinitialiser la démo », en bas de la barre latérale, revient à cet état. La leçon 3.4 enchaîne concept, question, geste et script. L’éditeur comprend les filtres, le tri et `groupby … sum()` sur `ventes.csv`. Le quiz rapide et la simulation d’examen (8 questions, 70/100) mettent à jour l’XP sur cet appareil.
