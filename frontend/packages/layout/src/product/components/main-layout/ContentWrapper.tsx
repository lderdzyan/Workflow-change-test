import { ReactNode } from "react";
import { AppContentWrapper } from "@repo/shared-components/product";

import { SxProps, Theme } from "@mui/material";

export function ContentWrapper({ children, backgroundComponent, sx = {} }: { children: ReactNode; backgroundComponent?: ReactNode; sx?: SxProps<Theme> }) {
  return (
    <>
      <AppContentWrapper
        container
        flexDirection={"column"}
        alignItems={"center"}
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "inherit",
          ...sx,
        }}
      >
        {children}
      </AppContentWrapper>
      {Boolean(backgroundComponent) && backgroundComponent}
    </>
  );
}

const getContainerPaddings = (downMobile: boolean, downTablet: boolean): string => {
  if (downMobile) return "0 12px 12px";
  else if (downTablet) return "0 32px 18px";
  return "0 60px 60px";
};

