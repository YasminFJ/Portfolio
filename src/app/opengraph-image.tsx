import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Yasmin Fennou Jabal — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const root = process.cwd();
  const [serif, sans, photo] = await Promise.all([
    readFile(join(root, "src/app/fonts/og/newsreader-400.woff")),
    readFile(join(root, "src/app/fonts/og/inter-500.woff")),
    readFile(join(root, "public/images/yasmin-og.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
  const stack = ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase"];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f6f0e8", padding: "64px 72px", fontFamily: "Inter" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, letterSpacing: 4, color: "#2b2622" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#b0715a" }} />
            FULL STACK DEVELOPER
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Newsreader", fontSize: 96, lineHeight: 0.98, color: "#1b1714", letterSpacing: -2 }}>Yasmin</div>
            <div style={{ fontFamily: "Newsreader", fontSize: 96, lineHeight: 0.98, color: "#1b1714", letterSpacing: -2 }}>Fennou Jabal</div>
            <div style={{ marginTop: 22, fontSize: 26, color: "#4b443d", lineHeight: 1.4, maxWidth: 560 }}>
              Web applications, integrations, payments, infrastructure and debugging.
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stack.map((s) => (
              <div key={s} style={{ display: "flex", border: "1px solid #d6c8b6", background: "#fbf8f3", borderRadius: 10, padding: "7px 13px", fontSize: 18, color: "#2b2622" }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 40, color: "#1b1714" }}>YF</div>
          <img src={photoSrc} width={330} height={412} style={{ borderRadius: 22, objectFit: "cover" }} alt="" />
          <div style={{ display: "flex", fontSize: 20, color: "#6f655c" }}>yasminfennou.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
        { name: "Inter", data: sans, weight: 500, style: "normal" },
      ],
    }
  );
}
