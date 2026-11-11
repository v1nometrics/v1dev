import type { Metadata } from "next";
import { OutreachProposal } from "@/components/outreach/outreach-proposal";

export const metadata: Metadata = {
  title: "hoste · owner outreach",
  description:
    "Proposal for Hoste: a panel that turns an AirDNA market search into confirmed addresses and owner contacts.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "hoste · owner outreach",
    description:
      "Phase 1 panel for Hoste owner outreach. Uses the AirDNA account already paid for. US$ 1,700 fixed.",
    url: "https://v1torres.dev/outreach",
    type: "website",
  },
};

export default function OutreachPage() {
  return <OutreachProposal />;
}
