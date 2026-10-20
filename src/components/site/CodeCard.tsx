type Tok = [cls: string, text: string];

/** Small decorative snippet that reflects the real stack. Pure markup, no JS. */
const LINES: Tok[][] = [
  [["tok-c", "// Building better web experiences"]],
  [["tok-k", "const"], ["tok-p", " developer = {"]],
  [["tok-p", "  name: "], ["tok-s", '"Yasmin Fennou Jabal"'], ["tok-p", ","]],
  [["tok-p", "  role: "], ["tok-s", '"Full Stack Developer"'], ["tok-p", ","]],
  [["tok-p", "  stack: ["]],
  [["tok-s", '    "React"'], ["tok-p", ", "], ["tok-s", '"Next.js"'], ["tok-p", ", "], ["tok-s", '"Node.js"'], ["tok-p", ","]],
  [["tok-s", '    "TypeScript"'], ["tok-p", ", "], ["tok-s", '"PostgreSQL"'], ["tok-p", ","]],
  [["tok-s", '    "Supabase"'], ["tok-p", ", "], ["tok-s", '"REST APIs"']],
  [["tok-p", "  ],"]],
  [["tok-p", "  passion: "], ["tok-s", '"Turning ideas into real']],
  [["tok-s", '    digital products."']],
  [["tok-p", "};"]],
];

export default function CodeCard() {
  return (
    <figure className="code-card overflow-hidden" aria-label="Code snippet describing the developer profile">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-[#5a5550]" />
        <span className="h-2 w-2 rounded-full bg-[#5a5550]" />
        <span className="h-2 w-2 rounded-full bg-[#5a5550]" />
        <span className="ml-3 text-[0.62rem] tracking-wide text-[#7d776d]">developer.ts</span>
      </div>
      <pre className="overflow-hidden px-4 py-3.5 text-[0.62rem] leading-[1.75] sm:text-[0.68rem] lg:text-[0.6rem] xl:text-[0.7rem]">
        <code>
          {LINES.map((line, i) => (
            <span key={i} className="block whitespace-pre">
              <span className="tok-n mr-3 inline-block w-4 select-none text-right">{i + 1}</span>
              {line.map(([cls, text], j) => (
                <span key={j} className={cls}>
                  {text}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
