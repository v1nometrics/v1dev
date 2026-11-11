export type OutreachCopy = {
  badges: string[];
  title: string;
  lede: string;
  recommendLabel: string;
  price: string;
  recommendRest: string;
  prepared: string;
  separate: string;
  facts: { label: string; value: string }[];
  sections: {
    what: string;
    path: string;
    source: string;
    build: string;
    cost: string;
    next: string;
    sources: string;
  };
  what: string[];
  steps: { title: string; detail: string }[];
  pathNotes: string[];
  sourceIntro: string;
  sourceHeaders: string[];
  sourceRows: string[][];
  sourceFoot: string;
  sourceNotes: string[];
  buildHeaders: string[];
  buildRows: string[][];
  buildFoot: string;
  timeline: { name: string; note: string }[];
  timelineCaption: string;
  buildNotes: string[];
  costIntro: string;
  costHeaders: string[];
  costRows: string[][];
  costFoot: string;
  costNotes: string[];
  next: string[];
  nextLabel: string;
  email: string;
  sources: { label: string; href: string }[];
};

const sources = [
  { label: "AirDNA API", href: "https://airdna.redoc.ly/" },
  { label: "AirDNA contact", href: "https://www.airdna.co/contact" },
  {
    label: "Google Geocoding",
    href: "https://developers.google.com/maps/billing-and-pricing/pricing",
  },
  { label: "Tracerfy", href: "https://www.tracerfy.com/pricing" },
  { label: "DeepSeek API pricing", href: "https://api-docs.deepseek.com/quick_start/pricing/" },
  { label: "OpenAI API pricing · vision budget reference", href: "https://developers.openai.com/api/docs/pricing" },
];

