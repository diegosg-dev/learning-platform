import type { Metadata } from "next";
import { ExamIntro } from "@/components/exam-flow";

export const metadata: Metadata = { title: "Examen" };

export default function Page() {
  return <ExamIntro />;
}
