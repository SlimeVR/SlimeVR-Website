import { describe, it, expect } from "vitest";
import { render } from "@solidjs/testing-library";
import { Button } from "./Button";
import { Route, Router } from "@solidjs/router";

describe("Button", () => {
  it("renders as button by default", () => {
    render(() => <Button variant="primary">Click me</Button>);

    const button = document.querySelector("button");
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("Click me");
  });

  it("renders as anchor when href is provided", () => {
    render(() => (
      <Router>
        <Route
          path="/"
          component={() => (
            <Button variant="primary" href="/test">
              button-text
            </Button>
          )}
        ></Route>
      </Router>
    ));

    const button =  document.querySelector("a");
    expect(button).toBeTruthy();
    expect(button?.textContent).toBe("button-text");
    expect(button?.getAttribute("href")).toBe("/test");
  });
});
