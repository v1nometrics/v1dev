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
    upkeep: string;
    scope: string;
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
  scaleHeaders: string[];
  scaleRows: string[][];
  scaleFoot: string;
  costNotes: string[];
  upkeep: { title: string; detail: string }[];
  inLabel: string;
  inItems: string[];
  outLabel: string;
  outItems: string[];
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
      cost: "5 · cost per lead",
      upkeep: "6 · upkeep",
      scope: "7 · in / out",
      next: "8 · next step",
      sources: "9 · sources",
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
        detail: "High-confidence matches proceed automatically. Rare borderline edge cases below threshold flag side-by-side photos for quick spot-checking.",
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
      "US$ 1,700 total for this scope, including initial validation. About 3 weeks at 20h/week, subject to access and successful tests. Vendor fees and optional maintenance are separate. Any additional scope requires a separate quote.",
    timeline: [
      { name: "validate first", note: "Phoenix · access, photos & address matching" },
      { name: "build & connect", note: "Automated matching engine, threshold checks & owner lookup" },
      { name: "deliver", note: "End-to-end pipeline validation & spreadsheet export" },
    ],
    timelineCaption: "The remaining build is confirmed only after validation. If access is blocked or results are insufficient, I report the findings before any change of approach or cost.",
    buildNotes: [
      "Phase 1 is one market at a time, started by a person, with a cap on how many listings come back. Phoenix is the first test, because that is the market in your video and the county publishes parcel maps.",
      "I have extensive scraping experience, including substantially more challenging sites. The project is technically feasible; the initial tests will validate AirDNA access, photos, and address matching before I confirm the remaining build.",
      "Acceptance is one complete automated Phoenix batch: address matching across confidence thresholds, verified owner contact retrieval, and structured spreadsheet export. The system does not contact the owner.",
    ],
    costIntro: "The bill follows the lead, not the radius. Hoste pays the vendors directly. There is no markup.",
    costHeaders: ["step", "when", "unit estimate"],
    costRows: [
      ["parcel map", "every candidate house", "US$ 0 · county open data"],
      ["map lookup", "pin to street", "US$ 0.005 after 10,000 free/month"],
      ["photo check", "only if a few houses remain", "about US$ 0.02"],
      ["owner, from address only", "after a person confirms", "US$ 0.04 per hit · misses free"],
    ],
    costFoot:
      "Reference rates: Google Geocoding and Tracerfy Advanced. Photo checks are a planning estimate. Provider coverage, minimum purchase, and final rates will be confirmed during validation.",
    scaleHeaders: ["confirmed leads / mo", "owner lookups if every one hits", "maps + photos", "vendor total"],
    scaleRows: [
      ["50", "US$ 2", "about US$ 0.34", "about US$ 3"],
      ["200", "US$ 8", "about US$ 1.34", "about US$ 10"],
      ["1,000", "US$ 40", "about US$ 6.68", "about US$ 50"],
    ],
    scaleFoot:
      "Illustration. Assumes one owner lookup per lead, one photo check per three leads, and geocoding within the free tier. Totals are rounded estimates, not measured operating costs. The AirDNA login Hoste already pays is not in this table. Filtering borderline cases by confidence threshold avoids wasting vendor fees on uncertain properties.",
    costNotes: [
      "The property-level API starts at US$ 1,000/month before a single extra call. The account Hoste already has, plus a few dollars of lookups, is the lean path.",
      "Calls and texts stay with Hoste. When the vendor returns a Do Not Call flag, the row shows it. The system does not dial.",
    ],
    upkeep: [
      {
        title: "when AirDNA changes the site",
        detail: "US$ 30/h for maintenance as needed. Changes or access restrictions can interrupt collection; repairs are quoted before work.",
      },
      {
        title: "optional reserve",
        detail: "4h/month, US$ 120, if you want the fix time already set aside.",
      },
      {
        title: "hosting",
        detail: "Budget a few dollars per month at initial volume, separate from lookup fees. The hosting service and actual cost will be confirmed during validation.",
      },
    ],
    inLabel: "in this build",
    inItems: [
      "market, rating cap, and lead cap",
      "listings from the AirDNA account, with pin and photos",
      "proposed address and a confidence score",
      "confidence threshold validation with side-by-side inspection for borderline edge cases",
      "owner lookup on confirmed addresses, then a spreadsheet",
    ],
    outLabel: "not in this build",
    outItems: [
      "messages, calls, or emails to owners",
      "a crawl that runs a whole market with nobody starting it",
      "a replacement for AirDNA across Airbnb, Vrbo, and the other sites",
      "the AirDNA subscription itself",
    ],
    next: [
      "Approve this scope and provide access to the Hoste AirDNA account. I’ll run several tests in Phoenix, check listing and photo access, and test address matching before confirming the rest of the build.",
      "This page is the formal proposal: US$ 1,120 for the core system + US$ 580 for the AirDNA connector = US$ 1,700 fixed. The validation round is included.",
    ],
    nextLabel: "next step",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "AirDNA API overview", href: sources[0].href },
      { label: "AirDNA contact", href: sources[1].href },
      { label: "Google Geocoding pricing", href: sources[2].href },
      { label: "Tracerfy skip trace pricing", href: sources[3].href },
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
      cost: "5 · custo por lead",
      upkeep: "6 · manutenção",
      scope: "7 · entra / não entra",
      next: "8 · próximo passo",
      sources: "9 · fontes",
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
      "US$ 1.700 no total deste escopo, incluindo a validação inicial. Cerca de 3 semanas a 20h por semana, condicionado ao acesso e aos testes. Fornecedores e manutenção opcional são cobrados à parte. Escopo adicional exige outro orçamento.",
    timeline: [
      { name: "validar primeiro", note: "Phoenix · acesso, fotos e endereços" },
      { name: "construir e integrar", note: "Motor de correspondência, limiares de validação e busca do dono" },
      { name: "entregar", note: "Validação do pipeline completo e planilha" },
    ],
    timelineCaption: "O restante da construção só é confirmado após a validação. Se o acesso for bloqueado ou o resultado for insuficiente, apresento os achados antes de qualquer mudança de caminho ou custo.",
    buildNotes: [
      "A fase 1 é um mercado por vez, sob demanda, com teto de anúncios. Phoenix é o primeiro mercado de teste, aproveitando os mapas de lotes públicos do condado.",
      "Tenho ampla experiência com scraping, inclusive em sites muito mais desafiadores. O projeto é tecnicamente viável; os testes iniciais validarão o acesso à AirDNA, as fotos e a correspondência de endereços antes de eu confirmar o restante da construção.",
      "A entrega aceita compreende um lote completo automatizado em Phoenix: correspondência de endereços com pontuação de confiança e validação de limiares, retorno de proprietários validados e exportação em planilha. O sistema não contata o proprietário.",
    ],
    costIntro: "A conta acompanha o lead, não o raio da busca. A Hoste paga os fornecedores direto. Não há margem em cima.",
    costHeaders: ["etapa", "quando", "estimativa unitária"],
    costRows: [
      ["mapa de lotes", "cada casa candidata", "US$ 0 · dado público do condado"],
      ["consulta de mapa", "ponto para a rua", "US$ 0,005 depois de 10.000 grátis/mês"],
      ["checagem de foto", "só se restarem poucas casas", "cerca de US$ 0,02"],
      ["dono, só com o endereço", "depois que alguém confirma", "US$ 0,04 por acerto · erro não cobra"],
    ],
    costFoot:
      "Referências: Google Geocoding e Tracerfy Advanced. A checagem de fotos é uma estimativa de planejamento. Cobertura, compra mínima e tarifas finais serão confirmadas na validação.",
    scaleHeaders: ["leads confirmados / mês", "consultas do dono se todas acharem", "mapas + fotos", "total dos fornecedores"],
    scaleRows: [
      ["50", "US$ 2", "cerca de US$ 0,34", "cerca de US$ 3"],
      ["200", "US$ 8", "cerca de US$ 1,34", "cerca de US$ 10"],
      ["1.000", "US$ 40", "cerca de US$ 6,68", "cerca de US$ 50"],
    ],
    scaleFoot:
      "Ilustração. Premissas: uma consulta de proprietário por lead, uma checagem de foto a cada três leads e geocodificação na franquia gratuita. Totais arredondados, não custos operacionais medidos. O login da AirDNA que a Hoste já paga não entra nesta tabela. Isolar casos limítrofes por limiar de confiança evita desperdiçar taxas de fornecedor em imóveis incertos.",
    costNotes: [
      "A API no nível do imóvel começa em US$ 1.000/mês antes de qualquer chamada extra. A conta que a Hoste já tem, mais alguns dólares de consulta, é o caminho enxuto.",
      "Ligação e mensagem ficam com a Hoste. Quando o fornecedor devolve um aviso de não perturbe, a linha mostra. O sistema não disca.",
    ],
    upkeep: [
      {
        title: "quando a AirDNA muda o site",
        detail: "US$ 30/h para manutenção quando necessária. Mudanças ou restrições de acesso podem interromper a coleta; os ajustes são orçados antes do trabalho.",
      },
      {
        title: "reserva opcional",
        detail: "4h por mês, US$ 120, se quiser o tempo de conserto já separado.",
      },
      {
        title: "hospedagem",
        detail: "Previsão de alguns dólares por mês no volume inicial, além das consultas. O serviço de hospedagem e o custo real serão confirmados na validação.",
      },
    ],
    inLabel: "entra nesta entrega",
    inItems: [
      "mercado, teto de nota e teto de leads",
      "anúncios da conta AirDNA, com ponto no mapa e fotos",
      "correspondência automatizada de endereço com pontuação de confiança",
      "validação por limiar de confiança com inspeção lado a lado para casos limítrofes",
      "busca do dono nos endereços validados e exportação em planilha",
    ],
    outLabel: "não entra nesta entrega",
    outItems: [
      "mensagem, ligação ou e-mail para os donos",
      "uma varredura do mercado inteiro sem alguém iniciar",
      "um substituto da AirDNA no Airbnb, na Vrbo e nos outros sites",
      "a assinatura da AirDNA em si",
    ],
    next: [
      "Aprove este escopo e disponibilize o acesso à conta AirDNA da Hoste. Farei algumas tentativas em Phoenix, verificando anúncios, fotos e correspondência de endereços antes de confirmar o restante da construção.",
      "Esta página formaliza a proposta: US$ 1.120 pelo sistema central + US$ 580 pelo conector AirDNA = US$ 1.700 fechado. A rodada de validação está incluída.",
    ],
    nextLabel: "próximo passo",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "documentação da API AirDNA", href: sources[0].href },
      { label: "contato AirDNA", href: sources[1].href },
      { label: "preço do Google Geocoding", href: sources[2].href },
      { label: "preço do skip trace Tracerfy", href: sources[3].href },
    ],
  },
};
