import { findLocationBase } from "@repo/utilities/intranet";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  accessChecker: () => boolean;
  isAuthApp?: boolean;
}

export function AccessCheckWrapper({ children, accessChecker }: IProps) {
  if (!accessChecker()) {
    window.location.href = findLocationBase();
    return null;
  }
  return children;
}
