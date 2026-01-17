import { setRequestLocale } from "next-intl/server";
import Link from "next/link";

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
      <Link
        href={`/${locale}/lab`}
        className="text-sm text-fg-muted hover:text-fg-primary mb-8 inline-block border-none"
      >
        ← lab
      </Link>

      <article>
        <h1 className="text-xl font-medium mb-4">{slug}</h1>
        <p className="text-fg-muted">
          {locale === "pt-BR"
            ? "Conteúdo será carregado dos arquivos MDX."
            : "Content will be loaded from MDX files."}
        </p>
      </article>
    </div>
  );
}
