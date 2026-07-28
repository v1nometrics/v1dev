import { BlogContent } from "@/components/blog/blog-content";
import { getAllNotes, getAllPosts } from "@/lib/content";

export default async function WritingPage() {
  // Both locales so LanguageToggle can swap client-side without refresh
  // (same pattern as lab/refs — LocaleProvider does not navigate).
  const articlesByLocale = {
    "pt-BR": getAllPosts("pt-BR"),
    en: getAllPosts("en"),
  };
  const notesByLocale = {
    "pt-BR": getAllNotes("pt-BR"),
    en: getAllNotes("en"),
  };

  return (
    <BlogContent
      articlesByLocale={articlesByLocale}
      notesByLocale={notesByLocale}
    />
  );
}
