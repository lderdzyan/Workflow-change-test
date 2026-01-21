import { downTabletQuery } from "../breakpoints";
import { SxProps, Theme } from "@mui/material";

type OverrideLayoutContainerProps = (isSpecialPage: boolean, isIframePage: boolean) => SxProps<Theme>;
export const overrideLayoutContainerProps: OverrideLayoutContainerProps = (isSpecialPage, isIframePage) => {
  if (isSpecialPage || isIframePage) {
    return {
      padding: "0",
      [`@media ${downTabletQuery}`]: {
        padding: "0",
      },
    };
  }
  return {};
};

