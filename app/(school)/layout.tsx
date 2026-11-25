import { SchoolShell } from "@/components/school-shell";

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return <SchoolShell>{children}</SchoolShell>;
}
