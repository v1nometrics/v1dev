"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** Duration in ms for the scramble effect */
  duration?: number;
  /** Delay before starting scramble */
  delay?: number;
}

/**
 * Matrix-style text scramble effect.
 * Characters randomly cycle through glyphs before settling on final text.
 */
export function ScrambleText({
  text,
  className,
  duration = 600,
  delay = 0,
}: ScrambleTextProps) {
  const [scrambledText, setScrambledText] = useState<string | null>(null);
  const previousText = useRef(text);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    // Skip animation if text hasn't changed from initial render
    if (previousText.current === text) {
      return;
    }

    const startText = previousText.current;
    const endText = text;
    previousText.current = text;

    // Calculate max length for animation
    const maxLength = Math.max(startText.length, endText.length);
    const startTime = performance.now() + delay;

    const animate = (now: number) => {
      if (now < startTime) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min((now - startTime) / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      let result = "";
      for (let i = 0; i < maxLength; i++) {
        const charProgress = Math.min(1, eased * 1.5 - (i / maxLength) * 0.5);

        if (charProgress >= 1) {
          // Character has settled
          result += endText[i] ?? "";
        } else if (charProgress <= 0) {
          // Character hasn't started transitioning
          result += startText[i] ?? " ";
        } else {
          // Character is scrambling
          const targetChar = endText[i] ?? "";
          // Preserve spaces and punctuation
          if (targetChar === " " || /[.,;:!?()[\]{}<>\/\\-]/.test(targetChar)) {
            result += targetChar;
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }

      setScrambledText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setScrambledText(null); // Clear scrambled state, show actual text
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, delay]);

  // Show scrambled text during animation, otherwise show actual text
  const displayText = scrambledText ?? text;

  return <span className={className}>{displayText}</span>;
}
