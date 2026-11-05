"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLocale } from "@/components/providers/locale-provider";

export function Header() {
  const { locale } = useLocale();
  const pathname = usePathname();

  const navItems = [
    { href: "/blog", label: "blog" },
    { href: "/lab", label: "lab" },
    { href: "/refs", label: "refs" },
    { href: "/prompts", label: "prompts" },
    { href: "/readme", label: "readme" },
  ];

  // Build href with locale prefix
  const buildHref = (path: string) => {
    return locale === "pt-BR" ? path : `/en${path}`;
  };

  const isActive = (href: string) => {
    const normalizedPathname = pathname.replace(/^\/(pt-BR|en)/, '') || '/';
    return normalizedPathname.startsWith(href);
  };

  return (
    <header className="border-b border-dotted border-border-default">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={buildHref("/")}
            className="border-none text-fg-primary hover:text-fg-muted transition-colors"
          >
            <span className="text-fg-subtle">›</span>
            <span className="text-sm font-medium">v1</span>
            <span 
              className="text-fg-muted"
              style={{ animation: "blink 1.22s step-end infinite" }}
            >
              _
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <ul className="flex items-center gap-4 text-sm">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={buildHref(item.href)}
                      className={`border-none transition-colors flex items-center gap-0.5 ${
                        active
                          ? "text-fg-primary"
                          : "text-fg-muted hover:text-fg-primary"
                      }`}
                    >
                      <span 
                        className={`text-fg-subtle text-xs transition-all duration-150 ${
                          active ? "w-3 opacity-100" : "w-0 opacity-0"
                        } overflow-hidden`}
                      >
                        ›
                      </span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Controls */}
            <div className="flex items-center gap-2 border-l border-dotted border-border-default pl-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
