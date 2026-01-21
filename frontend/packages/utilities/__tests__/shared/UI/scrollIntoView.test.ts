import { describe, test, expect, beforeEach, jest } from "@jest/globals";

import { scrollIntoView, scrollTo } from "../../../src/shared/UI/scrollIntoView";

describe("scroll functions", () => {
  let mockElement: HTMLElement;

  beforeEach(() => {
    mockElement = document.createElement("div");
    mockElement.getBoundingClientRect = jest.fn<() => DOMRect>(() => ({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 100,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON: () => ({}),
    }));

    document.getElementById = jest.fn((id) => (id === "test" ? mockElement : null));
    window.scrollTo = jest.fn();
    mockElement.scrollIntoView = jest.fn();
  });

  test("calls scrollIntoView on the element", () => {
    scrollIntoView("test");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "smooth" });
  });

  test("calls window.scrollTo with calculated offset", () => {
    scrollTo("test", 50);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: window.scrollY + 100 + 50, behavior: "smooth" });
  });

  test("does nothing if element not found", () => {
    scrollIntoView("notfound");
    scrollTo("notfound", 0);
    expect(mockElement.scrollIntoView).not.toHaveBeenCalled();
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});

