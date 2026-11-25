export type Cell = string | number;

export type Row = {
  id: number;
  client: string;
  ville: string;
  montant: number;
};

export type Table = {
  columns: string[];
  rows: { index: number; cells: Record<string, Cell> }[];
};

export type TestResult = { id: string; label: string; pass: boolean };

export type ExerciseRun = {
  ok: boolean;
  error?: string;
  table: Table | null;
  tests: TestResult[];
  passed: boolean;
};

export const VENTES: Row[] = [
  { id: 12, client: "Martin", ville: "Lyon", montant: 480 },
  { id: 4, client: "Bernard", ville: "Lille", montant: 45 },
  { id: 3, client: "Dubois", ville: "Paris", montant: 315.5 },
  { id: 9, client: "Petit", ville: "Toulouse", montant: 62 },
  { id: 27, client: "Leroy", ville: "Nantes", montant: 122.9 },
  { id: 15, client: "Morel", ville: "Rennes", montant: 96 },
  { id: 6, client: "Garcia", ville: "Paris", montant: 54 },
  { id: 18, client: "Roux", ville: "Lyon", montant: 18 },
  { id: 21, client: "Fournier", ville: "Bordeaux", montant: 74 },
  { id: 8, client: "Girard", ville: "Lille", montant: 88 },
  { id: 31, client: "Simon", ville: "Paris", montant: 40 },
];

type Frame =
  | { kind: "rows"; rows: Row[] }
  | { kind: "agg"; columns: string[]; records: Record<string, Cell>[] };

type Arg = { name: string | null; value: string | number | boolean };

type ParseOk<T> = { value: T; i: number };
type ParseErr = { error: string };
type Parsed<T> = ParseOk<T> | ParseErr;

function isErr<T>(result: Parsed<T>): result is ParseErr {
  return "error" in result;
}

export function ventesCsv() {
  const lines = VENTES.map(
    (row) => `${row.id},${row.client},${row.ville},${row.montant}`,
  );
  return ["id,client,ville,montant", ...lines].join("\n");
}

export function formatCell(value: Cell) {
  if (typeof value === "number") {
    return (Math.round(value * 10) / 10).toFixed(1);
  }
  return value;
}

function skip(source: string, index: number) {
  let i = index;
  while (i < source.length && /\s/.test(source[i] ?? "")) i += 1;
  return i;
}

function matchIdent(source: string, index: number) {
  const found = /^[A-Za-z_][A-Za-z0-9_]*/.exec(source.slice(index));
  if (!found) return null;
  return { value: found[0], i: index + found[0].length };
}

function parseString(source: string, index: number): Parsed<string> {
  const quote = source[index];
  if (quote !== '"' && quote !== "'") return { error: "Texte attendu." };
  let i = index + 1;
  let value = "";
  while (i < source.length && source[i] !== quote) {
    value += source[i];
    i += 1;
  }
  if (i >= source.length) return { error: "Guillemet non fermé." };
  return { value, i: i + 1 };
}

function parseLiteral(source: string, index: number): Parsed<string | number | boolean> {
  const i = skip(source, index);
  if (source[i] === '"' || source[i] === "'") {
    const text = parseString(source, i);
    if (isErr(text)) return text;
    return text;
  }
  const number = /^-?\d+(\.\d+)?/.exec(source.slice(i));
  if (number) return { value: Number(number[0]), i: i + number[0].length };
  const ident = matchIdent(source, i);
  if (ident?.value === "True") return { value: true, i: ident.i };
  if (ident?.value === "False") return { value: false, i: ident.i };
  return { error: "Valeur attendue\u202f: nombre, texte, True ou False." };
}

function parseArgs(source: string, index: number): Parsed<Arg[]> {
  if (source[index] !== "(") return { error: "Parenthèse ouvrante attendue." };
  let i = index + 1;
  const args: Arg[] = [];
  while (i < source.length) {
    i = skip(source, i);
    if (source[i] === ")") return { value: args, i: i + 1 };
    let name: string | null = null;
    const ident = matchIdent(source, i);
    const afterIdent = ident ? skip(source, ident.i) : i;
    if (ident && source[afterIdent] === "=" && source[afterIdent + 1] !== "=") {
      name = ident.value;
      i = afterIdent + 1;
    }
    const literal = parseLiteral(source, i);
    if (isErr(literal)) return literal;
    args.push({ name, value: literal.value });
    i = skip(source, literal.i);
    if (source[i] === ",") {
      i += 1;
      continue;
    }
    if (source[i] === ")") return { value: args, i: i + 1 };
    return { error: "Argument mal formé." };
  }
  return { error: "Parenthèse non fermée." };
}

const OPS = [">=", "<=", "==", "!=", ">", "<"] as const;

