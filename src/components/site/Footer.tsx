import Link from "next/link";
import { Heart } from "lucide-react";
import Monogram from "@/components/ui/Monogram";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer({ name, role }: { name: string; role: string }) {
  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col items-center gap-5 py-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <Monogram />
          <p className="text-[0.78rem] text-charcoal">
            {name} <span className="mx-1.5 text-muted">—</span> <span className="text-muted">{role}</span>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-6 text-[0.78rem] text-charcoal">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-ink hover:underline hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="flex items-center gap-1.5 text-[0.74rem] text-muted">
          © {new Date().getFullYear()} · Built with <Heart size={12} className="fill-accent text-accent" aria-label="love" /> and Next.js
        </p>
      </div>
    </footer>
  );
}
