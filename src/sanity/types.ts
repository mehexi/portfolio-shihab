export type SanityImage = {
  asset: { _ref: string };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Stat = { value: string; label: string };
export type Principle = { title: string; body: string };
export type CareerEntry = { years: string; role: string; org: string; note: string };
export type Project = {
  sector: string;
  year: string;
  title: string;
  body: string;
  outcome: string;
  image?: SanityImage;
};
export type TechGroup = { title: string; tools: string[] };
export type Insight = {
  type: string;
  source: string;
  title: string;
  url?: string;
  image?: SanityImage;
};
export type Contact = { label: string; value: string; url?: string };

export type Profile = {
  name: string;
  role: string;
  headline: string;
  intro: string;
  showPortrait: boolean;
  portrait?: SanityImage;
  cvUrl?: string;
  stats: Stat[];
  aboutHeading: string;
  aboutBody: string[];
  principles: Principle[];
  career: CareerEntry[];
  projects: Project[];
  techHeading: string;
  techIntro: string;
  tech: TechGroup[];
  showInsights: boolean;
  insights: Insight[];
  contactHeading: string;
  email: string;
  contacts: Contact[];
  seoTitle?: string;
  seoDescription?: string;
};
