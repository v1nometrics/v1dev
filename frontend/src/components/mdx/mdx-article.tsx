import type { ComponentProps } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/mdx/callout";
import { Compare, Delta, Diagram, Flow } from "@/components/mdx/diagrams";
import type { Locale } from "@/i18n";

const mdxOptions = {
  // Content is author-trusted (local MDX). v6 blocks JS expressions by default;
  // diagrams/callouts use template literals and JSX props that need this.
  blockJS: false,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }] as const,
      [
        rehypePrettyCode,
        { theme: "github-dark", keepBackground: false },
      ] as const,
    ],
  },
};

export function MdxArticle({
  source,
  locale = "pt-BR",
}: {
  source: string;
  locale?: Locale;
}) {
  const mdxComponents = {
    Callout: (props: ComponentProps<typeof Callout>) => (
      <Callout {...props} locale={locale} />
    ),
    Diagram,
    Flow,
    Compare,
    Delta,
  };

  return (
    <div className="mdx-content">
      {/* @ts-expect-error rehype plugin tuples don't narrow perfectly against MDXRemote's generic options type */}
      <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
