import type { ProjectStatus } from "@/lib/content/types";

const LABELS: Record<ProjectStatus, string> = {
  live: "Published",
  in_development: "In development",
  staging: "Staging",
  in_review: "In client review",
  proposal: "Proposal",
  personal: "Personal project",
};

export function statusLabel(s: ProjectStatus) {
  return LABELS[s];
}

export default function StatusBadge({ status, dark = false }: { status: ProjectStatus; dark?: boolean }) {
  const dot = status === "live" ? "bg-ok" : status === "personal" ? "bg-accent" : "bg-[#c9a35c]";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.66rem] font-medium tracking-wide ${
        dark ? "border border-white/20 bg-black/30 text-white/85 backdrop-blur" : "border border-line bg-paper/90 text-charcoal backdrop-blur"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {LABELS[status]}
    </span>
  );
}
