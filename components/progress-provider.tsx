"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SEEDED_COMPLETE } from "@/lib/content";
import { dayKey } from "@/lib/format";
import { levelFor } from "@/lib/levels";

const KEY = "academie.v1";

export type Progress = {
  version: 1;
  learner: { firstName: string; lastName: string };
  xp: number;
  weeklyXp: number;
  streak: number;
  lastActiveDay: string;
  dailyStamp: string;
  dailyXp: number;
  dailyGoal: number;
  dailyTasks: { video: boolean; exercises: boolean; quiz: boolean };
  completedLessons: string[];
  awardedLessons: string[];
  lessonStep: Record<string, number>;
  hintsUsed: string[];
  quizAwardDay: string | null;
  reviewAwardDay: string | null;
  exam: { status: "idle" | "passed" | "failed"; score: number | null; date: string | null };
  inPortfolio: boolean;
  waitlist: string[];
};

function createSeed(): Progress {
  const today = dayKey();
  return {
    version: 1,
    learner: { firstName: "Pierre", lastName: "Leclerc d’Orleac" },
    xp: 2450,
    weeklyXp: 920,
    streak: 12,
    lastActiveDay: today,
    dailyStamp: today,
    dailyXp: 30,
    dailyGoal: 50,
    dailyTasks: { video: true, exercises: true, quiz: false },
    completedLessons: [...SEEDED_COMPLETE],
    awardedLessons: [...SEEDED_COMPLETE],
    lessonStep: {},
    hintsUsed: [],
    quizAwardDay: null,
    reviewAwardDay: null,
    exam: { status: "idle", score: null, date: null },
    inPortfolio: false,
    waitlist: [],
  };
}

const SEED = createSeed();

function normalize(state: Progress): Progress {
  const today = dayKey();
  if (state.dailyStamp === today) return state;
  return {
    ...state,
    dailyStamp: today,
    dailyXp: 0,
    dailyTasks: { video: false, exercises: false, quiz: false },
  };
}

function withActivity(state: Progress): Progress {
  const today = dayKey();
  const base = normalize(state);
  if (base.lastActiveDay === today) return base;
  const streak = base.lastActiveDay === dayKey(-1) ? base.streak + 1 : 1;
  return { ...base, lastActiveDay: today, streak };
}

function gain(state: Progress, amount: number): Progress {
  const base = withActivity(state);
  return {
    ...base,
    xp: Math.max(0, base.xp + amount),
    weeklyXp: Math.max(0, base.weeklyXp + amount),
    dailyXp: Math.max(0, base.dailyXp + amount),
  };
}

function unique(values: string[], value: string) {
  return values.includes(value) ? values : [...values, value];
}

