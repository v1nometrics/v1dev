import { describe, expect, test } from "bun:test";
import { scrambleFrame } from "@/lib/scramble";

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
