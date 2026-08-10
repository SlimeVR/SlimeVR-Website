import { MemoryRouter, Route } from "@solidjs/router";
import { render, screen } from "@solidjs/testing-library";
import { describe, it, expect } from "vitest";
import { BlogPostList } from "./BlogPostList";
import { BlogYearGroup } from "../blog.types";

const yearPage: BlogYearGroup[] = [
  {
    year: 2025,
    posts: [
      {
        postId: "Test-Post-Title",
        date: new Date("2025-01-02T03:04:05.123Z"),
        title: "Test Post Title",
        description: "Test Post description",
        thumbnailUrl: "/random/image.webp",
      },
    ],
  },
];

const renderWithRouter = (ui: () => any) =>
  render(() => (
    <MemoryRouter>
      <Route path="*" component={ui} />
    </MemoryRouter>
  ));

describe("BlogPostList", () => {
  it("renders group header and card", () => {
    renderWithRouter(() => <BlogPostList yearPosts={yearPage} />);

    expect(screen.getByText("2025")).toBeInTheDocument();
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });
});
