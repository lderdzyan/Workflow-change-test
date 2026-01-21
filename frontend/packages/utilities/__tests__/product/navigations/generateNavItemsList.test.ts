import { describe, test, expect } from "@jest/globals";

import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { generateNavItemsList, NAV_ITEMS } from "./../../../src/product/navigations/generateNavItemsList";

describe("generateNavItemsList", () => {
  const { INDICATOR, MWI } = MicroAppsBases;

  test("returns '/' when current app and no suffix", () => {
    const list = generateNavItemsList(INDICATOR);
    const target = NAV_ITEMS.find((i) => i.base === INDICATOR);

    const item = list.find((i) => i.title === target?.title);
    expect(item?.path).toBe("/");
    expect(item?.externalLink).toBe(false);
    expect(item?.highlightedPath).toBe(INDICATOR);
  });

  test("returns suffix when current app and suffix provided", () => {
    const list = generateNavItemsList(MWI);
    const target = NAV_ITEMS.find((i) => i.base === MWI);

    const item = list.find((i) => i.title === target?.title);
    expect(item?.path).toBe(target?.suffix);
    expect(item?.externalLink).toBe(false);
    expect(item?.highlightedPath).toBe(MWI);
  });

  test("returns base#suffix when not current app and suffix provided", () => {
    const list = generateNavItemsList(INDICATOR);
    const target = NAV_ITEMS.find((i) => i.base === MWI);

    const item = list.find((i) => i.title === target?.title);
    expect(item?.path).toBe(`${MWI}#${target?.suffix}`);
    expect(item?.externalLink).toBe(true);
    expect(item?.highlightedPath).toBeUndefined();
  });

  test("returns base when not current app and no suffix", () => {
    const list = generateNavItemsList(INDICATOR);
    const target = NAV_ITEMS.find((i) => i.base === MicroAppsBases.MIRROR_REFLECTIONS);

    const item = list.find((i) => i.title === target?.title);
    expect(item?.path).toBe(target?.base);
    expect(item?.externalLink).toBe(true);
    expect(item?.highlightedPath).toBeUndefined();
  });
});

