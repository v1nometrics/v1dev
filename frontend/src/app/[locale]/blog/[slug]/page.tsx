import { setRequestLocale } from "next-intl/server";

export default async function WritingSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Placeholder - will be implemented with MDX
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <article className="max-w-none">
        <h1 className="text-xl font-medium mb-4">Post: {slug}</h1>
        <p className="text-fg-muted">
          Content will be loaded from MDX files.
        </p>
      </article>
    </div>
  );
}
