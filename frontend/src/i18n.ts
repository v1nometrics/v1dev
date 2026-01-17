import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

export const locales = ["pt-BR", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt-BR";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  };
});
