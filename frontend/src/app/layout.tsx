import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "v1 torres",
    template: "%s — v1 torres",
  },
  description:
    "Tech Lead em Dados, IA e Arquitetura de Software. Machine learning, engenharia de dados, infraestrutura e system design.",
  metadataBase: new URL("https://v1torres.dev"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
