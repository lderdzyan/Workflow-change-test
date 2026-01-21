import { getCurrentPerson } from "./user";
import { clear } from "../cache";

let signOutAction: (() => void) | null = null;

export const setSignOutAction = (action: (() => void) | null) => {
  signOutAction = action;
};

const triggerSignOutAction = () => {
  if (signOutAction) {
    signOutAction();
  }
};

// TODO: need to send sign out request
export const resetPerson = () => {
  clear();
  getCurrentPerson();
};

export const signOut = () => {
  resetPerson();
  triggerSignOutAction();
};

