import { BlogContent } from "@/components/blog/blog-content";
import type { Locale } from "@/i18n";
import { getAllNotes, getAllPosts } from "@/lib/content";

export default async function WritingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = getAllPosts(locale as Locale);
  const notes = getAllNotes(locale as Locale);

  return <BlogContent articles={articles} notes={notes} />;
}
