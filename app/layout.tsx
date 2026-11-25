import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const display = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Académie — L’école en ligne, le rythme d’une appli",
    template: "%s — Académie",
  },
  description:
    "Cursus de niveau universitaire, leçons de dix minutes, exercices dans le navigateur et examen surveillé. Première version, centrée sur le parcours Data.",
  applicationName: "Académie",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-navy"
        >
          Aller au contenu
        </a>
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
