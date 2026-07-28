import { HomeContent } from "@/components/home/home-content";
import { getAllPosts } from "@/lib/content";

export default async function HomePage() {
  // Both locales so LanguageToggle can swap titles without refresh
  const recentPostsByLocale = {
    "pt-BR": getAllPosts("pt-BR").slice(0, 3),
    en: getAllPosts("en").slice(0, 3),
  };
  return <HomeContent recentPostsByLocale={recentPostsByLocale} />;
}