function parseOp(source: string, index: number) {
  const i = skip(source, index);
  const found = OPS.find((op) => source.startsWith(op, i));
  if (!found) return null;
  return { value: found, i: i + found.length };
}

function compare(left: Cell, op: (typeof OPS)[number], right: Cell) {
  if (op === "==") return String(left) === String(right);
  if (op === "!=") return String(left) !== String(right);
  const a = Number(left);
  const b = Number(right);
  if (Number.isNaN(a) || Number.isNaN(b)) return false;
  if (op === ">") return a > b;
  if (op === ">=") return a >= b;
  if (op === "<") return a < b;
  return a <= b;
}

function copyRows(rows: Row[]): Row[] {
  return rows.map((row) => ({ ...row }));
}

function parseFilter(source: string, index: number, env: Record<string, Row[]>): Parsed<Row[]> {
  let i = skip(source, index + 1);
  const name = matchIdent(source, i);
  if (!name) return { error: "Nom de tableau attendu dans le filtre." };
  const rows = env[name.value];
  if (!rows) return { error: `Je ne connais pas «\u00a0${name.value}\u00a0».` };
  i = skip(source, name.i);
  if (source[i] !== "[") return { error: "Colonne attendue dans le filtre." };
  i = skip(source, i + 1);
  const column = parseString(source, i);
  if (isErr(column)) return column;
  i = skip(source, column.i);
  if (source[i] !== "]") return { error: "Crochet de colonne non fermé." };
  const op = parseOp(source, i + 1);
  if (!op) return { error: "Opérateur attendu\u202f: >, >=, <, <=, == ou !=." };
  const literal = parseLiteral(source, op.i);
  if (isErr(literal)) return literal;
  if (typeof literal.value === "boolean") {
    return { error: "Compare la colonne à un nombre ou à un texte." };
  }
  i = skip(source, literal.i);
  if (source[i] !== "]") return { error: "Crochet du filtre non fermé." };
  const key = column.value;
  const sample = rows[0];
  if (sample && key !== "id" && !(key in sample)) {
    return { error: `Colonne «\u00a0${key}\u00a0» introuvable.` };
  }
  const kept = rows.filter((row) => {
    const cell = key === "id" ? row.id : row[key as keyof Row];
    if (cell === undefined) return false;
    return compare(cell, op.value, literal.value as Cell);
  });
  return { value: copyRows(kept), i: i + 1 };
}

function sortRows(rows: Row[], column: string, ascending: boolean) {
  const sorted = copyRows(rows);
  sorted.sort((a, b) => {
    const left = column === "id" ? a.id : a[column as keyof Row];
    const right = column === "id" ? b.id : b[column as keyof Row];
    if (typeof left === "number" && typeof right === "number") {
      return ascending ? left - right : right - left;
    }
    return ascending
      ? String(left).localeCompare(String(right), "fr")
      : String(right).localeCompare(String(left), "fr");
  });
  return sorted;
}

function applyCall(kind: "sort" | "head", rows: Row[], args: Arg[]): Row[] | ParseErr {
  if (kind === "head") {
    const count = args.find((arg) => arg.name === null)?.value;
    if (typeof count !== "number") return { error: "head attend un nombre." };
    return copyRows(rows.slice(0, count));
  }
  const by = args.find((arg) => arg.name === "by")?.value ?? args.find((arg) => arg.name === null)?.value;
  if (typeof by !== "string") return { error: "sort_values attend un nom de colonne." };
  if (rows.length > 0 && by !== "id" && !(by in rows[0])) {
    return { error: `Colonne «\u00a0${by}\u00a0» introuvable.` };
  }
  const ascendingArg = args.find((arg) => arg.name === "ascending")?.value;
  const ascending = typeof ascendingArg === "boolean" ? ascendingArg : true;
  return sortRows(rows, by, ascending);
}

function aggregate(rows: Row[], column: string, valueColumn: string, how: "sum") {
  if (how !== "sum") return null;
  const totals = new Map<string, number>();
  for (const row of rows) {
    const key = String(column === "id" ? row.id : row[column as keyof Row]);
    const amount = Number(valueColumn === "id" ? row.id : row[valueColumn as keyof Row]);
    totals.set(key, (totals.get(key) ?? 0) + (Number.isNaN(amount) ? 0 : amount));
  }
  return [...totals.entries()]
    .sort((a, b) => a[0].localeCompare(b[0], "fr"))
    .map(([key, total]) => ({ [column]: key, [valueColumn]: Math.round(total * 10) / 10 }));
}

