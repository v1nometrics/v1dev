import { getAllNotes, getAllPosts } from "@/lib/content";

export async function GET() {
  const baseUrl = "https://v1torres.dev";

  const articles = [
    ...getAllPosts().map((post) => ({
      title: post.title,
      date: post.date,
      slug: post.slug,
      summary: post.summary,
      path: "/blog/",
    })),
    ...getAllNotes().map((note) => ({
      title: note.title,
      date: note.date,
      slug: note.slug,
      summary: note.summary,
      path: "/blog/",
    })),
  ].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
