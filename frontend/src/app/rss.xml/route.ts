import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

export async function GET() {
  const baseUrl = "https://v1torres.dev";
  const contentDir = join(process.cwd(), "src/content");

  const articles: Array<{
    title: string;
    date: string;
    slug: string;
    summary: string;
    path: string;
  }> = [];

  // Ler blog posts
  const blogDir = join(contentDir, "blog");
  const blogFiles = readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  for (const file of blogFiles) {
    const filePath = join(blogDir, file);
    const content = readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    articles.push({
      title: data.title,
      date: data.date,
      slug: file.replace(".mdx", ""),
      summary: data.summary,
      path: "/blog/",
    });
  }

  // Ler notes
  const notesDir = join(contentDir, "notes");
  const notesFiles = readdirSync(notesDir).filter((f) => f.endsWith(".mdx"));
  for (const file of notesFiles) {
    const filePath = join(notesDir, file);
    const content = readFileSync(filePath, "utf-8");
    const { data } = matter(content);
    articles.push({
      title: data.title,
      date: data.date,
      slug: file.replace(".mdx", ""),
      summary: data.summary,
      path: "/blog/",
    });
  }

  // Ordenar por data decrescente
  articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Gerar XML RSS
  const rssItems = articles
    .map((article) => {
      const url = `${baseUrl}${article.path}${article.slug}`;
      const pubDate = new Date(article.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>v1 torres - blog</title>
    <link>${baseUrl}</link>
    <description>notas e reflexões do que aprendo estudando e resolvendo problemas em produção.</description>
    <language>pt-br</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
