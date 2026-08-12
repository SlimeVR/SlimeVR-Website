export interface BlogYearPaginationManifest {
  year: number;
  pagesCount: number;
  postsCount: number;
}

export interface BlogPaginationManifest {
  pageCountPerYear: BlogYearPaginationManifest[];
  totalPosts: number;
  latestPostYear: number;
  generatedAt: string;
}

export interface BlogPost {
  metadata: BlogPostMetadata;
  content: string;
}

export interface BlogPostMetadata {
  postId: string;
  date: Date;
  title: string;
  description: string;
  thumbnailUrl?: string;
}

export type BlogPostsByYear = Record<number, BlogPostMetadata[]>;

export interface BlogYearGroup {
  year: number;
  posts: BlogPostMetadata[];
}

export interface BlogYearPaginatedGroup {
  year: number;
  pages: { pageNumber: number; posts: BlogPostMetadata[] }[];
}
