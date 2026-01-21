import { INavItem } from "../entities";

export const filterNavItemsByAppList = (appList: string[] | undefined, navItems: INavItem[]): INavItem[] => {
  if (appList == null || !appList.length) return [];

  return navItems.filter(({ path }) => appList.some((app) => path.includes(app)));
};

