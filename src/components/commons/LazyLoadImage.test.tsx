import {
  describe,
  it,
  vi,
  expect,
  afterAll,
} from "vitest";
import { render, fireEvent } from "@solidjs/testing-library";
import { LazyLoadImage } from "./LazyLoadImage";

const getSkeleton = (container: HTMLElement) =>
  container.querySelector(".animate-pulse");

const mockImageState = (isComplete: boolean, isNaturalWidth: number) => {
  vi.spyOn(HTMLImageElement.prototype, "complete", "get").mockReturnValue(
    isComplete
  );
  vi.spyOn(HTMLImageElement.prototype, "naturalWidth", "get").mockReturnValue(
    isNaturalWidth
  );
};

afterAll(() => {
  vi.restoreAllMocks();
});

describe("LazyLoadImage", () => {
  it("when loading image show skeleton", async () => {
    mockImageState(false, 0);

    const { container } = render(() => (
      <LazyLoadImage src="potato.png" imageClasses="h-48" />
    ));
    const image = container.querySelector("img")!;

    expect(getSkeleton(container)).toBeTruthy();
    expect(image?.className).toContain("opacity-0");
  });

  it("when loaded image hide skeleton and show image", async () => {
    mockImageState(false, 0);
    const { container } = render(() => (
      <LazyLoadImage src="potato.png" imageClasses="h-48" />
    ));
    const image = container.querySelector("img")!;
    expect(getSkeleton(container)).toBeTruthy();
    expect(image?.className).toContain("opacity-0");

    fireEvent.load(image);

    expect(getSkeleton(container)).toBeNull();
    expect(image?.className).toContain("opacity-100");
  });

  it("when image cached before dehydration show image", async () => {
    mockImageState(true, 300);

    const { container } = render(() => (
      <LazyLoadImage src="potato.png" />
    ));
    const image = container.querySelector("img")!;

    expect(getSkeleton(container)).toBeNull();
    expect(image?.className).toContain("opacity-100");
  });

  it("when image failed to load show error text", async () => {
    mockImageState(false, 0);
    const { container, getByTestId } = render(() => (
      <LazyLoadImage src="potato.png" />
    ));
    const image = container.querySelector("img")!;

    fireEvent.error(image);

    expect(getSkeleton(container)).toBeNull();
    const imageFailure = getByTestId("image-failure");
    expect(imageFailure.innerText).toBe("Failed To Load Image");
    expect(image?.className).toContain("opacity-0");
  });

  it("when provided image classes should apply them", () => {
    mockImageState(false, 0);
    let imageRef: HTMLImageElement | undefined;
    const onLoad = vi.fn();

    const { container } = render(() => (
      <LazyLoadImage
        src="potato.png"
        containerClasses="h-42"
        imageClasses="object-cover"
        ref={(element) => (imageRef = element)}
        onLoad={onLoad}
      />
    ));

    expect(container.firstElementChild?.className).toContain("h-42");
    const image = container.querySelector("img")!;
    expect(imageRef).toBe(image);
    expect(image.className).toContain("object-cover");
  });
});