function parseExpr(source: string, index: number, env: Record<string, Row[]>): Parsed<Frame> {
  let i = skip(source, index);
  const ident = matchIdent(source, i);
  if (!ident) return { error: "Expression inattendue." };
  i = ident.i;
  let frame: Frame;
  if (ident.value === "pd") {
    i = skip(source, i);
    if (!source.startsWith(".read_csv", i)) {
      return { error: "Cette démo connaît pd.read_csv." };
    }
    i += ".read_csv".length;
    const args = parseArgs(source, skip(source, i));
    if (isErr(args)) return args;
    const file = args.value.find((arg) => arg.name === null)?.value;
    if (file !== "ventes.csv") {
      return { error: "Ce fichier n’est pas dans la démo. Utilise ventes.csv." };
    }
    frame = { kind: "rows", rows: copyRows(VENTES) };
    i = args.i;
  } else {
    const rows = env[ident.value];
    if (!rows) return { error: `Je ne connais pas «\u00a0${ident.value}\u00a0».` };
    frame = { kind: "rows", rows: copyRows(rows) };
  }

  while (i < source.length) {
    const next = skip(source, i);
    if (source[next] === "[") {
      if (frame.kind !== "rows") return { error: "On ne filtre pas un tableau déjà agrégé, ici." };
      const filtered = parseFilter(source, next, env);
      if (isErr(filtered)) return filtered;
      frame = { kind: "rows", rows: filtered.value };
      i = filtered.i;
      continue;
    }
    if (source.startsWith(".sort_values", next) || source.startsWith(".head", next)) {
      if (frame.kind !== "rows") return { error: "Méthode indisponible sur ce résultat." };
      const method = source.startsWith(".head", next) ? "head" : "sort";
      const start = next + (method === "head" ? ".head".length : ".sort_values".length);
      const args = parseArgs(source, skip(source, start));
      if (isErr(args)) return args;
      const applied = applyCall(method, frame.rows, args.value);
      if ("error" in applied) return applied;
      frame = { kind: "rows", rows: applied };
      i = args.i;
      continue;
    }
    if (source.startsWith(".groupby", next)) {
      if (frame.kind !== "rows") return { error: "groupby s’applique à un tableau de lignes." };
      const args = parseArgs(source, skip(source, next + ".groupby".length));
      if (isErr(args)) return args;
      const column = args.value.find((arg) => arg.name === null)?.value;
      if (typeof column !== "string") return { error: "groupby attend un nom de colonne." };
      let j = skip(source, args.i);
      if (source[j] !== "[") return { error: "Précise la colonne à agréger\u202f: [\"montant\"]." };
      j = skip(source, j + 1);
      const valueColumn = parseString(source, j);
      if (isErr(valueColumn)) return valueColumn;
      j = skip(source, valueColumn.i);
      if (source[j] !== "]") return { error: "Crochet non fermé après groupby." };
      j = skip(source, j + 1);
      if (!source.startsWith(".sum", j)) {
        return { error: "Cette démo agrège avec .sum()." };
      }
      const sumArgs = parseArgs(source, skip(source, j + ".sum".length));
      if (isErr(sumArgs)) return sumArgs;
      const records = aggregate(frame.rows, column, valueColumn.value, "sum");
      if (!records) return { error: "Agrégation impossible." };
      frame = { kind: "agg", columns: [column, valueColumn.value], records };
      i = sumArgs.i;
      continue;
    }
    i = next;
    break;
  }

  const end = skip(source, i);
  if (end < source.length) {
    return { error: "Je n’ai pas compris la fin de l’expression." };
  }
  return { value: frame, i: end };
}

function splitStatements(source: string) {
  const statements: string[] = [];
  let current = "";
  let depth = 0;
  let quote: string | null = null;
  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      current += char;
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === "#") {
      while (i < source.length && source[i] !== "\n") i += 1;
      current += "\n";
      continue;
    }
    if (char === "(" || char === "[") depth += 1;
    if (char === ")" || char === "]") depth = Math.max(0, depth - 1);
    if ((char === "\n" || char === ";") && depth === 0) {
      if (current.trim()) statements.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  if (current.trim()) statements.push(current.trim());
  return statements;
}

function splitAssign(statement: string) {
  let depth = 0;
  let quote: string | null = null;
  for (let i = 0; i < statement.length; i += 1) {
    const char = statement[i];
    if (quote) {
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }
    if (char === "(" || char === "[") depth += 1;
    else if (char === ")" || char === "]") depth = Math.max(0, depth - 1);
    else if (char === "=" && depth === 0) {
      const prev = statement[i - 1];
      const next = statement[i + 1];
      if (prev === "=" || prev === "!" || prev === "<" || prev === ">" || next === "=") continue;
      const name = statement.slice(0, i).trim();
      if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) {
        return { name, expr: statement.slice(i + 1).trim() };
      }
    }
  }
  return null;
}

