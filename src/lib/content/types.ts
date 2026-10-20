/**
 * Content model shared by the portfolio. The single source of truth for
 * this content is Supabase (see supabase/migrations). These types mirror
 * the public, published rows the site is allowed to read.
 */

export type ProjectStatus = "live" | "in_development" | "staging" | "in_review" | "proposal" | "personal";

export type ProjectLink = {
  label: string; // e.g. "Visit Website", "Visit USA Website"
  url: string;
  status?: ProjectStatus | null; // status of that specific site when it differs from the project
  note?: string | null;
};
export type ProjectTier = "featured" | "main" | "secondary";

export type ProjectMedia = {
  path: string; // path inside /public or a full Supabase Storage URL
  alt: string;
  caption?: string | null;
  kind: "cover" | "gallery";
};

export type Project = {
  slug: string;
  title: string;
  sector: string;
  summary: string; // one-liner for cards
  status: ProjectStatus;
  statusNote?: string | null;
  role: string;
  tier: ProjectTier;
  sortOrder: number;
  stack: string[]; // technologies actually used
  cardTags: string[]; // 2–3 short tags for cards
  context?: string | null;
  problem?: string | null;
  solution?: string | null;
  architecture?: string[]; // bullet list of logic / architecture
  integrations?: string[];
  highlights?: string[]; // features delivered
  verification?: string[];
  url?: string | null; // primary public URL (kept for compatibility)
  links?: ProjectLink[]; // public websites shown as "Visit …" buttons
  cover?: ProjectMedia | null;
  gallery?: ProjectMedia[];
  internalLink?: string | null; // e.g. /orbit
};

export type ExperienceKind = "education" | "work" | "freelance";

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  title: string; // role or degree
  organization: string;
  period: string; // visible label, never invented
  pendingConfirmation?: boolean;
  summary: string;
  bullets?: { heading?: string; items: string[] }[];
  sortOrder: number;
  icon: "cap" | "book" | "laptop" | "chart" | "spark" | "briefcase";
};

export type TechGroup = {
  group: string;
  items: { name: string; icon?: string | null }[];
};

export type Capability = {
  title: string;
  description: string;
  icon: "code" | "link" | "wordpress" | "cloud" | "bug" | "sparkle";
  href?: string | null;
};

export type SiteContent = {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  heroIntro: string;
  heroFacts: string[];
  availability: string | null;
  aboutHeading: string;
  aboutParagraphs: string[];
  aboutFacts: string[];
  capabilitiesIntro: string;
  experienceIntro: string;
  workIntro: string;
  stackIntro: string;
  contactHeading: string;
  contactText: string;
  contactTopics: string[];
  location: string;
  email: string;
  github: string | null;
  linkedin: string | null;
  handHero: string[];
  handAbout: string;
  handContact: string;
  languages?: { name: string; level: string }[];
};

export type HomeContent = {
  site: SiteContent;
  capabilities: Capability[];
  experience: ExperienceItem[];
  tech: TechGroup[];
  projects: Project[];
};
