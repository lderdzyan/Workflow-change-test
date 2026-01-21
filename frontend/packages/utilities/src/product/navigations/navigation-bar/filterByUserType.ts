import { UserType } from "@repo/gui-sdk";
import { MicroAppsBases } from "../../../shared/location";
import { INavItem } from "../entities";

const BLOCKED_IF_MISSING: Partial<Record<UserType, MicroAppsBases[]>> = {
  [UserType.MS_GUIDE]: [MicroAppsBases.GUIDES],
};

export const filterNavItemsByUserType = (userTypes: UserType[], navItems: INavItem[]): INavItem[] => {
  const missingRoles = Object.keys(BLOCKED_IF_MISSING)
    .map((role) => role as UserType)
    .filter((role) => !userTypes.includes(role));

  const blockedPathsSet = new Set(missingRoles.flatMap((role) => BLOCKED_IF_MISSING[role] ?? []));
  const blockedPaths = [...blockedPathsSet];

  return navItems.filter(({ path }) => !blockedPaths.some((base) => path.startsWith(base)));
};
