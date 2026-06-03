// Centrale content voor de demo van Bouwbedrijf Van de Linde (Goes).
// Gebaseerd op de bestaande bedrijfsinformatie van jvandelinde.nl.

export const company = {
  name: "Bouwbedrijf Van de Linde",
  shortName: "Van de Linde",
  tagline: "Zeeuws vakmanschap sinds 1953",
  motto: "Met je werk maak je, je werk voor de toekomst",
  promise: "Staat garant voor topkwaliteit",
  phone: "0113 - 22 10 40",
  phoneHref: "tel:+31113221040",
  email: "info@jvandelinde.nl",
  street: "Albert Plesmanweg 19",
  postcode: "4462 GC",
  city: "Goes",
  region: "Zeeland",
  founded: 1953,
  kvk: "Handelsregister Zeeland",
  socials: [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};

export const nav = [
  { label: "Diensten", href: "#diensten" },
  { label: "Projecten", href: "#projecten" },
  { label: "Werkwijze", href: "#werkwijze" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Werken bij", href: "#vacatures" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "Bouwbedrijf in Goes · sinds 1953",
  titleLines: ["Bouwen", "met karakter,", "voor generaties."],
  intro:
    "Van een eeuwenoud rijksmonument tot een strakke nieuwbouwvilla: al ruim 70 jaar bouwt en restaureert Van de Linde in heel Zeeland. Een familiebedrijf met circa 60 vakmensen, korte lijnen en één belofte. Niet de grootste willen zijn, wel de beste.",
  ctaPrimary: { label: "Offerte aanvragen", href: "#contact" },
  ctaSecondary: { label: "Bekijk projecten", href: "#projecten" },
};

export const stats = [
  { value: 70, suffix: "+", label: "jaar Zeeuws vakmanschap" },
  { value: 60, suffix: "", label: "vakmensen in vaste dienst" },
  { value: 500, suffix: "+", label: "projecten gerealiseerd" },
  { value: 3, suffix: "", label: "generaties familiebedrijf" },
];

export const diensten = [
  {
    title: "Restauratie",
    blurb:
      "Kerken, kastelen, molens en monumentale panden. Erkend restauratiewerk waarbij we historie en ambacht in ere houden.",
    icon: "restauratie",
  },
  {
    title: "Unieke woningbouw",
    blurb:
      "Vrijstaande woningen en villa's op maat. Van eerste schets tot oplevering, gebouwd rond uw woonwensen.",
    icon: "woning",
  },
  {
    title: "Utiliteitsbouw",
    blurb:
      "Kantoren, bedrijfspanden en bijzondere accommodaties. Functioneel, duurzaam en netjes afgewerkt.",
    icon: "utiliteit",
  },
  {
    title: "Winkelbouw en verbouw",
    blurb:
      "Winkels, horeca en interieurs die kloppen. Verbouwen terwijl de zaak doordraait, met oog voor de planning.",
    icon: "winkel",
  },
  {
    title: "Levensloopbestendig wonen",
    blurb:
      "Comfortabel en veilig blijven wonen in elke levensfase. Slimme aanpassingen zonder in te leveren op sfeer.",
    icon: "comfort",
  },
  {
    title: "Duurzaam en energietransitie",
    blurb:
      "Isoleren, verduurzamen en vergroenen. We brengen uw pand stap voor stap naar een lager energieverbruik.",
    icon: "duurzaam",
  },
  {
    title: "Onderhoud",
    blurb:
      "Planmatig en correctief onderhoud door onze eigen servicedienst. Eén vast aanspreekpunt, snel ter plaatse.",
    icon: "onderhoud",
  },
  {
    title: "Thuisfront",
    blurb:
      "Kleinere klussen, aanpassingen en reparaties aan huis. Vakwerk, ook als het project net wat compacter is.",
    icon: "thuisfront",
  },
];

export type ProjectCategory =
  | "Restauratie"
  | "Woningbouw"
  | "Utiliteit"
  | "Winkelbouw"
  | "Verduurzaming";

export const projectCategories: ProjectCategory[] = [
  "Restauratie",
  "Woningbouw",
  "Utiliteit",
  "Winkelbouw",
  "Verduurzaming",
];

export interface Project {
  title: string;
  place: string;
  category: ProjectCategory;
  blurb: string;
  image: string;
  featured?: boolean;
}

export const projecten: Project[] = [
  {
    title: "Retraitecentrum Land aan Zee",
    place: "Burgh-Haamstede",
    category: "Utiliteit",
    blurb:
      "Een ingetogen verblijfscomplex dat opgaat in het Zeeuwse landschap. Donkere gevels, natuurlijke materialen en een vijverpartij die rust uitstraalt.",
    image: "/projecten/p-landaanzee.jpg",
    featured: true,
  },
  {
    title: "Restauratie Geerteskerk",
    place: "Kloetinge",
    category: "Restauratie",
    blurb:
      "Zorgvuldig herstel van metsel- en voegwerk aan een monumentale dorpskerk, met respect voor het oorspronkelijke beeld.",
    image: "/projecten/p-restauratie.jpg",
    featured: true,
  },
  {
    title: "Vrijstaande villa",
    place: "Middelburg",
    category: "Woningbouw",
    blurb:
      "Een eigentijdse villa op maat. Warm metselwerk gecombineerd met grote glaspartijen die binnen en buiten laten samenvloeien.",
    image: "/projecten/p-villa.jpg",
    featured: true,
  },
  {
    title: "Nieuwbouw kantoorpand",
    place: "Goes",
    category: "Utiliteit",
    blurb:
      "Representatief bedrijfspand op bedrijvenpark Deltaweg. Strakke detaillering, energiezuinig en klaar voor de toekomst.",
    image: "/projecten/p-utiliteit.jpg",
  },
  {
    title: "Herenmodezaak Sjaak van Zee",
    place: "Goes",
    category: "Winkelbouw",
    blurb:
      "Volledige verbouwing van een winkelpand in het centrum. Een warm, hoogwaardig interieur, opgeleverd zonder de zaak te sluiten.",
    image: "/projecten/p-winkel.jpg",
  },
  {
    title: "Verduurzaming woning",
    place: "Kloetinge",
    category: "Verduurzaming",
    blurb:
      "Bestaande woning naar een hoger energielabel. Isolatie, zonnepanelen en kierdichting, met behoud van het karakter.",
    image: "/projecten/p-verduurzaming.jpg",
  },
  {
    title: "Kasteel Westhove",
    place: "Domburg",
    category: "Restauratie",
    blurb:
      "Restauratiewerk aan een eeuwenoud kasteel. Ambachtelijk metsel- en timmerwerk dat decennia meegaat.",
    image: "/projecten/p-monument.jpg",
  },
  {
    title: "Vakantiewoning aan de Schotsman",
    place: "Kamperland",
    category: "Woningbouw",
    blurb:
      "Een lichte, ruime recreatiewoning vlak bij het Veerse Meer. Comfortabel afgewerkt voor jarenlang woonplezier.",
    image: "/projecten/p-villa.jpg",
  },
];

export const werkwijze = [
  {
    no: "01",
    title: "Kennismaking",
    text: "We luisteren naar uw plannen en kijken samen wat haalbaar is. Vrijblijvend en helder over wat het kost.",
  },
  {
    no: "02",
    title: "Ontwerp en calculatie",
    text: "Onze werkvoorbereiders vertalen het plan naar een sluitende begroting en planning. U weet vooraf waar u aan toe bent.",
  },
  {
    no: "03",
    title: "De bouw",
    text: "Eigen vakmensen aan het werk, met één vast aanspreekpunt. Korte lijnen, nette bouwplaats, afspraak is afspraak.",
  },
  {
    no: "04",
    title: "Oplevering en onderhoud",
    text: "We leveren op zoals beloofd en blijven daarna bereikbaar. Onze servicedienst zorgt voor het onderhoud erna.",
  },
];

export const kernwaarden = [
  {
    title: "Betrokkenheid",
    text: "Onze mensen zijn vakmensen met passie. Ze denken mee en pakken proactief aan.",
  },
  {
    title: "Kwaliteit",
    text: "We doen het werk in één keer goed. Daar staan we voor, met naam en toenaam.",
  },
  {
    title: "Collegialiteit",
    text: "Een hecht team dat elkaar helpt. Dat voel je terug op elke bouwplaats.",
  },
  {
    title: "Samenwerken",
    text: "Met opdrachtgevers, collega's en leveranciers bouwen we aan langdurige relaties.",
  },
  {
    title: "Duidelijkheid",
    text: "Heldere afspraken en eerlijke communicatie. U weet altijd waar u aan toe bent.",
  },
];

export const keurmerken = [
  { name: "VCA", file: "/keurmerken/VCA.png" },
  { name: "Woningborg", file: "/keurmerken/woningborg.png" },
  { name: "BouwGarant", file: "/keurmerken/Bouwgarant-1.png" },
  { name: "TÜV Rheinland", file: "/keurmerken/TUV.png" },
  { name: "NBR", file: "/keurmerken/NBR.png" },
  { name: "Erkend leerbedrijf", file: "/keurmerken/Fundeon.png" },
];

export const vacatures = [
  { title: "Timmerman", type: "Fulltime", href: "#contact" },
  { title: "Voorman", type: "Fulltime", href: "#contact" },
  { title: "Werkvoorbereider", type: "Fulltime", href: "#contact" },
  { title: "Allround medewerker servicedienst", type: "Fulltime", href: "#contact" },
];
