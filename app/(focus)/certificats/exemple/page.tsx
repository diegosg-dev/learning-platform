import type { Metadata } from "next";
import { CertificateView } from "@/components/certificate-view";

export const metadata: Metadata = { title: "Certificat d’exemple" };

export default function Page() {
  return <CertificateView mode="example" />;
}
