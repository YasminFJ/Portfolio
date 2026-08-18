import Reveal from "@/components/Reveal";
import { codeSnippet } from "@/lib/data";

const tokenColor: Record<string, string> = {
  comment: "text-slate-400",
  keyword: "text-violet-600",
  tag: "text-indigo-600",
  attr: "text-amber-700",
  string: "text-emerald-600",
  param: "text-sky-700",
  plain: "text-slate-700",
};

export default function CodeShowcase() {
  return (
    <section className="section-shell pb-24">
      <Reveal>
        <div className="mx-auto max-w-2xl overflow-hidden rounded-xl border border-border bg-[#0f1120] shadow-2xl shadow-slate-900/20">
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#151731] px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-slate-400">{codeSnippet.fileName}</span>
          </div>
          <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
            {codeSnippet.lines.map((line, i) => (
              <div key={i}>
                {line.tokens.map((token, j) => (
                  <span key={j} className={tokenColor[token.t] ?? "text-slate-300"}>
                    {token.v}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
      </Reveal>
    </section>
  );
}
