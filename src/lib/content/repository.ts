import "server-only";
import { createClient } from "@supabase/supabase-js";
import type {
  Capability,
  ExperienceItem,
  HomeContent,
  Project,
  ProjectMedia,
  SiteContent,
  TechGroup,
} from "./types";

/**
 * Read-only access to the portfolio content stored in Supabase.
 *
 * - Runs on the server only (server components / generateStaticParams).
 * - Uses the public publishable key: Row Level Security only exposes rows
 *   with published = true, so nothing unpublished can leak through here.
 * - Results are cached and revalidated every 5 minutes (ISR).
 *
 * Local visual testing without network access can set
 * PORTFOLIO_CONTENT_FIXTURE=1 to read the seed file instead. That switch
 * is never set on Vercel, so Supabase is the single source of truth.
 */

const REVALIDATE_SECONDS = 300;
const LOCALE = "en";

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, next: { revalidate: REVALIDATE_SECONDS, tags: ["portfolio-content"] } }),
    },
  });
}

const fixtureMode = () => process.env.PORTFOLIO_CONTENT_FIXTURE === "1";

async function fixture() {
  const seed = await import("../../../supabase/seed/content");
  return seed;
}

/* ----------------------------- row mappers ----------------------------- */

type ProjectRow = {
  slug: string;
  title: string;
  sector: string | null;
  summary: string | null;
  status: Project["status"];
  status_note: string | null;
  role: string | null;
  tier: Project["tier"];
  sort_order: number;
  stack: string[] | null;
  tags: string[] | null;
  context: string | null;
  problem: string | null;
  solution: string | null;
  architecture: string[] | null;
  integrations: string[] | null;
  highlights: string[] | null;
  verification: string[] | null;
  url: string | null;
  links: Project["links"] | null;
  internal_link: string | null;
  cover_image: string | null;
  cover_alt: string | null;
  project_media?: { path: string; alt: string; caption: string | null; kind: "cover" | "gallery"; sort_order: number }[];
};

function mapProject(r: ProjectRow): Project {
  const media = (r.project_media ?? []).sort((a, b) => a.sort_order - b.sort_order);
  const cover: ProjectMedia | null = r.cover_image
    ? { path: r.cover_image, alt: r.cover_alt ?? r.title, kind: "cover" }
    : null;
  return {
    slug: r.slug,
    title: r.title,
    sector: r.sector ?? "",
    summary: r.summary ?? "",
    status: r.status,
    statusNote: r.status_note,
    role: r.role ?? "",
    tier: r.tier,
    sortOrder: r.sort_order,
    stack: r.stack ?? [],
    cardTags: r.tags ?? [],
    context: r.context,
    problem: r.problem,
    solution: r.solution,
    architecture: r.architecture ?? [],
    integrations: r.integrations ?? [],
    highlights: r.highlights ?? [],
    verification: r.verification ?? [],
    url: r.url,
    links: r.links ?? [],
    internalLink: r.internal_link,
    cover,
    gallery: media.filter((m) => m.kind === "gallery").map((m) => ({ path: m.path, alt: m.alt, caption: m.caption, kind: "gallery" })),
  };
}

const PROJECT_COLUMNS =
  "slug,title,sector,summary,status,status_note,role,tier,sort_order,stack,tags,context,problem,solution,architecture,integrations,highlights,verification,url,links,internal_link,cover_image,cover_alt,project_media(path,alt,caption,kind,sort_order)";

/* ------------------------------- queries -------------------------------- */

/**
 * Real screenshots captured from each live site (or the authorised draft for
 * projects still in development). Used only when the CMS has no cover set,
 * so a cover chosen in Supabase always wins.
 */
const SCREENSHOTS: Record<string, string> = {
  "grupo-cunado": "/images/projects/grupo-cunado.webp",
  "diaz-y-asociados": "/images/projects/diaz-y-asociados-usa.webp",
  "fundacion-mecerreyes": "/images/projects/fundacion-mecerreyes.webp",
  "vitale-by-klein": "/images/projects/vitale-by-klein.webp",
  ata: "/images/projects/ata.webp",
  supralaboris: "/images/projects/supralaboris.webp",
  "tapicero-barcelona": "/images/projects/tapicero-barcelona.webp",
  "sierra-nevada-tns": "/images/projects/sierra-nevada-tns.webp",
  "farmacia-ensanche-sur": "/images/projects/farmacia-ensanche-sur.webp",
};

function withScreenshot(p: Project): Project {
  if (p.cover || !SCREENSHOTS[p.slug]) return p;
  return { ...p, cover: { path: SCREENSHOTS[p.slug], alt: `${p.title} — screenshot of the website`, kind: "cover" } };
}

export async function getProjects(): Promise<Project[]> {
  return (await loadProjects()).map(withScreenshot);
}

async function loadProjects(): Promise<Project[]> {
  if (fixtureMode()) return [...(await fixture()).projects].sort((a, b) => a.sortOrder - b.sortOrder);
  const { data, error } = await supabase()
    .from("projects")
    .select(PROJECT_COLUMNS)
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Supabase projects: ${error.message}`);
  return (data as unknown as ProjectRow[]).map(mapProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

async function getSiteContent(): Promise<{ site: SiteContent; capabilities: Capability[] }> {
  if (fixtureMode()) {
    const f = await fixture();
    return { site: f.site, capabilities: f.capabilities };
  }
  const { data, error } = await supabase()
    .from("site_content")
    .select("key,value")
    .eq("published", true)
    .eq("locale", LOCALE)
    .in("key", ["site", "capabilities"]);
  if (error) throw new Error(`Supabase site_content: ${error.message}`);
  const byKey = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
  if (!byKey.site || !byKey.capabilities) throw new Error("Supabase site_content is missing 'site' or 'capabilities'.");
  return { site: byKey.site as SiteContent, capabilities: byKey.capabilities as Capability[] };
}

async function getExperience(): Promise<ExperienceItem[]> {
  if (fixtureMode()) return (await fixture()).experience;
  const { data, error } = await supabase()
    .from("experience")
    .select("id,kind,title,place,period,description,bullets,icon,pending_confirmation,sort_order")
    .eq("published", true)
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Supabase experience: ${error.message}`);
  return (data ?? []).map((r) => ({
    id: r.id,
    kind: r.kind,
    title: r.title,
    organization: r.place,
    period: r.period,
    summary: r.description ?? "",
    bullets: r.bullets ?? undefined,
    icon: r.icon ?? "briefcase",
    pendingConfirmation: r.pending_confirmation,
    sortOrder: r.sort_order,
  }));
}

async function getTech(): Promise<TechGroup[]> {
  if (fixtureMode()) return (await fixture()).tech;
  const { data, error } = await supabase()
    .from("technologies")
    .select("name,category,category_order,icon,sort_order")
    .eq("published", true)
    .order("category_order", { ascending: true })
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`Supabase technologies: ${error.message}`);
  const groups: TechGroup[] = [];
  for (const r of data ?? []) {
    let g = groups.find((x) => x.group === r.category);
    if (!g) groups.push((g = { group: r.category, items: [] }));
    g.items.push({ name: r.name, icon: r.icon });
  }
  return groups;
}

export async function getHomeContent(): Promise<HomeContent> {
  const [{ site, capabilities }, experience, tech, projects] = await Promise.all([
    getSiteContent(),
    getExperience(),
    getTech(),
    getProjects(),
  ]);
  return { site, capabilities, experience, tech, projects };
}

export async function getSite(): Promise<SiteContent> {
  return (await getSiteContent()).site;
}
