import { MicroAppsBases } from "../../shared/location/microAppsBases";
import { INavItem } from "./entities";

export const NAV_ITEMS: Array<{
  title: string;
  base: MicroAppsBases;
  suffix?: string;
}> = [
  { title: "Worklife Fulfillment Indicator", base: MicroAppsBases.INDICATOR },
  { title: "Worklife Fulfillment Builder", base: MicroAppsBases.BUILDER },
  { title: "Inventory Reports", base: MicroAppsBases.MWI, suffix: "/surveys" },
  { title: "Mirror Reflections", base: MicroAppsBases.MIRROR_REFLECTIONS },
  { title: "Discussions", base: MicroAppsBases.GUIDES, suffix: "/discussions" },
];

export const generateNavItemsList = (currentAppBase: MicroAppsBases): INavItem[] =>
  NAV_ITEMS.map(({ title, base, suffix }) => {
    const isCurrentApp = base === currentAppBase;

    return {
      title,
      path: genNavItemPath(isCurrentApp, base, suffix),
      externalLink: !isCurrentApp,
      highlightedPath: isCurrentApp ? base : undefined,
    };
  });

const genNavItemPath = (isCurrentApp: boolean, base: MicroAppsBases, suffix?: string): string => {
  if (isCurrentApp) return suffix ?? "/";
  return `${base}${suffix ? "#" + suffix : ""}`;
};

