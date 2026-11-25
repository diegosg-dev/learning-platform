import type { Metadata } from "next";
import { CertificateView } from "@/components/certificate-view";

export const metadata: Metadata = { title: "Certificat" };

export default function Page() {
  return <CertificateView mode="earned" />;
}
