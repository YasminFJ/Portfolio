"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT, T } from "@/content/home";
import { localeFromPath } from "./SiteHeader";

export default function SiteFooter() {
  const locale = localeFromPath(usePathname());
  const t = T[locale];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[78rem] flex-col gap-4 px-5 py-8 text-[0.82rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 xl:px-10">
        <p>
          © {new Date().getFullYear()} Yasmin Fennou Jabal. {t.rights}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a href={`mailto:${CONTACT.email}`} className="hover:text-ink">
              Email
            </a>
          </li>
          <li>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              GitHub
            </a>
          </li>
          <li>
            <Link href="/orbit" className="hover:text-ink">
              ORBIT
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
