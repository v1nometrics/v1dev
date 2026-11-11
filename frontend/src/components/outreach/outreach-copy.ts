export type OutreachCopy = {
  badges: string[];
  title: string;
  lede: string;
  recommendLabel: string;
  price: string;
  recommendRest: string;
  priceAnchor: string;
  prepared: string;
  separate: string;
  facts: { label: string; value: string }[];
  sections: {
    what: string;
    path: string;
    source: string;
    build: string;
    timeline: string;
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
  timelineIntro: string;
  timeline: { period: string; name: string; note: string; gate?: string }[];
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
  { label: "DeepSeek V4.1 Flash on OpenRouter", href: "https://openrouter.ai/deepseek/deepseek-v4.1-flash-1017" },
];

export const outreachCopy: Record<"en" | "pt-BR", OutreachCopy> = {
  en: {
    badges: ["proposal", "hoste", "owner outreach"],
    title: "hoste · owner outreach",
    lede: "A private panel to find rental listings, match property addresses with automated confidence scoring, and look up owner contacts for direct outreach.",
    recommendLabel: "fixed-price proposal",
    price: "phase 1 · US$ 1,700 one-time",
    recommendRest: "2–3 weeks · initial validation included · uses Hoste’s existing AirDNA account",
    priceAnchor: "AirDNA quoted US$ 12,000/year for the property-level API alone, before building the panel. Using Hoste’s existing account avoids that additional subscription.",
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
      source: "5 · AirDNA: options & recommendation",
      build: "3 · fixed quote & delivery",
      timeline: "4 · delivery timeline · 2–3 weeks",
      cost: "6 · monthly running cost",
      next: "7 · next step",
      sources: "8 · sources",
    },
    what: [
      "Example: find Phoenix rentals rated 4.8 stars or below, identify the property, and export available owner contacts for Hoste’s outreach team.",
      "The panel connects search, address matching, and contact lookup in one workflow. Only matches that meet the validated confidence threshold proceed to owner lookup; uncertain cases remain flagged for review and are not exported as confirmed addresses.",
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
        detail: "Matches above the validated confidence threshold proceed automatically. Uncertain cases are held for review, with side-by-side photos where available.",
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
      "US$ 1,700 total for this scope, including initial validation, setup, usage guidance, and team training. Estimated delivery in 2–3 weeks, subject to access, validation approval, and successful tests. Vendor usage fees are separate. Any additional scope requires a separate quote.",
    timelineIntro: "Scraping comes first. We present a Phoenix sample for Hoste’s approval before building the rest of the pipeline. The target is 2–3 weeks, with the following planned checkpoints.",
    timeline: [
      { period: "week 1 · first days", name: "test scraping", note: "Use Hoste’s existing AirDNA account to test listing extraction and photo availability on a small Phoenix sample." },
      { period: "week 1 · approval gate", name: "review & approve the sample", note: "Share the extraction results and limitations with Hoste before committing to the remaining build.", gate: "The pipeline build starts only after scraping validation is approved." },
      { period: "weeks 1–2", name: "build the pipeline", note: "Connect the private panel, parcel-data matching, confidence thresholds, owner-contact lookup, and spreadsheet export." },
      { period: "week 2", name: "test end to end", note: "Run a complete Phoenix batch. Check address matches, available contacts, incomplete records, exports, and actual provider costs." },
      { period: "weeks 2–3", name: "refine & hand over", note: "Resolve issues found during testing, validate the final batch with Hoste, and deliver setup guidance and team training. Week 3 allows for adjustments and retesting." },
    ],
    timelineCaption: "Target: 2–3 weeks from the green light and receipt of the required access. Timing is indicative and depends on validation and feedback. If scraping is blocked or results are insufficient, we pause and review the findings together before changing the approach, timeline, or cost.",
    buildNotes: [
      "Phase 1 is one market at a time, started by a person, with a cap on how many listings come back. Phoenix is the first test, because that is the market in your video and the county publishes parcel maps.",
      "Initial validation checks listing extraction, photo availability, and a sample of address matches. We proceed with the remaining build only after reviewing those results with Hoste; access and matching performance are not guaranteed before testing.",
      "Acceptance is one complete automated Phoenix batch: address matching across confidence thresholds, retrieval of available owner contacts, and structured spreadsheet export. The system does not contact the owner.",
    ],
    costIntro: "For planning, allow US$ 170–230/month in AI and owner-contact fees for 3,000 properties processed, assuming 3,000 successful address-only contact lookups. This is a provisional usage budget, not a fixed monthly fee or a guarantee of 3,000 usable leads. Hoste pays providers directly, with no markup.",
    costHeaders: ["item", "monthly estimate"],
    costRows: [
      ["AI allowance · DeepSeek V4.1 Flash via OpenRouter + vision checks", "US$ 50–110"],
      ["owner contacts · Tracerfy Advanced · 3,000 successful results × US$ 0.04", "US$ 120"],
      ["estimated vendor usage total", "US$ 170–230"],
    ],
    costFoot:
      "Initial estimate to be recalibrated using the Phoenix pilot. The AI allowance assumes 1,500–3,000 visual checks/month after parcel filtering; this workload has not been measured. More candidates, retries, or properties processed can increase costs. Contact-lookup misses are free; successful results do not guarantee usable contacts for every property.",
    costNotes: [
      "DeepSeek V4.1 Flash is the proposed cost-efficient model for data extraction and normalization via OpenRouter. Its image capabilities will also be tested on the Phoenix sample; a stronger vision model is used only if matching quality requires it. The final model mix and cost are confirmed through testing, not assumed in advance.",
      "This estimate excludes the existing AirDNA subscription, hosting, taxes, currency conversion, and any additional OpenRouter credit-purchase fees. It assumes public parcel data and geocoding within the available free allowance. Paid imagery, proxies, or other data sources require a separate review before use; provider credit minimums can affect the initial cash outlay.",
    ],
    next: [
      "Give the green light and share access to Hoste’s existing AirDNA account through a secure channel. That is the account required for the proposed connector; Airbnb credentials alone do not replace it. We can then begin the Phoenix validation and present the scraping sample for your approval before proceeding.",
      "This page is the formal proposal: US$ 1,120 for the core system + US$ 580 for the AirDNA connector = US$ 1,700 fixed. Initial validation and team training are included.",
    ],
    nextLabel: "next step",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "AirDNA API overview", href: sources[0].href },
      { label: "AirDNA contact", href: sources[1].href },
      { label: "Google Geocoding pricing", href: sources[2].href },
      { label: "Tracerfy skip trace pricing", href: sources[3].href },
      { label: "OpenRouter model rates & routing", href: sources[4].href },
    ],
  },
  "pt-BR": {
    badges: ["proposta", "hoste", "prospecção"],
    title: "hoste · prospecção de donos",
    lede: "Um painel privado para buscar anúncios, identificar endereços de imóveis com validação automatizada e consultar contatos de proprietários para prospecção direta.",
    recommendLabel: "proposta de preço fechado",
    price: "fase 1 · US$ 1.700, uma única vez",
    recommendRest: "2–3 semanas · validação inicial incluída · usa a conta AirDNA da Hoste",
    priceAnchor: "A AirDNA cotou US$ 12.000/ano só pela API de imóveis, além da construção do painel. Usar a conta que a Hoste já tem evita essa assinatura adicional.",
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
      source: "5 · AirDNA: opções e recomendação",
      build: "3 · orçamento e entrega",
      timeline: "4 · cronograma de entrega · 2–3 semanas",
      cost: "6 · custo mensal de uso",
      next: "7 · próximo passo",
      sources: "8 · fontes",
    },
    what: [
      "Exemplo: buscar imóveis de temporada em Phoenix com nota de até 4,8 estrelas, identificar a casa e exportar os contatos disponíveis para a equipe de prospecção da Hoste.",
      "O painel integra busca, correspondência de endereços e consulta de contatos em um único fluxo. Só correspondências que atendam ao limiar de confiança validado seguem para a busca de proprietários; casos incertos ficam sinalizados para revisão e não são exportados como endereços confirmados.",
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
        detail: "Correspondências acima do limiar de confiança validado avançam automaticamente. Casos incertos ficam retidos para revisão, com fotos lado a lado quando disponíveis.",
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
      "US$ 1.700 no total deste escopo, incluindo validação inicial, configuração, orientação de uso e treinamento da equipe. Entrega estimada em 2–3 semanas, condicionada ao acesso, à aprovação da validação e aos testes. O uso dos fornecedores é pago à parte. Escopo adicional exige outro orçamento.",
    timelineIntro: "Primeiro, o scraping. Apresentamos uma amostra de Phoenix para aprovação da Hoste antes de construir o restante do pipeline. A previsão é de 2–3 semanas, com os seguintes marcos planejados.",
    timeline: [
      { period: "semana 1 · primeiros dias", name: "testar o scraping", note: "Usar a conta AirDNA que a Hoste já tem para testar a extração de anúncios e a disponibilidade de fotos em uma pequena amostra de Phoenix." },
      { period: "semana 1 · marco de aprovação", name: "apresentar e aprovar a amostra", note: "Compartilhar com a Hoste os resultados e as limitações da coleta antes de confirmar o restante da construção.", gate: "A construção do pipeline só começa após a aprovação da validação do scraping." },
      { period: "semanas 1–2", name: "construir o pipeline", note: "Integrar painel privado, cruzamento com lotes públicos, limiares de confiança, busca de contatos dos proprietários e exportação em planilha." },
      { period: "semana 2", name: "testar de ponta a ponta", note: "Processar um lote completo em Phoenix. Conferir endereços, contatos disponíveis, registros incompletos, exportação e custos reais dos fornecedores." },
      { period: "semanas 2–3", name: "ajustar e entregar", note: "Corrigir os pontos identificados nos testes, validar o lote final com a Hoste e entregar orientação de configuração e treinamento. A terceira semana acomoda ajustes e novos testes." },
    ],
    timelineCaption: "Previsão: 2–3 semanas a partir do sinal verde e do recebimento dos acessos necessários. As janelas são indicativas e dependem da validação e dos retornos da equipe. Se a coleta for bloqueada ou o resultado for insuficiente, pausamos para avaliar os achados juntos antes de mudar o caminho, o prazo ou o custo.",
    buildNotes: [
      "A fase 1 é um mercado por vez, sob demanda, com teto de anúncios. Phoenix é o primeiro mercado de teste, aproveitando os mapas de lotes públicos do condado.",
      "A validação inicial verifica a extração de anúncios, a disponibilidade de fotos e uma amostra de correspondências de endereços. O restante da construção só avança após a análise desses resultados com a Hoste; acesso e desempenho da identificação não são garantidos antes dos testes.",
      "A entrega aceita compreende um lote completo automatizado em Phoenix: correspondência de endereços com pontuação de confiança e validação de limiares, retorno dos contatos disponíveis dos proprietários e exportação em planilha. O sistema não contata o proprietário.",
    ],
    costIntro: "Para planejamento, reserve US$ 170–230/mês em IA e consulta de contatos para 3.000 imóveis processados, considerando 3.000 consultas por endereço com retorno. É uma previsão provisória de consumo, não uma mensalidade fixa nem garantia de 3.000 leads utilizáveis. A Hoste paga os fornecedores diretamente, sem margem adicional.",
    costHeaders: ["item", "estimativa mensal"],
    costRows: [
      ["reserva para IA · DeepSeek V4.1 Flash via OpenRouter + verificações visuais", "US$ 50–110"],
      ["contatos dos donos · Tracerfy Advanced · 3.000 retornos × US$ 0,04", "US$ 120"],
      ["total estimado de consumo dos fornecedores", "US$ 170–230"],
    ],
    costFoot:
      "Estimativa inicial a recalibrar no piloto de Phoenix. A reserva de IA considera 1.500–3.000 verificações visuais/mês após a filtragem de lotes; essa carga ainda não foi medida. Mais candidatos, tentativas ou imóveis processados podem elevar o custo. Consultas de contatos sem retorno não são cobradas; retornos não garantem contatos utilizáveis para todos os imóveis.",
    costNotes: [
      "O DeepSeek V4.1 Flash é o modelo de custo-benefício proposto para extração e normalização de dados via OpenRouter. Sua capacidade de interpretar imagens também será testada na amostra de Phoenix; um modelo de visão mais forte só entra se a qualidade das correspondências exigir. A combinação final de modelos e o custo serão confirmados nos testes, não presumidos de antemão.",
      "A estimativa não inclui a assinatura AirDNA já existente, hospedagem, impostos, câmbio e eventuais taxas de compra de créditos do OpenRouter. Pressupõe lotes públicos e geocodificação dentro da franquia gratuita disponível. Imagens pagas, proxies ou outras fontes de dados exigem avaliação separada antes do uso; compras mínimas de créditos podem afetar o desembolso inicial.",
    ],
    next: [
      "Dê o sinal verde e compartilhe o acesso à conta AirDNA que a Hoste já tem por um canal seguro. Essa é a conta necessária para o conector proposto; o acesso ao Airbnb sozinho não a substitui. Com isso, iniciamos a validação em Phoenix e apresentamos a amostra do scraping para aprovação antes de avançar.",
      "Esta página formaliza a proposta: US$ 1.120 pelo sistema central + US$ 580 pelo conector AirDNA = US$ 1.700 fechado. A validação inicial e o treinamento da equipe estão incluídos.",
    ],
    nextLabel: "próximo passo",
    email: "email · contato@v1torres.dev",
    sources: [
      { label: "documentação da API AirDNA", href: sources[0].href },
      { label: "contato AirDNA", href: sources[1].href },
      { label: "preço do Google Geocoding", href: sources[2].href },
      { label: "preço do skip trace Tracerfy", href: sources[3].href },
      { label: "tarifas de modelos e roteamento OpenRouter", href: sources[4].href },
    ],
  },
};
