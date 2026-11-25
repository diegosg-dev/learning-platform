export type Choice = { id: string; label: string };

export type Question = {
  id: string;
  prompt: string;
  choices: Choice[];
  answer: string;
  explanation: string;
};

export type ConceptStep = {
  type: "concept";
  title: string;
  minutes: number;
  paragraphs: string[];
  example?: string;
  remember?: string;
  frames: { title: string; body: string }[];
};

export type QuizStep = {
  type: "quiz";
  prompt: string;
  choices: Choice[];
  answer: string;
  explanation: string;
  xp: number;
};

export type CompleteStep = {
  type: "complete";
  title: string;
  prompt: string;
  code: string;
  options: string[];
  answer: string;
  explanation: string;
  xp: number;
};

export type CodeStep = {
  type: "code";
  title: string;
  prompt: string;
  starter: string;
  hint: string;
  exerciseId: "filter-sort" | "group-sum";
  xp: number;
};

export type Step = ConceptStep | QuizStep | CompleteStep | CodeStep;

export type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  minutes: number;
  xp: number;
  summary: string;
  steps: Step[];
};

export type Module = {
  id: string;
  index: number;
  title: string;
  hours: number;
  blurb: string;
};

export type ProgrammeIcon =
  | "data"
  | "code"
  | "business"
  | "finance"
  | "leadership"
  | "science";

export type Programme = {
  slug: string;
  name: string;
  short: string;
  icon: ProgrammeIcon;
  pitch: string;
  available: boolean;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  hours: number;
  modulesCount: number;
  skills: string[];
  certificate: string;
  summary: string;
};
