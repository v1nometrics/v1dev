/**
 * Shared matrix-scramble helpers (pure — safe to unit test).
 */

export const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}";

const PRESERVE = /[\s.,;:!?()[\]{}<>\/\\-–—·│─┌┐└┘┬▼►←→]/;

/** One frame of left-to-right matrix morph (same easing curve as `<T>`). */
export function scrambleFrame(
  from: string,
  to: string,
  eased: number,
  chars: string = SCRAMBLE_CHARS
): string {
  const maxLength = Math.max(from.length, to.length);
  let result = "";

  for (let i = 0; i < maxLength; i++) {
    const charProgress = Math.min(1, eased * 1.8 - (i / maxLength) * 0.8);

    if (charProgress >= 1) {
      result += to[i] ?? "";
    } else if (charProgress <= 0) {
      result += from[i] ?? " ";
    } else {
      const target = to[i] ?? "";
      if (PRESERVE.test(target)) {
        result += target;
      } else {
        result += chars[Math.floor(Math.random() * chars.length)] ?? "?";
      }
    }
  }

  return result;
}

/**
 * Rough plain text from MDX source for scramble morphs.
 * Keeps template-literal diagram bodies; strips JSX tags / expressions.
 */
export function mdxToPlainText(source: string): string {
  return source
    .replace(/\{`([\s\S]*?)`\}/g, "\n$1\n")
    .replace(/<\/?[A-Za-z][^>]*>/g, "\n")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
