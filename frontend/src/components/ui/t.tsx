"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { useLocale } from "@/components/providers/locale-provider";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}";

interface TProps {
  /** Translation key (dot notation) */
  k: string;
  /** Custom className */
  className?: string;
  /** Animation duration in ms */
  duration?: number;
  /** HTML tag to render */
  as?: ElementType;
}

/**
 * Translated text component with matrix scramble animation.
 * Usage: <T k="nav.home" /> or <T k="home.bio" as="p" className="text-muted" />
 */
export function T({ k, className, duration = 2500, as: Tag = "span" }: TProps) {
  const { t, lastChange } = useLocale();
  const text = t(k);
  
  // Track animation state
  const [animationText, setAnimationText] = useState<string | null>(null);
  const previousTextRef = useRef(text);
  const lastChangeRef = useRef(lastChange);
  const frameRef = useRef<number | null>(null);

  // Effect only runs animation when locale changes
  useEffect(() => {
    const prevText = previousTextRef.current;
    const newText = text;
    const localeChanged = lastChangeRef.current !== lastChange && lastChange > 0;
    
    // Update refs for next render
    previousTextRef.current = newText;
    lastChangeRef.current = lastChange;
    
    // Skip animation if no locale change or same text
    if (!localeChanged || prevText === newText) {
      return;
    }

    // Run scramble animation
    const maxLength = Math.max(prevText.length, newText.length);
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      let result = "";
      for (let i = 0; i < maxLength; i++) {
        const charProgress = Math.min(1, eased * 1.8 - (i / maxLength) * 0.8);

        if (charProgress >= 1) {
          result += newText[i] ?? "";
        } else if (charProgress <= 0) {
          result += prevText[i] ?? " ";
        } else {
          const targetChar = newText[i] ?? "";
          if (targetChar === " " || /[.,;:!?()[\]{}<>\/\\-–—]/.test(targetChar)) {
            result += targetChar;
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }

      setAnimationText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setAnimationText(null); // Done - show actual text
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, lastChange, duration]);

  // Show animation text while animating, otherwise show actual translation
  return <Tag className={className}>{animationText ?? text}</Tag>;
}
