import * as icons from "simple-icons";

type SimpleIcon = { path: string; hex: string; title: string };

const LIBRARY = icons as unknown as Record<string, SimpleIcon | undefined>;

function lookup(slug: string): SimpleIcon | undefined {
  const key = "si" + slug.charAt(0).toUpperCase() + slug.slice(1);
  return LIBRARY[key];
}

/** Brand logo from simple-icons, or a neutral monogram when none exists. */
export default function BrandIcon({
  slug,
  name,
  size = 18,
  mono = false,
}: {
  slug?: string | null;
  name: string;
  size?: number;
  mono?: boolean;
}) {
  const icon = slug ? lookup(slug) : undefined;
  if (!icon) {
    return (
      <span
        aria-hidden
        className="inline-flex shrink-0 items-center justify-center rounded-[5px] bg-sand font-mono text-[9px] font-semibold text-charcoal"
        style={{ width: size, height: size }}
      >
        {name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase()}
      </span>
    );
  }
  const dark = ["000000", "181717", "222222"].includes(icon.hex.toUpperCase()) || mono;
  return (
    <svg
      aria-hidden
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0"
      fill={dark ? "currentColor" : `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
}
