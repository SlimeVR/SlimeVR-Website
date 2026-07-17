// adapted from https://github.com/JovannMC/jovann.me/blob/main/src/lib/utils/posts.ts
export interface Post {
  slug: string;
  metadata: PostMetadata;
  html?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
}

export interface PostModule {
  html: string;
  attributes: PostMetadata;
}

const postModules = import.meta.glob("/src/posts/*.md");
const getSlug = (path: string) =>
  path.split("/").pop()?.replace(".md", "") ?? "";

export async function getPosts() {
  const posts: Post[] = [];

  for (const path in postModules) {
    // direct imports of the files handled by vite-plugin-markdown
    const mod = (await postModules[path]()) as PostModule;
    const slug = getSlug(path);
    const metadata = mod.attributes as PostMetadata;

    posts.push({ slug, metadata });
  }

  // latest posts first
  return posts.sort((a, b) => {
    const dateA = new Date(a.metadata.date);
    const dateB = new Date(b.metadata.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPost(slug: string): Promise<Post | null> {
  const importer = postModules[`/src/posts/${slug}.md`];
  if (!importer) return null;

  const { attributes, html } = (await importer()) as PostModule;

  return {
    slug,
    metadata: attributes,
    html,
  };
}
