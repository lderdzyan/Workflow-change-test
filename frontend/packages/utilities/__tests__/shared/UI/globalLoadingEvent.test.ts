import { describe, test, expect, beforeEach, jest } from "@jest/globals";

import { renderHook, act } from "@testing-library/react";

import { useLoading, triggerLoading } from "./../../../src/shared/UI/globalLoadingEvent";

describe("useLoading hook", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("should initialize as true if pathname is in pathsWithInitialLoading", () => {
    const { result } = renderHook(() => useLoading("/survey"));
    expect(result.current).toBe(true);
  });

  test("should initialize as false if pathname is not in pathsWithInitialLoading", () => {
    const { result } = renderHook(() => useLoading("/other"));
    expect(result.current).toBe(false);
  });

  test("should update state when triggerLoading is called", () => {
    const { result } = renderHook(() => useLoading("/other"));

    act(() => {
      triggerLoading(true);
    });

    expect(result.current).toBe(true);

    act(() => {
      triggerLoading(false);
    });

    expect(result.current).toBe(false);
  });
});

