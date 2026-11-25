import type { Metadata } from "next";
import { CatalogueView } from "@/components/catalogue-view";

export const metadata: Metadata = { title: "Catalogue" };

export default function Page() {
  return <CatalogueView />;
}
