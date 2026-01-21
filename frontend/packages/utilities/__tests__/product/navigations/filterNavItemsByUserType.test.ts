import { describe, test, expect } from "@jest/globals";

import { filterNavItemsByUserType } from "../../../src/product/navigations/navigation-bar/filterByUserType";
import { MicroAppsBases } from "../../../src/shared/location/microAppsBases";
import { INavItem } from "../../../src/product/navigations/entities";
import { UserType } from "@repo/gui-sdk";

describe("filterNavItemsByUserType", () => {
  const navItems: INavItem[] = [
    { title: "MWI", path: MicroAppsBases.MWI, externalLink: false },
    { title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false },
    { title: "Auth", path: MicroAppsBases.AUTH, externalLink: false },
    { title: "Dashboard", path: MicroAppsBases.DASHBOARD, externalLink: false },
  ];

  test("should block GUIDES if user does not include MS_GUIDE role", () => {
    const result = filterNavItemsByUserType([UserType.MS_USER], navItems);
    const paths = result.map((i) => i.path);

    expect(paths).not.toContain(MicroAppsBases.GUIDES);
    expect(paths).toContain(MicroAppsBases.MWI);
    expect(paths).toContain(MicroAppsBases.AUTH);
  });

  test("should allow GUIDES if user includes MS_GUIDE role", () => {
    const result = filterNavItemsByUserType([UserType.MS_GUIDE], navItems);
    const paths = result.map((i) => i.path);

    expect(paths).toContain(MicroAppsBases.GUIDES);
  });

  test("should not block unrelated paths when MS_GUIDE role is missing", () => {
    const result = filterNavItemsByUserType([UserType.MS_USER], navItems);
    const paths = result.map((i) => i.path);

    expect(paths).toContain(MicroAppsBases.MWI);
    expect(paths).toContain(MicroAppsBases.AUTH);
    expect(paths).toContain(MicroAppsBases.DASHBOARD);
  });

  test("should return empty list if all items are blocked", () => {
    const onlyGuides = [{ title: "Guides", path: MicroAppsBases.GUIDES, externalLink: false }];
    const result = filterNavItemsByUserType([UserType.MS_USER], onlyGuides);

    expect(result).toEqual([]);
  });
});
