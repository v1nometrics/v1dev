import type { Metadata } from "next";
import { HosteProposal } from "@/components/hoste/hoste-proposal";

export const metadata: Metadata = {
  title: "hoste · listing onboarding automation",
  description:
    "Proposal for Hoste: automate vacation-rental listing onboarding from Typeform through Guesty with a lean dashboard and measured operating cost.",
  openGraph: {
    title: "hoste · listing onboarding automation",
    description:
      "Two paths for Hoste listing automation — Claude-assisted vs owned pipeline — with costs, architecture, and ROI on admin hours.",
    url: "https://v1torres.dev/hoste",
    type: "website",
  },
};

export default function HostePage() {
  return <HosteProposal />;
}
