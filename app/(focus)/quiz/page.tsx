"use client";

import { QuizRunner } from "@/components/quiz-runner";
import { useProgress } from "@/components/progress-provider";
import { dayKey } from "@/lib/format";
import { dailyQuiz } from "@/lib/questions";

export default function QuizPage() {
  const { state, awardQuiz } = useProgress();
  const already = state.quizAwardDay === dayKey();

  return (
    <QuizRunner
      questions={dailyQuiz}
      eyebrow="Quiz rapide"
      xpPerCorrect={already ? 0 : 10}
      onComplete={(result) => {
        if (!already) awardQuiz(result.correct * 10);
        else awardQuiz(0);
      }}
    />
  );
}
