"use client";

import { QuizRunner } from "@/components/quiz-runner";
import { useProgress } from "@/components/progress-provider";
import { dayKey } from "@/lib/format";
import { reviewQuiz } from "@/lib/questions";

export default function RevisionPage() {
  const { state, awardReview } = useProgress();
  const already = state.reviewAwardDay === dayKey();

  return (
    <QuizRunner
      questions={reviewQuiz}
      eyebrow="Révision"
      xpPerCorrect={already ? 0 : 10}
      doneHref="/tableau-de-bord"
      doneLabel="Retour au tableau de bord"
      onComplete={(result) => awardReview(already ? 0 : result.correct * 10)}
    />
  );
}
