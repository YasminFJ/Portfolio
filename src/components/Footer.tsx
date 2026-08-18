import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="section-shell flex flex-col items-center gap-2 py-8 text-center text-xs text-muted sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {profile.name}
        </p>
        <p className="font-mono">Hecho con Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
