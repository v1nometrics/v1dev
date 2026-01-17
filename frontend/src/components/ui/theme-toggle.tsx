"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("common.theme");

  useEffect(() => {
    // Necessary for hydration - standard pattern with next-themes
    // See: https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  if (!mounted) {
    return (
      <button
        className="h-7 w-7 text-sm text-fg-muted"
        aria-label="Toggle theme"
      />
    );
  }

  const label =
    theme === "system" ? t("system") : theme === "dark" ? t("dark") : t("light");
  const icon = theme === "system" ? "◐" : theme === "dark" ? "●" : "○";

  return (
    <button
      onClick={cycleTheme}
      className="flex h-7 w-7 items-center justify-center text-sm text-fg-muted hover:text-fg-primary transition-colors"
      aria-label={`Theme: ${label}`}
      title={label}
    >
      {icon}
    </button>
  );
}
