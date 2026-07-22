export interface Post {
  slug: string;
  metadata: PostMetadata;
  html?: string;
  imageUrl?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
}
