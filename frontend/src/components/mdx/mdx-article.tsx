import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Callout } from "@/components/mdx/callout";

const mdxComponents = { Callout };

const mdxOptions = {
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

export function MdxArticle({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      {/* @ts-expect-error rehype plugin tuples don't narrow perfectly against MDXRemote's generic options type */}
      <MDXRemote source={source} components={mdxComponents} options={mdxOptions} />
    </div>
  );
}
