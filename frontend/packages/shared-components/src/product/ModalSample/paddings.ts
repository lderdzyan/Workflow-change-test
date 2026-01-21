import { useDownTablet } from "../breakpoints";
import { ModalTypes } from "./IframeModal";

export const modalGaps = {
  main: "20px",
  content: "12px",
};

export const actionsGap = modalGaps.content;
export const mainGap = modalGaps.main;
export const contentGap = modalGaps.content;
export const modalPadding = "40px";
export const modalMobilePadding = "20px";

export const dialogOpacity = 0.9;

export const dialogMaxWidth = (down768: boolean) => (down768 ? "100%" : "760px");

export const contentPadding = (type: ModalTypes): string => (type === ModalTypes.complex ? "40px" : "0 40px 40px 40px");

export const contentPaddingMobile = (type: ModalTypes): string => (type === ModalTypes.complex ? "20px" : "0 20px 20px 20px");

export const dialogTitleP = (type: ModalTypes) => {
  const down768 = useDownTablet();
  return down768 ? modalMobilePadding : type === ModalTypes.complex ? `${modalMobilePadding} ${modalPadding}` : `${modalPadding} ${modalPadding} ${modalMobilePadding} ${modalPadding}`;
};

