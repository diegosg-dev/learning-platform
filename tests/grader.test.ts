import assert from "node:assert/strict";
import { runExercise, VENTES } from "../lib/grader";

const filterSolution = `
import pandas as pd

df = pd.read_csv("ventes.csv")

# Filtre les montants > 100 puis trie
df[df["montant"] > 100].sort_values("montant", ascending=False)
`;

const filterStarter = `
import pandas as pd

df = pd.read_csv("ventes.csv")

# Garde les commandes de plus de 100 €.
`;

const multiline = `
df = pd.read_csv("ventes.csv")
df[df['montant'] > 100].sort_values(
    "montant",
    ascending=False,
)
`;

const groupSolution = `
import pandas as pd
df = pd.read_csv("ventes.csv")
df.groupby("ville")["montant"].sum()
`;

const passed = runExercise("filter-sort", filterSolution);
assert.equal(passed.passed, true, JSON.stringify(passed));
assert.deepEqual(
  passed.table?.rows.map((row) => row.index),
  [12, 3, 27],
);
assert.deepEqual(
  passed.table?.rows.map((row) => row.cells.client),
  ["Martin", "Dubois", "Leroy"],
);

const starter = runExercise("filter-sort", filterStarter);
assert.equal(starter.ok, true);
assert.equal(starter.passed, false);
assert.equal(starter.table?.rows.length, VENTES.length);

const wrapped = runExercise("filter-sort", multiline);
assert.equal(wrapped.passed, true, wrapped.error);

const ascending = runExercise(
  "filter-sort",
  `df = pd.read_csv("ventes.csv")\ndf[df["montant"] > 100].sort_values("montant")`,
);
assert.equal(ascending.tests.find((test) => test.id === "filter")?.pass, true);
assert.equal(ascending.tests.find((test) => test.id === "sort")?.pass, false);

const broken = runExercise("filter-sort", `df[df["montant" > 100]`);
assert.equal(broken.ok, false);
assert.equal(typeof broken.error, "string");

const grouped = runExercise("group-sum", groupSolution);
assert.equal(grouped.passed, true, JSON.stringify(grouped, null, 2));
const paris = grouped.table?.rows.find((row) => row.cells.ville === "Paris");
assert.ok(paris);
assert.ok(Math.abs(Number(paris?.cells.montant) - (315.5 + 54 + 40)) < 0.11);

const keyword = runExercise(
  "filter-sort",
  `df = pd.read_csv("ventes.csv")\ndf[df["montant"] > 100].sort_values(by="montant", ascending=False)`,
);
assert.equal(keyword.passed, true, keyword.error);

console.log("grader: ok");
