import { describe, expect, it, vi } from "vitest";
import { getBlogPostThumbnailPlaceholderAttributes } from "./blog.thumbnail.helper";

describe("buildBlogPostThumbnailPlaceholder", () => {
  it("return deterministic set", () => {
    const first = getBlogPostThumbnailPlaceholderAttributes("Weekly Dev Update #222");
    const second = getBlogPostThumbnailPlaceholderAttributes("Weekly Dev Update #222");

    expect(first).toEqual(second);
  });

  it("return different set for different titles", () => {
    const first = getBlogPostThumbnailPlaceholderAttributes("Weekly Dev Update #221");
    const second = getBlogPostThumbnailPlaceholderAttributes("Weekly Dev Update #222");

    expect(first).not.toEqual(second);
  });
});
