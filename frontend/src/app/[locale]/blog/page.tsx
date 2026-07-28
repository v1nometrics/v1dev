import { BlogContent } from "@/components/blog/blog-content";
import { getAllNotes, getAllPosts } from "@/lib/content";

export default function WritingPage() {
  const articles = getAllPosts();
  const notes = getAllNotes();

  return <BlogContent articles={articles} notes={notes} />;
}
