import type { Profile } from "./types";

// The design's own copy. Rendered until a `profile` document is published in
// Sanity, and the source for seed/profile.ndjson.
export const fallbackProfile: Profile = {
  name: "Daniel Ashworth",
  role: "Group Chief Executive · Meridian Group",
  headline: "Building enduring companies through disciplined growth.",
  intro:
    "Twenty years leading global organisations across financial services, infrastructure and technology, with a focus on long-term value, strong governance and people.",
  showPortrait: true,
  stats: [
    { value: "$4.2B", label: "Annual group revenue" },
    { value: "18,000", label: "People across 23 markets" },
    { value: "3.1×", label: "Shareholder return since 2017" },
    { value: "AA", label: "MSCI ESG rating, 2026" },
  ],
  aboutHeading: "A steady hand through transformation.",
  aboutBody: [
    "Daniel leads Meridian Group, a diversified holding company with operations across Europe, the Middle East and Asia-Pacific. Since taking the helm in 2017 he has refocused the portfolio on core infrastructure and financial services, completed eleven acquisitions and doubled operating margin.",
    "He holds an MBA from INSEAD and a degree in Economics from the London School of Economics, and is a Fellow of the Chartered Institute for Securities & Investment.",
  ],
  principles: [
    { title: "Long-term value", body: "Decisions measured in decades, not quarters." },
    { title: "Clear governance", body: "Accountability at every level of the organisation." },
    { title: "People first", body: "Leadership that develops leaders." },
    { title: "Responsible growth", body: "Performance aligned with sustainability." },
  ],
  career: [
    {
      years: "2017 – Present",
      role: "Group Chief Executive",
      org: "Meridian Group",
      note: "Led portfolio restructuring, eleven acquisitions and entry into four new markets; doubled operating margin.",
    },
    {
      years: "2012 – 2017",
      role: "Chief Operating Officer",
      org: "Meridian Group",
      note: "Integrated three operating divisions into a single platform and delivered a £240M efficiency programme.",
    },
    {
      years: "2007 – 2012",
      role: "Managing Director, EMEA",
      org: "Halden Capital Partners",
      note: "Built the regional infrastructure practice from inception to £3.5B under management.",
    },
    {
      years: "2003 – 2007",
      role: "Associate Partner",
      org: "Strategy & Co.",
      note: "Advised boards in financial services and utilities on growth strategy and M&A.",
    },
  ],
  projects: [
    {
      sector: "Infrastructure",
      year: "2024",
      title: "Northern Energy Corridor",
      body: "A cross-border grid interconnector linking renewable generation in the North Sea to industrial demand in four countries.",
      outcome: "£1.8B programme · Delivered on schedule",
    },
    {
      sector: "Financial services",
      year: "2023",
      title: "Meridian Capital merger",
      body: "Combined two asset management businesses into a single platform with one operating model, brand and leadership team.",
      outcome: "£40B assets under management",
    },
    {
      sector: "Real estate",
      year: "2022",
      title: "Canary Quarter regeneration",
      body: "A mixed-use waterfront development delivered in partnership with the city, combining offices, housing and public space.",
      outcome: "1.2M sq ft · BREEAM Outstanding",
    },
    {
      sector: "Expansion",
      year: "2021",
      title: "Asia-Pacific market entry",
      body: "Established regional headquarters in Singapore and built operations across five new markets within three years.",
      outcome: "2,400 roles created",
    },
  ],
  techHeading: "Technology we use.",
  techIntro:
    "The platforms and partners behind our operations, chosen for scale, security and long-term reliability across every operating company.",
  tech: [
    { title: "Cloud & infrastructure", tools: ["Microsoft Azure", "AWS", "VMware", "Cisco"] },
    { title: "Enterprise systems", tools: ["SAP S/4HANA", "Salesforce", "Workday", "ServiceNow"] },
    { title: "Data & analytics", tools: ["Snowflake", "Databricks", "Power BI"] },
    { title: "AI & automation", tools: ["Azure OpenAI", "UiPath", "Microsoft Copilot"] },
    { title: "Security", tools: ["CrowdStrike", "Okta", "Palo Alto Networks"] },
  ],
  showInsights: true,
  insights: [
    { type: "Article", source: "Harvard Business Review", title: "Why patient capital wins in volatile markets" },
    { type: "Interview", source: "Bloomberg", title: "Rebuilding infrastructure for the next fifty years" },
    { type: "Podcast", source: "The Boardroom", title: "Governance as a competitive advantage" },
  ],
  contactHeading: "For board, media and partnership enquiries.",
  email: "office@ashworth.com",
  contacts: [
    { label: "Executive office", value: "Sarah Kemp · +44 20 7946 0321" },
    { label: "Media relations", value: "press@meridiangroup.com" },
    { label: "Headquarters", value: "25 Old Broad Street, London EC2N 1HN" },
    { label: "Connect", value: "LinkedIn ↗" },
  ],
};
