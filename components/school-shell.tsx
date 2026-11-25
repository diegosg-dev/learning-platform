"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Award,
  House,
  LayoutGrid,
  Library,
  Menu,
  Trophy,
  X,
} from "lucide-react";
import { Logo, initials } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProgress } from "@/components/progress-provider";
import { levelFor } from "@/lib/levels";
import { cn } from "@/lib/utils";

const links = [
  { href: "/tableau-de-bord", label: "Tableau de bord", icon: House },
  { href: "/catalogue", label: "Catalogue", icon: LayoutGrid },
  { href: "/mes-programmes", label: "Mes programmes", icon: Library },
  { href: "/classement", label: "Classement", icon: Trophy },
  { href: "/certificats", label: "Certificats", icon: Award },
];

function isActive(pathname: string, href: string) {
  if (href === "/mes-programmes") {
    return pathname.startsWith("/mes-programmes") || pathname.startsWith("/programmes");
  }
  if (href === "/certificats") return pathname.startsWith("/certificats");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SchoolShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, reset } = useProgress();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const level = levelFor(state.xp);

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="École">
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
              active ? "bg-blue-soft text-blue" : "text-ink-soft hover:bg-paper hover:text-navy",
            )}
          >
            <Icon className="size-[18px]" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-dvh bg-paper">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-line bg-white lg:flex">
        <div className="px-5 py-5">
          <Logo tone="onLight" href="/tableau-de-bord" />
        </div>
        <div className="px-3">{nav}</div>
        <div className="mt-auto border-t border-line p-4">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-navy text-xs font-semibold text-gold">
              {initials(state.learner.firstName, state.learner.lastName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{state.learner.firstName}</p>
              <p className="truncate text-xs text-ink-soft">
                Niveau {level.level} · {level.title}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setConfirm(true)}
            className="mt-3 text-left text-xs text-ink-soft underline-offset-2 hover:underline"
          >
            Réinitialiser la démo
          </button>
          <Link href="/" className="mt-2 block text-xs text-ink-soft hover:text-navy">
            ← Le site
          </Link>
        </div>
      </aside>

      <div className="no-print sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line bg-white"
          aria-label="Ouvrir la navigation"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" />
        </button>
        <Logo tone="onLight" href="/tableau-de-bord" />
        <Link href="/quiz" className="ml-auto text-sm font-semibold text-blue">
          Quiz
        </Link>
      </div>

      {open ? (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/40"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,300px)] flex-col bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <Logo tone="onLight" href="/tableau-de-bord" />
              <button type="button" aria-label="Fermer" onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
            {nav}
            <Link href="/" onClick={() => setOpen(false)} className="mt-6 text-sm text-ink-soft">
              ← Le site
            </Link>
          </div>
        </div>
      ) : null}

      <div className="school-main lg:pl-[248px]">
        <main id="contenu">{children}</main>
      </div>

      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réinitialiser la démo&nbsp;?</DialogTitle>
            <DialogDescription>
              XP, série et progression reviennent aux données d’exemple, sur cet appareil seulement.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-0 bg-transparent">
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Annuler
            </Button>
            <Button
              variant="navy"
              onClick={() => {
                reset();
                setConfirm(false);
              }}
            >
              Réinitialiser
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
