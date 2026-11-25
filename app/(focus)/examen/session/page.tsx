import type { Metadata } from "next";
import { ExamSession } from "@/components/exam-flow";

export const metadata: Metadata = { title: "Session d’examen" };

export default function Page() {
  return <ExamSession />;
}
