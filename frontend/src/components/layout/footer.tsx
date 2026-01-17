"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dotted border-border-default mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-fg-muted sm:flex-row">
          <p>{t("copyright", { year })}</p>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/v1-torres/v1torres.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="border-none hover:text-fg-primary transition-colors"
            >
              {t("source")}
            </Link>
            <span className="text-border-default">·</span>
            <Link
              href="/rss.xml"
              className="border-none hover:text-fg-primary transition-colors"
            >
              {t("rss")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
