import { existsSync, readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { z } from "zod";
import { type Locale, defaultLocale } from "@/i18n";
import { calculateReadingTime } from "@/lib/utils";

export type ContentKind = "blog" | "notes";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  summary: z.string().min(1),
  draft: z.boolean().optional().default(false),
  readingTime: z.number().int().positive().optional(),
});

export type ContentMeta = {
  slug: string;
  kind: ContentKind;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readingTime: number;
  draft: boolean;
};

export type ContentEntry = ContentMeta & {
  content: string;
};

const CONTENT_ROOT = join(process.cwd(), "src/content");

function dirFor(kind: ContentKind): string {
  return join(CONTENT_ROOT, kind);
}

function isPublished(entry: ContentEntry): boolean {
  return !entry.draft;
}

function localeFilename(slug: string, locale: Locale): string {
  return locale === "en" ? `${slug}.en.mdx` : `${slug}.mdx`;
}

function resolveFilename(kind: ContentKind, slug: string, locale: Locale): string {
  const preferred = localeFilename(slug, locale);
  const preferredPath = join(dirFor(kind), preferred);
  if (existsSync(preferredPath)) return preferred;

  // Fallback to default locale so /en never 404s if a translation is missing
  return `${slug}.mdx`;
}

function readEntry(
  kind: ContentKind,
  slug: string,
  locale: Locale = defaultLocale
): ContentEntry {
  const filename = resolveFilename(kind, slug, locale);
  const raw = readFileSync(join(dirFor(kind), filename), "utf-8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${kind}/${filename}: ${parsed.error.message}`
    );
  }

  return {
    slug,
    kind,
    title: parsed.data.title,
    date: parsed.data.date,
    tags: parsed.data.tags,
    summary: parsed.data.summary,
    draft: parsed.data.draft,
    readingTime: parsed.data.readingTime ?? calculateReadingTime(content),
    content,
  };
}

/** Base slugs (without .en suffix), derived from all MDX files in the kind dir. */
function listSlugs(kind: ContentKind): string[] {
  const names = readdirSync(dirFor(kind))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.en\.mdx$/, "").replace(/\.mdx$/, ""));

  return [...new Set(names)];
}

function getAll(kind: ContentKind, locale: Locale = defaultLocale): ContentEntry[] {
  return listSlugs(kind)
    .map((slug) => readEntry(kind, slug, locale))
    .filter(isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** All published blog posts (articles), sorted newest first. */
export function getAllPosts(locale: Locale = defaultLocale): ContentMeta[] {
  return getAll("blog", locale).map(stripContent);
}

/** All published notes, sorted newest first. */
export function getAllNotes(locale: Locale = defaultLocale): ContentMeta[] {
  return getAll("notes", locale).map(stripContent);
}

/** Published slugs across blog + notes, for generateStaticParams. */
export function getAllContentSlugs(): string[] {
  return [...getAll("blog"), ...getAll("notes")].map((entry) => entry.slug);
}

/**
 * Resolve a slug against both content kinds (blog posts and notes share the
 * same `/blog/[slug]` route). Returns null if not found or still a draft.
 */
export function getContentBySlug(
  slug: string,
  locale: Locale = defaultLocale
): ContentEntry | null {
  if (listSlugs("blog").includes(slug)) {
    const entry = readEntry("blog", slug, locale);
    return isPublished(entry) ? entry : null;
  }
  if (listSlugs("notes").includes(slug)) {
    const entry = readEntry("notes", slug, locale);
    return isPublished(entry) ? entry : null;
  }
  return null;
}

function stripContent(entry: ContentEntry): ContentMeta {
  return {
    slug: entry.slug,
    kind: entry.kind,
    title: entry.title,
    date: entry.date,
    tags: entry.tags,
    summary: entry.summary,
    readingTime: entry.readingTime,
    draft: entry.draft,
  };
}