function toTable(frame: Frame): Table {
  if (frame.kind === "rows") {
    return {
      columns: ["client", "ville", "montant"],
      rows: frame.rows.map((row) => ({
        index: row.id,
        cells: { client: row.client, ville: row.ville, montant: row.montant },
      })),
    };
  }
  return {
    columns: frame.columns,
    rows: frame.records.map((record, index) => ({ index, cells: record })),
  };
}

function execute(source: string): { table: Table } | { error: string } {
  const statements = splitStatements(source);
  if (statements.length === 0) return { error: "Écris au moins une instruction." };
  const env: Record<string, Row[]> = {};
  let last: Frame | null = null;
  for (const statement of statements) {
    if (/^import\b/.test(statement)) continue;
    const assignment = splitAssign(statement);
    const expression = assignment ? assignment.expr : statement;
    if (/^print\s*\(/.test(expression) && expression.endsWith(")")) {
      const inner = expression.slice(expression.indexOf("(") + 1, -1);
      const parsed = parseExpr(inner, 0, env);
      if (isErr(parsed)) return parsed;
      last = parsed.value;
      continue;
    }
    const parsed = parseExpr(expression, 0, env);
    if (isErr(parsed)) return parsed;
    last = parsed.value;
    if (assignment && parsed.value.kind === "rows") {
      env[assignment.name] = parsed.value.rows;
    }
  }
  if (!last) return { error: "Ajoute une instruction qui produit un tableau." };
  return { table: toTable(last) };
}

function idsOf(table: Table) {
  return table.rows.map((row) => row.index);
}

function amountsOf(table: Table) {
  return table.rows.map((row) => Number(row.cells.montant));
}

const FILTER_TESTS = [
  {
    id: "filter",
    label: "Filtre correct",
    check: (table: Table) => {
      const expected = VENTES.filter((row) => row.montant > 100)
        .map((row) => row.id)
        .sort((a, b) => a - b);
      const got = [...idsOf(table)].sort((a, b) => a - b);
      return expected.length === got.length && expected.every((id, index) => id === got[index]);
    },
  },
  {
    id: "sort",
    label: "Tri décroissant",
    check: (table: Table) => {
      const amounts = amountsOf(table);
      return (
        amounts.length >= 2 &&
        amounts.every((amount, index) => index === 0 || amounts[index - 1] >= amount)
      );
    },
  },
  {
    id: "column",
    label: "Bonne colonne",
    check: (table: Table) => table.columns.includes("montant"),
  },
] as const;

function expectedGroups() {
  const totals = new Map<string, number>();
  for (const row of VENTES) totals.set(row.ville, (totals.get(row.ville) ?? 0) + row.montant);
  return [...totals.entries()].sort((a, b) => a[0].localeCompare(b[0], "fr"));
}

const GROUP_TESTS = [
  {
    id: "cities",
    label: "Une ligne par ville",
    check: (table: Table) => {
      const expected = expectedGroups().map(([ville]) => ville);
      const got = table.rows.map((row) => String(row.cells.ville));
      return expected.length === got.length && expected.every((ville, index) => ville === got[index]);
    },
  },
  {
    id: "sums",
    label: "Somme correcte",
    check: (table: Table) => {
      const expected = expectedGroups();
      return expected.every(([ville, total], index) => {
        const row = table.rows[index];
        return row && row.cells.ville === ville && Math.abs(Number(row.cells.montant) - total) < 0.11;
      });
    },
  },
  {
    id: "column",
    label: "Colonne ville",
    check: (table: Table) => table.columns.includes("ville"),
  },
] as const;

const EXERCISES = {
  "filter-sort": FILTER_TESTS,
  "group-sum": GROUP_TESTS,
} as const;

export type ExerciseId = keyof typeof EXERCISES;

export function runExercise(id: ExerciseId, source: string): ExerciseRun {
  try {
    const result = execute(source);
    if ("error" in result) {
      return {
        ok: false,
        error: result.error,
        table: null,
        tests: EXERCISES[id].map((test) => ({ id: test.id, label: test.label, pass: false })),
        passed: false,
      };
    }
    const tests = EXERCISES[id].map((test) => ({
      id: test.id,
      label: test.label,
      pass: test.check(result.table),
    }));
    return {
      ok: true,
      table: result.table,
      tests,
      passed: tests.every((test) => test.pass),
    };
  } catch {
    return {
      ok: false,
      error: "L’exécution s’est arrêtée. Vérifie les crochets et les parenthèses.",
      table: null,
      tests: EXERCISES[id].map((test) => ({ id: test.id, label: test.label, pass: false })),
      passed: false,
    };
  }
}
