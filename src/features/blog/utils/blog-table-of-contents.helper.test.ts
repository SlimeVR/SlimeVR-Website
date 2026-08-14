import { cleanup, render, screen } from "@solidjs/testing-library";
import { describe, vi, it, expect, afterEach, beforeEach } from "vitest";
import { extractBlogHeadings } from "./blog-table-of-contents.helper";

describe("extractBlogHeadings", () => {
  it("Extract 1-3 level headings", () => {
    const markdownString = `
# Title

## First Section

### Subsection
`;

    const result = extractBlogHeadings(markdownString);

    expect(result).toEqual([
      { id: "title", level: 1, text: "Title" },
      { id: "first-section", level: 2, text: "First Section" },
      { id: "subsection", level: 3, text: "Subsection" },
    ]);
  });

  it("Ignore 4-6 level headings", () => {
    const markdownString = `
#### Level 4 Heading

#### Level 5 Heading

#### Level 6 Heading
`;

    const result = extractBlogHeadings(markdownString);

    expect(result).toEqual([]);
  });

  it("Skip empty headings", () => {
    const markdownString = `
##

## Tada
`;

    const result = extractBlogHeadings(markdownString);

    expect(result).toEqual([{ id: "tada", level: 2, text: "Tada" }]);
  });
});
