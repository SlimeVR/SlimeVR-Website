import { cleanup, render, screen } from "@solidjs/testing-library";
import { describe, vi, it, expect, afterEach, beforeEach } from "vitest";
import { BlogPostTableOfContents } from "./BlogPostTableOfContents";
import { BlogHeading } from "../utils/blog-table-of-contents.helper";

const createIntersectionObserver = (
  target: Element,
  isIntersecting: boolean
): IntersectionObserverEntry =>
  ({
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 1 : 0,
    boundingClientRect: target.getBoundingClientRect(),
    intersectionRect: target.getBoundingClientRect(),
    rootBounds: null,
    time: Date.now(),
  }) as IntersectionObserverEntry;

const mockHeadings: BlogHeading[] = [
  { id: "title", level: 1, text: "Title" },
  { id: "sub-heading", level: 2, text: "sub-heading" },
  { id: "third-heading", level: 3, text: "third-heading" },
];

describe("BlogPostTableOfContents", () => {
  let observerCallback: IntersectionObserverCallback;
  let observerSpy: ReturnType<typeof vi.fn>;
  let disconnectSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observerSpy = vi.fn();
    disconnectSpy = vi.fn();

    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation((callback: IntersectionObserverCallback) => {
        observerCallback = callback;
        return {
          observe: observerSpy,
          unobserve: vi.fn(),
          disconnect: disconnectSpy,
          takeRecords: () => [],
        };
      })
    );
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  const renderComponent = (targetHeadings = mockHeadings) =>
    render(() => (
      <>
        <h1 id="title" />
        <h1 id="sub-heading" />
        <h1 id="third-heading" />
        <BlogPostTableOfContents headings={targetHeadings} />
      </>
    ));

  it("renders navigation when headings provided", () => {
    renderComponent();

    expect(screen.getByRole("link", { name: "Title" })).toHaveAttribute(
      "href",
      "#title"
    );
    expect(screen.getByRole("link", { name: "sub-heading" })).toHaveAttribute(
      "href",
      "#sub-heading"
    );
  });

  it("not render navigation when no headings provided", () => {
    renderComponent([]);

    expect(
      screen.queryByRole("navigation", { name: "On this page" })
    ).not.toBeInTheDocument();
  });

  it("highlight active heading", () => {
    const { container } = renderComponent();
    const subSection = container.querySelector("#sub-heading")!;

    observerCallback(
      [createIntersectionObserver(subSection, true)],
      {} as IntersectionObserver
    );

    expect(screen.getByRole("link", {name: "sub-heading"})).toHaveClass("font-semibold");
  });
});
