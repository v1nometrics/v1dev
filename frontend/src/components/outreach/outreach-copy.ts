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
    lede: "A panel for the outreach Hoste already does by hand. You choose a city and how many leads. The system proposes the house. Someone confirms it when two or three are still possible. Only a confirmed address becomes a spreadsheet row, with the owner's phone and email.",
    recommendLabel: "recommendation",
    price: "phase 1 · US$ 1,700",
    recommendRest: "fixed · about 3 weeks · the AirDNA account Hoste already pays",
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
      source: "3 · where the listings come from",
      build: "4 · the build",
      cost: "5 · cost per lead",
      upkeep: "6 · upkeep",
      scope: "7 · in / out",
      next: "8 · next step",
      sources: "9 · sources",
    },
    what: [
      "Someone on the team opens a market, keeps listings at 4.8 stars and below, and matches the approximate map pin to a real house by the pool, the roof, and the chairs. The address then goes to a spreadsheet so the owner can be looked up.",
      "The panel is that path. You set the city and the cap. The system returns a queue. A person confirms the house when two or three candidates remain. Phone and email are looked up only after that yes.",
      "The team keeps sending the outreach. A wrong house is the expensive mistake, so nothing goes out from a guess.",
    ],
    steps: [
      {
        title: "search",
        detail: "City, a ceiling of 4.8 stars, and how many leads. The result is a queue of listings, not a call list.",
      },
      {
        title: "address",
        detail: "The pin is approximate on purpose. The system proposes the house and a confidence score.",
      },
      {
        title: "confirm",
        detail: "A clear match continues. A doubtful one stops, photos side by side, until a person says yes or no.",
      },
      {
        title: "owner",
        detail: "Only a confirmed address is looked up. The row becomes a spreadsheet line, or an explicit incomplete.",
      },
    ],
    pathNotes: [
      "Airbnb hides the exact address. The pin can sit hundreds of meters off, which is why the house in your video almost became the neighbor. In Phoenix many houses look alike, and Street View does not show the backyard pool. The system crosses the pin with public parcel maps first. Pool shape, roof, and furniture are checked only when a few houses are still possible.",
      "A language model does not research the owner. Asked to find the phone, it will invent one. Name, phone, and email come from a property-data vendor, and only after the address is confirmed. A company or a trust often comes back incomplete, and the row says so.",
    ],
    sourceIntro:
      "AirDNA stays the source. Hoste already pays for the account in the video. Their written follow-up names the API that would do this job, and the price does not fit.",
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
      "Written follow-up from AirDNA. Prices are not on their site. They did not name photos in the US$ 12,000 tier. Telling two similar houses apart still needs those photos. The price rules the tier out either way.",
    sourceNotes: [
      "The licence would be Hoste's, with me named as the contractor, and it would cover Hoste only. AirDNA wrote the customer name as Hosty. That has to be corrected before any contract.",
      "I maintain the connection when AirDNA changes the site. That upkeep is billed at US$ 30/h when it happens. If they block automated use of the login, this route stops and the API is the fallback, at their price.",
      "A system that collects listings itself from Airbnb, Vrbo, and the other sites is a different project. AirDNA already does that collection. This proposal does not replace them.",
    ],
    buildHeaders: ["piece", "amount"],
    buildRows: [
      ["connection to the AirDNA account Hoste already pays", "US$ 600"],
      ["address proposal, parcel match, confidence", "US$ 550"],
      ["confirmation queue, owner lookup, spreadsheet, Phoenix test", "US$ 550"],
      ["phase 1 total", "US$ 1,700"],
    ],
    buildFoot:
      "Fixed price. It does not go above US$ 1,700. About 3 weeks at 20h/week. The first hours confirm the screens still match your video. A crawl that runs a whole market with nobody starting it is a later phase, quoted after this panel is in use.",
    timeline: [
      { name: "airdna connection", note: "US$ 600" },
      { name: "address + confidence", note: "US$ 550" },
      { name: "queue, owner, sheet, test", note: "US$ 550" },
    ],
    timelineCaption: "phase 1 in order, at 20h/week. the fixed price lands near the end of week 3.",
    buildNotes: [
      "Phase 1 is one market at a time, started by a person, with a cap on how many listings come back. Phoenix is the first test, because that is the market in your video and the county publishes parcel maps.",
      "Acceptance is one Phoenix search in the queue, one doubtful house confirmed by a person, one confirmed address that returns an owner or an explicit incomplete, and a spreadsheet. The system does not contact the owner.",
    ],
    costIntro: "The bill follows the lead, not the radius. Hoste pays the vendors directly. There is no markup.",
    costHeaders: ["step", "when", "published example"],
    costRows: [
      ["parcel map", "every candidate house", "US$ 0 · county open data"],
      ["map lookup", "pin to street", "US$ 0.005 after 10,000 free/month"],
      ["photo check", "only if a few houses remain", "about US$ 0.02"],
      ["owner, from address only", "after a person confirms", "US$ 0.04 per hit · misses free"],
    ],
    costFoot:
      "Map price is Google Geocoding. Owner price is Tracerfy Advanced: address in, contact out, as published. The vendor can change at build time. A monthly skip-trace plan is the wrong shape here. Hoste pays per hit, not a US$ 2,000 block.",
    scaleHeaders: ["confirmed leads / mo", "owner lookups if every one hits", "maps + photos", "vendor total"],
    scaleRows: [
      ["50", "US$ 2", "inside the free map tier", "about US$ 3"],
      ["200", "US$ 8", "about US$ 2", "about US$ 10"],
      ["1,000", "US$ 40", "about US$ 8", "about US$ 50"],
    ],
    scaleFoot:
      "Illustration. One in three leads is assumed to need a photo check. The AirDNA login Hoste already pays is not in this table. A person's time confirming doubtful houses costs more than these vendor fees once volume grows.",
    costNotes: [
      "The property-level API starts at US$ 1,000 a month before a single extra call. The account Hoste already has, plus a few dollars of lookups, is the lean path.",
      "Calls and texts stay with Hoste. When the vendor returns a Do Not Call flag, the row shows it. The system does not dial.",
    ],
    upkeep: [
      {
        title: "when AirDNA changes the site",
        detail: "US$ 30/h. This connection will break. The listing pipeline does not have this problem.",
      },
      {
        title: "optional reserve",
        detail: "4h/month, US$ 120, if you want the fix time already set aside.",
      },
      {
        title: "hosting",
        detail: "The same private panel pattern as the listing system. A few dollars a month at this volume, on Hoste's Google once that move is done.",
      },
    ],
    inLabel: "in this build",
    inItems: [
      "market, rating cap, and lead cap",
      "listings from the AirDNA account, with pin and photos",
      "proposed address and a confidence score",
      "a queue where a person confirms the doubtful houses",
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
      "Phase 1 is the product: US$ 1,700, and it does not go above that. About 3 weeks, on the AirDNA account Hoste already pays. I start with Phoenix and the 4.8 filter from your video.",
      "The person who matches houses today stays on the doubtful ones. Everyone else stops scrolling the map.",
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
    lede: "Um painel para a prospecção que a equipe já faz na mão. Você escolhe a cidade e quantos leads quer. O sistema propõe a casa. Alguém confirma quando ainda restam duas ou três. Só o endereço confirmado vira linha de planilha, com telefone e e-mail do dono.",
    recommendLabel: "recomendação",
    price: "fase 1 · US$ 1.700",
    recommendRest: "preço fechado · cerca de 3 semanas · a conta AirDNA que a Hoste já paga",
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
      source: "3 · de onde vêm os anúncios",
      build: "4 · a construção",
      cost: "5 · custo por lead",
      upkeep: "6 · manutenção",
      scope: "7 · entra / não entra",
      next: "8 · próximo passo",
      sources: "9 · fontes",
    },
    what: [
      "Alguém da equipe abre um mercado, fica com anúncios de 4,8 estrelas ou menos, e compara o ponto aproximado do mapa com a casa real: piscina, telhado e cadeiras. O endereço vai para uma planilha para buscar o contato do dono.",
      "O painel é esse caminho. Você define a cidade e o teto. O sistema devolve uma fila. Uma pessoa confirma a casa quando sobram duas ou três candidatas. Telefone e e-mail só são buscados depois desse sim.",
      "Quem fala com o dono continua sendo a equipe. Casa errada é o erro caro, então a prospecção não começa num palpite.",
    ],
    steps: [
      {
        title: "busca",
        detail: "Cidade, teto de 4,8 estrelas e quantidade. O resultado é uma fila de anúncios, não uma lista para ligar.",
      },
      {
        title: "endereço",
        detail: "O ponto do mapa é impreciso de propósito. O sistema propõe a casa e uma nota de confiança.",
      },
      {
        title: "confirmação",
        detail: "Um acerto claro segue. Uma dúvida para, com as fotos lado a lado, até alguém dizer sim ou não.",
      },
      {
        title: "dono",
        detail: "Só o endereço confirmado é consultado. A linha vira planilha, ou um incompleto explícito.",
      },
    ],
    pathNotes: [
      "O Airbnb esconde o endereço exato. O ponto pode cair a centenas de metros, e foi por isso que, no vídeo, a casa quase virou a vizinha. Em Phoenix muitas casas se parecem, e o Street View não mostra a piscina do quintal. O sistema cruza o ponto com o mapa público de lotes primeiro. Formato da piscina, telhado e móveis entram só quando ainda restam poucas casas.",
      "Um modelo de linguagem não pesquisa o dono. Se a tarefa for achar o telefone, ele inventa um. Nome, telefone e e-mail vêm de um fornecedor de dados de imóvel, e só depois do endereço confirmado. Empresa ou trust volta incompleto com frequência, e a linha mostra isso.",
    ],
    sourceIntro:
      "A fonte continua sendo a AirDNA. A Hoste já paga a conta usada no vídeo. A resposta escrita deles diz qual API faria este trabalho, e o preço não cabe.",
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
      "Resposta escrita da AirDNA. Os preços não estão no site. Eles não citaram fotos no pacote de US$ 12.000. Separar duas casas parecidas ainda precisa dessas fotos. O preço já elimina o pacote.",
    sourceNotes: [
      "A licença ficaria no nome da Hoste, comigo como contratado da implementação, e só para a Hoste. No e-mail eles escreveram Hosty. Isso precisa ser corrigido antes de qualquer contrato.",
      "Eu mantenho a conexão quando a AirDNA muda o site. Esse conserto é cobrado a US$ 30/h quando acontece. Se eles bloquearem o uso automático do login, este caminho para e a API volta a ser a alternativa, no preço deles.",
      "Um sistema nosso que coletasse anúncios direto do Airbnb, da Vrbo e dos outros sites é outro projeto. A AirDNA já faz essa coleta. Esta proposta não a substitui.",
    ],
    buildHeaders: ["parte", "valor"],
    buildRows: [
      ["conexão com a conta AirDNA que a Hoste já paga", "US$ 600"],
      ["proposta de endereço, lote e confiança", "US$ 550"],
      ["fila de confirmação, busca do dono, planilha e teste em Phoenix", "US$ 550"],
      ["total da fase 1", "US$ 1.700"],
    ],
    buildFoot:
      "Preço fechado. Não passa de US$ 1.700. Cerca de 3 semanas a 20h por semana. As primeiras horas confirmam se as telas ainda batem com o vídeo. Uma varredura que rode o mercado inteiro sem alguém iniciar fica para uma fase seguinte, orçada depois que este painel estiver em uso.",
    timeline: [
      { name: "conexão airdna", note: "US$ 600" },
      { name: "endereço + confiança", note: "US$ 550" },
      { name: "fila, dono, planilha, teste", note: "US$ 550" },
    ],
    timelineCaption: "fase 1 em ordem, a 20h por semana. o preço fechado termina perto do fim da semana 3.",
    buildNotes: [
      "A fase 1 é um mercado por vez, iniciado por uma pessoa, com teto de anúncios. Phoenix é o primeiro teste, porque é o mercado do vídeo e o condado publica o mapa de lotes.",
      "A entrega aceita é uma busca de Phoenix na fila, uma casa duvidosa confirmada por uma pessoa, um endereço confirmado que volta com o dono ou com um incompleto explícito, e uma planilha. O sistema não fala com o dono.",
    ],
    costIntro: "A conta acompanha o lead, não o raio da busca. A Hoste paga os fornecedores direto. Não há margem em cima.",
    costHeaders: ["etapa", "quando", "exemplo publicado"],
    costRows: [
      ["mapa de lotes", "cada casa candidata", "US$ 0 · dado público do condado"],
      ["consulta de mapa", "ponto para a rua", "US$ 0,005 depois de 10.000 grátis/mês"],
      ["checagem de foto", "só se restarem poucas casas", "cerca de US$ 0,02"],
      ["dono, só com o endereço", "depois que alguém confirma", "US$ 0,04 por acerto · erro não cobra"],
    ],
    costFoot:
      "O mapa é o Google Geocoding. O dono é o Tracerfy Advanced: entra o endereço, sai o contato, como publicado. O fornecedor pode mudar na construção. Um plano mensal de skip trace não cabe aqui. A Hoste paga por acerto, não um bloco de US$ 2.000.",
    scaleHeaders: ["leads confirmados / mês", "consultas do dono se todas acharem", "mapas + fotos", "total dos fornecedores"],
    scaleRows: [
      ["50", "US$ 2", "dentro da franquia grátis do mapa", "cerca de US$ 3"],
      ["200", "US$ 8", "cerca de US$ 2", "cerca de US$ 10"],
      ["1.000", "US$ 40", "cerca de US$ 8", "cerca de US$ 50"],
    ],
    scaleFoot:
      "Ilustração. Um em cada três leads precisa de checagem de foto. O login da AirDNA que a Hoste já paga não entra nesta tabela. O tempo de uma pessoa confirmando casas duvidosas pesa mais do que essas taxas quando o volume sobe.",
    costNotes: [
      "A API no nível do imóvel começa em US$ 1.000 por mês antes de qualquer chamada extra. A conta que a Hoste já tem, mais alguns dólares de consulta, é o caminho enxuto.",
      "Ligação e mensagem ficam com a Hoste. Quando o fornecedor devolve um aviso de não perturbe, a linha mostra. O sistema não disca.",
    ],
    upkeep: [
      {
        title: "quando a AirDNA muda o site",
        detail: "US$ 30/h. Esta conexão vai quebrar. O pipeline de anúncios não tem esse problema.",
      },
      {
        title: "reserva opcional",
        detail: "4h por mês, US$ 120, se quiser o tempo de conserto já separado.",
      },
      {
        title: "hospedagem",
        detail: "O mesmo tipo de painel privado do sistema de anúncios. Alguns dólares por mês neste volume, no Google da Hoste quando a mudança estiver feita.",
      },
    ],
    inLabel: "entra nesta entrega",
    inItems: [
      "mercado, teto de nota e teto de leads",
      "anúncios da conta AirDNA, com ponto no mapa e fotos",
      "endereço proposto e nota de confiança",
      "uma fila em que uma pessoa confirma as casas duvidosas",
      "busca do dono nos endereços confirmados, e a planilha",
    ],
    outLabel: "não entra nesta entrega",
    outItems: [
      "mensagem, ligação ou e-mail para os donos",
      "uma varredura do mercado inteiro sem alguém iniciar",
      "um substituto da AirDNA no Airbnb, na Vrbo e nos outros sites",
      "a assinatura da AirDNA em si",
    ],
    next: [
      "A fase 1 é o produto: US$ 1.700, e não passa disso. Cerca de 3 semanas, na conta AirDNA que a Hoste já paga. Começo por Phoenix e pelo filtro de 4,8 do vídeo.",
      "Quem hoje compara as casas continua nas duvidosas. O resto da equipe para de rolar o mapa.",
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
