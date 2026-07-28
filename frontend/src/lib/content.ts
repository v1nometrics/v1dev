import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { z } from "zod";
import { calculateReadingTime } from "@/lib/utils";

export type ContentKind = "blog" | "notes";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  tags: z.array(z.string()).default([]),
  summary: z.string().min(1),
  draft: z.boolean().optional().default(false),
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
  return process.env.NODE_ENV !== "production" || !entry.draft;
}

function readEntry(kind: ContentKind, filename: string): ContentEntry {
  const slug = filename.replace(/\.mdx$/, "");
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
    ...parsed.data,
    readingTime: calculateReadingTime(content),
    content,
  };
}

function listSlugs(kind: ContentKind): string[] {
  return readdirSync(dirFor(kind))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function getAll(kind: ContentKind): ContentEntry[] {
  return listSlugs(kind)
    .map((slug) => readEntry(kind, `${slug}.mdx`))
    .filter(isPublished)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** All published blog posts (articles), sorted newest first. */
export function getAllPosts(): ContentMeta[] {
  return getAll("blog").map(stripContent);
}

/** All published notes, sorted newest first. */
export function getAllNotes(): ContentMeta[] {
  return getAll("notes").map(stripContent);
}

/** Every slug across blog + notes, for generateStaticParams. */
export function getAllContentSlugs(): string[] {
  return [...listSlugs("blog"), ...listSlugs("notes")];
}

/**
 * Resolve a slug against both content kinds (blog posts and notes share the
 * same `/blog/[slug]` route). Returns null if not found in either.
 */
export function getContentBySlug(slug: string): ContentEntry | null {
  if (listSlugs("blog").includes(slug)) {
    return readEntry("blog", `${slug}.mdx`);
  }
  if (listSlugs("notes").includes(slug)) {
    return readEntry("notes", `${slug}.mdx`);
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
