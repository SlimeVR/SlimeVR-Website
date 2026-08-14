import { describe, expect, it, vi } from "vitest";
import { buildBlogPostThumbnailPlaceholder } from "./blog.thumbnail.helper";

describe("buildBlogPostThumbnailPlaceholder", () => {
  it("return deterministic set", () => {
    const first = buildBlogPostThumbnailPlaceholder("Weekly Dev Update #222");
    const second = buildBlogPostThumbnailPlaceholder("Weekly Dev Update #222");

    expect(first).toEqual(second);
  });

  it("return different set for different titles", () => {
    const first = buildBlogPostThumbnailPlaceholder("Weekly Dev Update #221");
    const second = buildBlogPostThumbnailPlaceholder("Weekly Dev Update #222");

    expect(first).not.toEqual(second);
  });
});
