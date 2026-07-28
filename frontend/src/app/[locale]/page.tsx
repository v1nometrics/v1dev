import { HomeContent } from "@/components/home/home-content";
import type { Locale } from "@/i18n";
import { getAllPosts } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const recentPosts = getAllPosts(locale as Locale).slice(0, 3);
  return <HomeContent recentPosts={recentPosts} />;
}
