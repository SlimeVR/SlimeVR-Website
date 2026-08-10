import { MemoryRouter, Route } from "@solidjs/router";
import { fireEvent, render, screen } from "@solidjs/testing-library";
import { describe, it, expect, afterAll } from "vitest";
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

  it("display replace skeleton with image, once image is loaded", () => {
    const { container } = renderWithRouter(() => (
      <BlogPostList yearPosts={yearPage} />
    ));
    expect(screen.queryByTestId("image-skeleton")).toBeInTheDocument();
    const img = container.querySelector("img") as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img?.className).toContain("opacity-0");

    fireEvent.load(img);

    expect(screen.queryByTestId("image-skeleton")).toBeNull();
    expect(img?.className).toContain("opacity-100");
  });
});
