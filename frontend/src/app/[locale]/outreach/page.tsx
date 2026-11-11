import type { Metadata } from "next";
import { OutreachProposal } from "@/components/outreach/outreach-proposal";

const robots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const portuguese = locale === "pt-BR";

  return {
    title: portuguese ? "hoste · prospecção de donos" : "hoste · owner outreach",
    description: portuguese
      ? "Proposta para a Hoste: um painel privado que cruza anúncios da AirDNA com endereços e exporta os contatos disponíveis."
      : "Proposal for Hoste: a private panel that matches AirDNA listings to addresses and exports available owner contacts.",
    robots,
    openGraph: {
      title: portuguese ? "hoste · prospecção de donos" : "hoste · owner outreach",
      description: portuguese
        ? "Fase 1 da prospecção de donos da Hoste. Usa a conta AirDNA já paga. US$ 1.680 fechado."
        : "Phase 1 panel for Hoste owner outreach. Uses the AirDNA account already paid for. US$ 1,680 fixed.",
      url: portuguese ? "https://v1torres.dev/outreach" : "https://v1torres.dev/en/outreach",
      type: "website",
    },
  };
}

export default function OutreachPage() {
  return <OutreachProposal />;
}
