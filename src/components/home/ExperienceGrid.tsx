"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { JOBS, T, type Job, type Locale } from "@/content/home";

function Logo({ kind, company }: { kind: Job["logo"]; company: string }) {
  if (kind === "freelance") {
    return (
      <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-line bg-white font-serif text-[1.9rem] text-ink">
        /
      </span>
    );
  }
  if (kind === "esphera") {
    return (
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-ink p-3">
        <Image src="/images/logos/esphera.svg" alt={`${company} logo`} width={30} height={34} />
      </span>
    );
  }
  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-line bg-white p-2.5">
      <Image src="/images/logos/xtramakers.png" alt={`${company} logo`} width={34} height={34} />
    </span>
  );
}

function JobCard({ job, locale }: { job: Job; locale: Locale }) {
  const t = T[locale];
  const [open, setOpen] = useState(false);
  const id = `job-more-${job.logo}`;
  return (
    <article className="flex gap-5">
      <Logo kind={job.logo} company={job.company} />
      <div className="min-w-0">
        <h3 className="text-[1rem] font-semibold text-ink">{locale === "en" && job.logo === "freelance" ? "Independent professional" : job.company}</h3>
        <p className="mt-1 text-[0.88rem] text-charcoal">{job.role[locale]}</p>
        <p className="mt-0.5 text-[0.8rem] text-muted">{job.period[locale]}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-4 text-[0.84rem] leading-[1.55] text-charcoal/80 marker:text-muted-2">
          {job.bullets[locale].map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <ul id={id} hidden={!open} className="mt-1.5 list-disc space-y-1.5 pl-4 text-[0.84rem] leading-[1.55] text-charcoal/80 marker:text-muted-2">
          {job.more[locale].map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="group mt-4 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-[0.82rem] text-ink"
        >
          {open ? t.less : t.more}
          <ArrowRight size={13} aria-hidden className={`transition-transform ${open ? "-rotate-90" : "group-hover:translate-x-0.5"}`} />
        </button>
      </div>
    </article>
  );
}

export default function ExperienceGrid({ locale }: { locale: Locale }) {
  return (
    <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
      {JOBS.map((job) => (
        <div key={job.logo} data-reveal className="md:px-8 md:first:pl-0 md:last:pr-0">
          <JobCard job={job} locale={locale} />
        </div>
      ))}
    </div>
  );
}
