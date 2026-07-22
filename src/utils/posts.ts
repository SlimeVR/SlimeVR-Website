import manifest from "~/routes/news/posts/index.json";
import type { Post, PostMetadata } from "~/types/posts";

interface PostModule {
  html: string;
  attributes: PostMetadata;
}

const postModules = import.meta.glob("/src/routes/news/posts/*.md");

export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = manifest.map((entry) => ({
    slug: entry.slug,
    metadata: {
      title: entry.title,
      date: entry.date,
      description: entry.description,
      imageUrl: entry.imageUrl ?? undefined,
    },
  }));

  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  const importer = postModules[`/src/routes/news/posts/${slug}.md`];
  if (!importer) return null;

  const { attributes, html } = (await importer()) as PostModule;

  return {
    slug,
    metadata: attributes,
    html,
  };
}
