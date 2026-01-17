import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date to short string (e.g., "Jan 2024")
 */
export function formatDateShort(date: string | Date): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "short",
  });
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export function formatDateISO(date: string | Date): string {
  return new Date(date).toISOString().split("T")[0];
}

/**
 * Calculate reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Slugify a string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Truncate text with ellipsis
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trim() + "...";
}

/**
 * Get absolute URL for the site
 */
export function getAbsoluteUrl(path: string = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://v1torres.dev";
  return `${baseUrl}${path}`;
}
