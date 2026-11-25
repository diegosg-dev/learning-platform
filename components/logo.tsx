import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  tone = "onDark",
  href = "/",
}: {
  tone?: "onDark" | "onLight";
  href?: string;
}) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 rounded-lg">
      <span className="grid size-8 place-items-center rounded-[9px] bg-gold text-[17px] font-semibold tracking-tight text-navy">
        A
      </span>
      <span
        className={cn(
          "text-[17px] font-semibold tracking-[-0.03em]",
          tone === "onDark" ? "text-white" : "text-navy",
        )}
      >
        Académie
      </span>
    </Link>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex max-w-full items-center rounded-full bg-orange-soft px-3 py-1 text-[13px] leading-5 font-medium text-orange">
      {children}
    </p>
  );
}

export function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}