export const outreachCopy: Record<"en" | "pt-BR", OutreachCopy> = {
  en: {
    badges: ["proposal", "hoste", "owner outreach"],
    title: "hoste · owner outreach",
    lede: "A private panel to find rental listings, match property addresses with automated confidence scoring, and look up owner contacts for direct outreach.",
    recommendLabel: "fixed-price proposal",
    price: "phase 1 · US$ 1,700",
    recommendRest: "about 3 weeks · initial validation included · uses Hoste’s existing AirDNA account",
    prepared: "prepared for Hoste",
    separate: "separate from the listing onboarding delivery",
    facts: [
      { label: "you use", value: "a panel in the browser" },
      { label: "you pay", value: "US$ 1,700, fixed" },
      { label: "listings come from", value: "the AirDNA login you have" },
    ],
    sections: {
      what: "1 · what you get",
      path: "2 · the path",
      source: "4 · AirDNA: options & recommendation",
      build: "3 · fixed quote & delivery",
      cost: "5 · monthly running cost",
      next: "6 · next step",
      sources: "7 · sources",
    },
    what: [
      "Example: find Phoenix rentals rated 4.8 stars or below, identify the property, and export available owner contacts for Hoste’s outreach team.",
      "The panel automates search, address matching, and contact lookup into a single continuous pipeline. High-confidence matches flow straight to owner lookup, while borderline edge cases are isolated by confidence thresholds for optional verification.",
    ],
    steps: [
      {
        title: "search",
        detail: "City, a ceiling of 4.8 stars, and target volume. The system ingests listings and staging data automatically.",
      },
      {
        title: "address",
        detail: "The pin is approximate on purpose. The system identifies candidate parcels, correlates attributes, and calculates a match confidence score.",
      },
      {
        title: "threshold",
        detail: "High-confidence matches proceed automatically. Borderline cases below threshold flag side-by-side photos for quick spot-checking.",
      },
      {
        title: "owner",
        detail: "Confirmed addresses are queried for owner records and exported to a spreadsheet; missing data is flagged incomplete without breaking the batch.",
      },
    ],
    pathNotes: [
      "Airbnb hides the exact address. The pin can sit hundreds of meters off. The system crosses the pin with public parcel maps first; pool shape, roof, and furniture are checked only when a few houses remain.",
      "Owner names, phones, and emails come from a property-data vendor after address confirmation. AI does not invent contact details; unavailable results are marked incomplete.",
    ],
    sourceIntro:
      "After our AirDNA meeting, the written quote confirmed two API options. Neither is cost-effective for this scope. I recommend testing collection through Hoste’s existing account instead.",
    sourceHeaders: ["path", "what you get", "price they quoted", "fit"],
    sourceRows: [
      [
        "Market Data API",
        "city and submarket totals: occupancy, rate, revenue, supply, trends",
        "US$ 7,000/year · 2,000 calls/mo · US$ 0.50 after",
        "no individual house",
      ],
      [
        "Property Valuations & Comps",
        "search a market with filters, then each listing: location, attributes, listing info",
        "US$ 12,000/year · 4,000 calls/mo · US$ 0.50 after",
        "the tier that fits, and it is too expensive",
      ],
      [
        "account Hoste already has",
        "the same screens, collected for the panel",
        "no new AirDNA bill",
        "this proposal",
      ],
    ],
    sourceFoot:
      "Prices and quotas come from AirDNA’s written follow-up, not its public website. Photo access was not confirmed. Photos are needed to distinguish similar houses.",
    sourceNotes: [
      "The connector depends on continued access through Hoste’s account. If automated access is blocked, work pauses for review. A paid API would require a separate decision and is not included in this quote.",
    ],
    buildHeaders: ["piece", "amount"],
    buildRows: [
      ["core system: automated matching engine, confidence scoring & threshold checks, skip-trace, spreadsheet export", "US$ 1,120"],
      ["AirDNA automated connector (scraper)", "US$ 580"],
      ["phase 1 total", "US$ 1,700"],
    ],
    buildFoot:
      "US$ 1,700 total for this scope, including initial validation, setup, usage guidance, and team training. About 3 weeks at 20h/week, subject to access and successful tests. Vendor usage fees are separate. Any additional scope requires a separate quote.",
    timeline: [
      { name: "validate first", note: "Phoenix · access, photos & address matching" },
      { name: "build & connect", note: "Automated matching engine, threshold checks & owner lookup" },
      { name: "deliver", note: "Pipeline validation, spreadsheet export & team training" },
    ],
    timelineCaption: "The remaining build is confirmed only after validation. If access is blocked or results are insufficient, I report the findings before any change of approach or cost.",
    buildNotes: [
      "Phase 1 is one market at a time, started by a person, with a cap on how many listings come back. Phoenix is the first test, because that is the market in your video and the county publishes parcel maps.",
      "I have extensive scraping experience, including substantially more challenging sites. The project is technically feasible; the initial tests will validate AirDNA access, photos, and address matching before I confirm the remaining build.",
      "Acceptance is one complete automated Phoenix batch: address matching across confidence thresholds, retrieval of available owner contacts, and structured spreadsheet export. The system does not contact the owner.",
    ],
    costIntro: "For the target of 3,000 leads per month, budget approximately US$ 170–230 in AI and contact lookup fees — around US$ 0.06–0.08 per lead. Hoste pays the providers directly, with no markup.",
    costHeaders: ["item", "monthly estimate"],
    costRows: [
      ["AI processing + photo matching", "US$ 50–110"],
      ["owner contacts · 3,000 successful lookups × US$ 0.04", "US$ 120"],
      ["estimated total", "US$ 170–230"],
    ],
    costFoot:
      "Planning estimate for 3,000 processed properties, not a guarantee of 3,000 reachable owners. Contact lookup is billed only when data is found; coverage varies. Excludes the existing AirDNA subscription and hosting.",
    costNotes: [
      "The strategy combines cost-efficient Chinese LLMs, such as DeepSeek, for text and data processing with a top-tier vision model for photo comparison. We narrow down candidate houses first, then compare selected images to keep usage efficient.",
      "Assumes 1,500–3,000 visual comparisons/month, selected photos, public parcel data, and geocoding within the available free quota, with a retry allowance. Phoenix tests will confirm the models and cost per usable lead.",
    ],
    next: [
      "Approve this scope and provide access to the Hoste AirDNA account. I’ll run several tests in Phoenix, check listing and photo access, and test address matching before confirming the rest of the build.",
      "This page is the formal proposal: US$ 1,120 for the core system + US$ 580 for the AirDNA connector = US$ 1,700 fixed. Initial validation and team training are included.",
    ],
    nextLabel: "next step",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "AirDNA API overview", href: sources[0].href },
      { label: "AirDNA contact", href: sources[1].href },
      { label: "Google Geocoding pricing", href: sources[2].href },
      { label: "Tracerfy skip trace pricing", href: sources[3].href },
      { label: "DeepSeek API pricing", href: sources[4].href },
      { label: "OpenAI API pricing · vision budget reference", href: sources[5].href },
    ],
  },
  "pt-BR": {
    badges: ["proposta", "hoste", "prospecção"],
    title: "hoste · prospecção de donos",
    lede: "Um painel privado para buscar anúncios, identificar endereços de imóveis com validação automatizada e consultar contatos de proprietários para prospecção direta.",
    recommendLabel: "proposta de preço fechado",
    price: "fase 1 · US$ 1.700",
    recommendRest: "cerca de 3 semanas · validação inicial incluída · usa a conta AirDNA da Hoste",
    prepared: "preparado para a Hoste",
    separate: "separado da entrega de onboarding de anúncios",
    facts: [
      { label: "o uso", value: "um painel no navegador" },
      { label: "o preço", value: "US$ 1.700, fechado" },
      { label: "os anúncios", value: "o login da AirDNA que vocês já têm" },
    ],
    sections: {
      what: "1 · o que você recebe",
      path: "2 · o caminho",
      source: "4 · AirDNA: opções e recomendação",
      build: "3 · orçamento e entrega",
      cost: "5 · custo mensal de uso",
      next: "6 · próximo passo",
      sources: "7 · fontes",
    },
    what: [
      "Exemplo: buscar imóveis de temporada em Phoenix com nota de até 4,8 estrelas, identificar a casa e exportar os contatos disponíveis para a equipe de prospecção da Hoste.",
      "O painel integra busca, correspondência de endereços e consulta de contatos em um pipeline automatizado contínuo. Imóveis com alta pontuação de confiança seguem direto para a busca de proprietários, e casos limítrofes abaixo do limiar ficam sinalizados para verificação pontual opcional.",
    ],
    steps: [
      {
        title: "busca",
        detail: "Cidade, teto de 4,8 estrelas e volume desejado. O sistema processa os anúncios e os dados do mercado automaticamente.",
      },
      {
        title: "endereço",
        detail: "O ponto do mapa é aproximado de propósito. O sistema cruza lotes públicos, analisa atributos e calcula uma pontuação de confiança.",
      },
      {
        title: "limiar",
        detail: "Correspondências de alta confiança avançam de forma automática. Casos raros abaixo do limiar apresentam fotos lado a lado para validação rápida.",
      },
      {
        title: "dono",
        detail: "Endereços validados recebem a consulta de proprietário e vão para a planilha; dados ausentes são sinalizados como incompletos sem travar o lote.",
      },
    ],
    pathNotes: [
      "O Airbnb esconde o endereço exato. O ponto pode cair a centenas de metros. O sistema cruza o ponto com o mapa público de lotes primeiro; formato da piscina, telhado e móveis entram só quando restam poucas casas.",
      "Nome, telefone e e-mail vêm de um fornecedor de dados após a confirmação do endereço. A IA não inventa contatos; resultados indisponíveis são marcados como incompletos.",
    ],
    sourceIntro:
      "Após a reunião com a AirDNA, a cotação por escrito confirmou duas opções de API. Nenhuma compensa para este escopo. Recomendo testar a coleta pela conta que a Hoste já tem.",
    sourceHeaders: ["caminho", "o que entrega", "preço que eles passaram", "serve?"],
    sourceRows: [
      [
        "Market Data API",
        "totais da cidade e do submercado: ocupação, diária, receita, oferta, tendência",
        "US$ 7.000/ano · 2.000 chamadas/mês · US$ 0,50 depois",
        "nenhuma casa individual",
      ],
      [
        "Property Valuations & Comps",
        "busca no mercado com filtros e, em cada anúncio: localização, atributos e dados do listing",
        "US$ 12.000/ano · 4.000 chamadas/mês · US$ 0,50 depois",
        "é o pacote certo, e é caro demais",
      ],
      [
        "conta que a Hoste já tem",
        "as mesmas telas, coletadas para o painel",
        "nenhuma conta nova da AirDNA",
        "esta proposta",
      ],
    ],
    sourceFoot:
      "Preços e franquias vêm da cotação escrita da AirDNA, não do site público. O acesso a fotos não foi confirmado. As fotos são necessárias para distinguir casas parecidas.",
    sourceNotes: [
      "O conector depende da continuidade do acesso pela conta da Hoste. Se a coleta automatizada for bloqueada, o trabalho pausa para revisão. Uma API paga exigiria outra decisão e não está incluída neste orçamento.",
    ],
    buildHeaders: ["parte", "valor"],
    buildRows: [
      ["sistema central: motor automatizado de correspondência, pontuação de confiança e limiares, skip-trace, exportação em planilha", "US$ 1.120"],
      ["conector automatizado da AirDNA (scraper)", "US$ 580"],
      ["total da fase 1", "US$ 1.700"],
    ],
    buildFoot:
      "US$ 1.700 no total deste escopo, incluindo validação inicial, configuração, orientação de uso e treinamento da equipe. Cerca de 3 semanas a 20h por semana, condicionado ao acesso e aos testes. O uso dos fornecedores é pago à parte. Escopo adicional exige outro orçamento.",
    timeline: [
      { name: "validar primeiro", note: "Phoenix · acesso, fotos e endereços" },
      { name: "construir e integrar", note: "Motor de correspondência, limiares de validação e busca do dono" },
      { name: "entregar", note: "Validação do pipeline, planilha e treinamento da equipe" },
    ],
    timelineCaption: "O restante da construção só é confirmado após a validação. Se o acesso for bloqueado ou o resultado for insuficiente, apresento os achados antes de qualquer mudança de caminho ou custo.",
    buildNotes: [
      "A fase 1 é um mercado por vez, sob demanda, com teto de anúncios. Phoenix é o primeiro mercado de teste, aproveitando os mapas de lotes públicos do condado.",
      "Tenho ampla experiência com scraping, inclusive em sites muito mais desafiadores. O projeto é tecnicamente viável; os testes iniciais validarão o acesso à AirDNA, as fotos e a correspondência de endereços antes de eu confirmar o restante da construção.",
      "A entrega aceita compreende um lote completo automatizado em Phoenix: correspondência de endereços com pontuação de confiança e validação de limiares, retorno dos contatos disponíveis dos proprietários e exportação em planilha. O sistema não contata o proprietário.",
    ],
    costIntro: "Para a meta de 3.000 leads por mês, preveja cerca de US$ 170–230 em IA e busca de contatos — aproximadamente US$ 0,06–0,08 por lead. A Hoste paga os fornecedores diretamente, sem margem adicional.",
    costHeaders: ["item", "estimativa mensal"],
    costRows: [
      ["processamento com IA + comparação de fotos", "US$ 50–110"],
      ["contatos dos donos · 3.000 consultas com resultado × US$ 0,04", "US$ 120"],
      ["total estimado", "US$ 170–230"],
    ],
    costFoot:
      "Estimativa para 3.000 imóveis processados, sem garantia de 3.000 donos contatáveis. A consulta só cobra quando encontra dados; a cobertura varia. Não inclui a assinatura AirDNA existente nem hospedagem.",
    costNotes: [
      "A estratégia combina LLMs chinesas de bom custo-benefício, como DeepSeek, para processar textos e dados, com um modelo de ponta em visão para comparar fotos. Primeiro reduzimos as casas candidatas; depois comparamos imagens selecionadas para otimizar o consumo.",
      "Premissas: 1.500–3.000 comparações visuais/mês, fotos selecionadas, lotes públicos e geocodificação na franquia gratuita disponível, com margem para novas tentativas. Os testes em Phoenix confirmarão os modelos e o custo por lead aproveitável.",
    ],
    next: [
      "Aprove este escopo e disponibilize o acesso à conta AirDNA da Hoste. Farei algumas tentativas em Phoenix, verificando anúncios, fotos e correspondência de endereços antes de confirmar o restante da construção.",
      "Esta página formaliza a proposta: US$ 1.120 pelo sistema central + US$ 580 pelo conector AirDNA = US$ 1.700 fechado. A validação inicial e o treinamento da equipe estão incluídos.",
    ],
    nextLabel: "próximo passo",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "documentação da API AirDNA", href: sources[0].href },
      { label: "contato AirDNA", href: sources[1].href },
      { label: "preço do Google Geocoding", href: sources[2].href },
      { label: "preço do skip trace Tracerfy", href: sources[3].href },
      { label: "preços da API DeepSeek", href: sources[4].href },
      { label: "preços da API OpenAI · referência para visão", href: sources[5].href },
    ],
  },
};
