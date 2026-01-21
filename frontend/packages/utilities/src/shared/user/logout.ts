import { setSignOutAction, signOut } from "@repo/gui-sdk";
import { confirmLeave, redirectToBase, redirectToExternalLink, registerLeaveCheck } from "../location/redirectToLocation";
import { PATHS } from "../../paths";
import { MicroAppsBases } from "../location";
import { isB2b2cUser } from "./conceptsUsers";

const getUserFlowSourcePath = () => {
  if (isB2b2cUser()) return MicroAppsBases.MWI;
  return MicroAppsBases.BUILDER;
};

export const buildDefaultSignOutAction = () => {
  const sourcePath = getUserFlowSourcePath();
  return () => {
    redirectToExternalLink(`#${PATHS.AUTH.SIGN_IN}?sourcePath=${sourcePath}`, MicroAppsBases.AUTH, true);
  };
};

export const buildManualSignOutAction = () => {
  registerLeaveCheck(null);
  redirectToBase();
};

export const logOut = async () => {
  const ok = await confirmLeave();
  if (!ok) return;

  setSignOutAction(buildManualSignOutAction);

  signOut();
  setSignOutAction(buildDefaultSignOutAction());
};
