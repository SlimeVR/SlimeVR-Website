import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@solidjs/testing-library";
import { FormattedDate } from "./FormattedDate";

describe("FormattedDate", () => {
  const mockDate = new Date("2025-04-03T01:02:03.123Z");

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("formats date using browser locale after mount", async () => {
    const locale = "uk-UA";
    vi.stubGlobal("navigator", { language: locale });

    render(() => <FormattedDate date={mockDate} />);

    const expectedFormattedDate = mockDate.toLocaleDateString(locale);
    expect(await screen.findByText(expectedFormattedDate)).toBeInTheDocument();
  });
});
