import Rand from "rand-seed";
import { BLOG_POST_THUMBNAIL_IMAGES } from "./post-placeholder-thumbnail-images";

export interface BlogPostThumbnailPlaceholder {
  accentColor: string;
  thumbnailPictureUrl: string;
}

const pickRandom = <T>(arr: readonly T[], rand: Rand): T =>
  arr[Math.floor(rand.next() * arr.length)];

const ACCENT_COLORS = [
  "#386641",
  "#6a994e",
  "#2ec4b6",
  "#a0c4ff",
  "#bdb2ff",
] as const;

export function buildBlogPostThumbnailPlaceholder(
  title: string
): BlogPostThumbnailPlaceholder {
  const rand = new Rand(title);

  const accentColor = pickRandom(ACCENT_COLORS, rand);
  const thumbnailPictureUrl = pickRandom(BLOG_POST_THUMBNAIL_IMAGES, rand);

  return { accentColor, thumbnailPictureUrl };
}