type ProgressApi = {
  state: Progress;
  ready: boolean;
  toast: string | null;
  dismissToast: () => void;
  setLearner: (firstName: string, lastName: string) => void;
  awardLesson: (id: string, xp: number) => void;
  setLessonStep: (id: string, step: number) => void;
  markDaily: (task: keyof Progress["dailyTasks"]) => void;
  takeHint: (lessonId: string) => boolean;
  awardQuiz: (xp: number) => number;
  awardReview: (xp: number) => number;
  finishExam: (score: number) => void;
  togglePortfolio: () => void;
  joinWaitlist: (slug: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressApi | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Progress>(SEED);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Progress;
        if (parsed?.version === 1 && parsed.learner?.firstName) {
          setState(normalize(parsed));
        }
      }
    } catch {
      /* stockage illisible : on garde l’exemple */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [ready, state]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const api = useMemo<ProgressApi>(() => {
    return {
      state,
      ready,
      toast,
      dismissToast: () => setToast(null),
      setLearner: (firstName, lastName) => {
        setState((prev) => ({
          ...prev,
          learner: {
            firstName: firstName.trim() || prev.learner.firstName,
            lastName: lastName.trim() || prev.learner.lastName,
          },
        }));
      },
      awardLesson: (id, xp) => {
        const already = stateRef.current.awardedLessons.includes(id);
        const before = levelFor(stateRef.current.xp).level;
        setState((prev) => {
          const completedLessons = unique(prev.completedLessons, id);
          if (prev.awardedLessons.includes(id)) {
            return withActivity({ ...prev, completedLessons });
          }
          const next = gain(prev, xp);
          return {
            ...next,
            completedLessons,
            awardedLessons: unique(prev.awardedLessons, id),
          };
        });
        if (!already && xp > 0) {
          const after = levelFor(stateRef.current.xp + xp).level;
          setToast(
            after > before
              ? `Niveau ${after} atteint · +${xp} XP`
              : `Leçon validée · +${xp} XP`,
          );
        }
      },
      setLessonStep: (id, step) => {
        setState((prev) => ({
          ...prev,
          lessonStep: {
            ...prev.lessonStep,
            [id]: Math.max(prev.lessonStep[id] ?? 0, step),
          },
        }));
      },
      markDaily: (task) => {
        setState((prev) => {
          const base = withActivity(prev);
          return { ...base, dailyTasks: { ...base.dailyTasks, [task]: true } };
        });
      },
      takeHint: (lessonId) => {
        const already = stateRef.current.hintsUsed.includes(lessonId);
        if (already) return false;
        setState((prev) => {
          if (prev.hintsUsed.includes(lessonId)) return prev;
          const next = gain(prev, -5);
          return { ...next, hintsUsed: [...prev.hintsUsed, lessonId] };
        });
        setToast("Indice · −5 XP");
        return true;
      },
      awardQuiz: (xp) => {
        const today = dayKey();
        if (stateRef.current.quizAwardDay === today) {
          setState((prev) => {
            const base = withActivity(prev);
            return { ...base, dailyTasks: { ...base.dailyTasks, quiz: true } };
          });
          return 0;
        }
        setState((prev) => {
          const next = gain(prev, xp);
          return {
            ...next,
            quizAwardDay: today,
            dailyTasks: { ...next.dailyTasks, quiz: true },
          };
        });
        if (xp > 0) setToast(`Quiz rapide · +${xp} XP`);
        return xp;
      },
      awardReview: (xp) => {
        const today = dayKey();
        if (stateRef.current.reviewAwardDay === today) return 0;
        setState((prev) => {
          const next = gain(prev, xp);
          return { ...next, reviewAwardDay: today };
        });
        if (xp > 0) setToast(`Révision · +${xp} XP`);
        return xp;
      },
      finishExam: (score) => {
        const passed = score >= 70;
        const already = stateRef.current.exam.status === "passed";
        const before = levelFor(stateRef.current.xp).level;
        setState((prev) => {
          const base = passed && prev.exam.status !== "passed" ? gain(prev, 500) : withActivity(prev);
          return {
            ...base,
            exam: { status: passed ? "passed" : "failed", score, date: dayKey() },
          };
        });
        if (passed && !already) {
          const after = levelFor(stateRef.current.xp + 500).level;
          setToast(after > before ? `+500 XP · Niveau ${after} atteint` : "+500 XP");
        }
      },
      togglePortfolio: () => {
        setState((prev) => ({ ...prev, inPortfolio: !prev.inPortfolio }));
        setToast(
          stateRef.current.inPortfolio
            ? "Retiré du portfolio de démo"
            : "Ajouté au portfolio de démo, sur cet appareil",
        );
      },
      joinWaitlist: (slug) => {
        const already = stateRef.current.waitlist.includes(slug);
        setState((prev) => ({ ...prev, waitlist: unique(prev.waitlist, slug) }));
        setToast(already ? "Tu es déjà sur la liste" : "Noté. On te préviendra à l’ouverture.");
      },
      reset: () => {
        const fresh = createSeed();
        setState(fresh);
        setToast("Démo réinitialisée");
      },
    };
  }, [ready, state, toast]);

  return (
    <ProgressContext.Provider value={api}>
      {children}
      {toast ? (
        <div
          role="status"
          className="no-print fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-navy px-4 py-2 text-sm text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("useProgress hors du provider");
  return value;
}
