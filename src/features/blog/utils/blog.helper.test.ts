import { describe, expect, it } from "vitest";
import { parsePostFrontMatter } from "./blog.helper";

describe("parsePostFrontMatter", () => {
  const PostId = "weekly-update-220";

  it("should parse metadata and content correctly", () => {
    const fileString = `---
title: "Weekly Dev Update #220"
date: "2025-12-06T00:00:00.000Z"
description: 'Hiyo slime gang~! Spazzwan<img src="/blog/emoji/SKC_SpazzwanLogo-1369048981102919742.webp" alt="SKC_SpazzwanLogo" class="discord-emoji" /> here, with a fresh new update... 100% fat free and no...'
---

lorem ipsum`;

    const result = parsePostFrontMatter(PostId, fileString);

    expect(result.metadata).toEqual({
      date: new Date("2025-12-06T00:00:00.000Z"),
      description: "Hiyo slime gang~! Spazzwan<img src=\"/blog/emoji/SKC_SpazzwanLogo-1369048981102919742.webp\" alt=\"SKC_SpazzwanLogo\" class=\"discord-emoji\" /> here, with a fresh new update... 100% fat free and no...",
      postId: PostId,
      thumbnailUrl: undefined,
      title: "Weekly Dev Update #220",
    });
  });

  it("throws when date is missing", () => {
    const fileString = `# Lorem ipsum`;

    expect(() => parsePostFrontMatter(PostId, fileString)).toThrow("Incorrect date");
  });

  it("throws on empty file", () => {
    expect(() => parsePostFrontMatter(PostId, ``)).toThrow("Incorrect date");
  });

  it("handles Windows-style (CRLF) line endings", () => {
    const fileString = "---\r\ntitle: CRLF Test\r\n---\r\n\r\nLorem ipsum";

    expect(() => parsePostFrontMatter(PostId, fileString)).toThrow("Incorrect date");
  });
});
