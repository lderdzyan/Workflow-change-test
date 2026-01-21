import { describe, test, expect } from "@jest/globals";

import { filterNavItemsByAppList } from "../../../src/product/navigations/navigation-bar/filterByAppList";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { INavItem } from "../../../src/product/navigations/entities";

describe("filterNavItemsByAppList", () => {
  const navItems: INavItem[] = [
    { title: "MWI", path: MicroAppsBases.MWI, externalLink: false },
    { title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false },
    { title: "Auth", path: MicroAppsBases.AUTH, externalLink: false },
    { title: "Dashboard", path: MicroAppsBases.DASHBOARD, externalLink: false },
  ];

  test("should return empty array if appList is undefined", () => {
    const result = filterNavItemsByAppList(undefined, navItems);
    expect(result).toEqual([]);
  });

  test("should return empty array if appList is empty", () => {
    const result = filterNavItemsByAppList([], navItems);
    expect(result).toEqual([]);
  });

  test("should filter navItems based on single app match", () => {
    const result = filterNavItemsByAppList([MicroAppsBases.GUIDES], navItems);
    expect(result).toEqual([{ title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false }]);
  });

  test("should filter navItems based on multiple app matches", () => {
    const result = filterNavItemsByAppList([MicroAppsBases.GUIDES, MicroAppsBases.AUTH], navItems);
    const paths = result.map((i) => i.path);

    expect(paths).toEqual([MicroAppsBases.GUIDES, MicroAppsBases.AUTH]);
  });

  test("should return empty array if no path matches any app", () => {
    const result = filterNavItemsByAppList([MicroAppsBases.PAYMENT_TAXAMO], navItems);
    expect(result).toEqual([]);
  });

  test("should allow partial matches if app string is substring of path", () => {
    const result = filterNavItemsByAppList([MicroAppsBases.MWI], navItems);
    expect(result).toEqual([{ title: "MWI", path: MicroAppsBases.MWI, externalLink: false }]);
  });
});
