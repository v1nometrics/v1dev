import { describe, expect, test } from "bun:test";
import { mdxToPlainText, scrambleFrame } from "@/lib/scramble";

describe("scrambleFrame", () => {
  test("at eased=0 keeps the from string (padded)", () => {
    const out = scrambleFrame("abc", "xyzzy", 0, "X");
    expect(out.startsWith("abc")).toBe(true);
  });

  test("at eased=1 equals the to string", () => {
    expect(scrambleFrame("abc", "olá mundo", 1, "X")).toBe("olá mundo");
  });

  test("mid progress mixes noise without throwing on length mismatch", () => {
    const out = scrambleFrame("short", "a much longer portuguese line", 0.4, "X");
    expect(out.length).toBeGreaterThan(5);
  });
});

describe("mdxToPlainText", () => {
  test("keeps prose and diagram ascii, strips jsx tags", () => {
    const src = `
Na base, um modelo.

<Diagram caption="x">{{\`comment
│
▼
box\`}</Diagram>

More text.
`;
    const plain = mdxToPlainText(src);
    expect(plain).toContain("Na base, um modelo.");
    expect(plain).toContain("comment");
    expect(plain).toContain("More text.");
    expect(plain).not.toContain("<Diagram");
  });

  test("pt and en sources produce different plain texts", () => {
    const pt = mdxToPlainText("Olá mundo. Pipeline clássico.");
    const en = mdxToPlainText("Hello world. Classic pipeline.");
    expect(pt).not.toBe(en);
    expect(pt.length).toBeGreaterThan(0);
    expect(en.length).toBeGreaterThan(0);
  });
});
