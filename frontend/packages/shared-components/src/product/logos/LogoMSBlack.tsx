import Image from "next/image";
import { getImageSrc, redirectToBase } from "@repo/utilities";

import { Grid } from "@mui/material";

export enum LogoSize {
  SMALL = "small",
  MEDIUM = "medium",
}

const logoSizeMapping = {
  [LogoSize.SMALL]: { width: 181, height: 24 },
  [LogoSize.MEDIUM]: { width: 209, height: 29 },
};

export function LogoMSBlack({ size }: { size: LogoSize }) {
  const { width, height } = logoSizeMapping[size];
  return (
    <Grid container sx={{ alignItems: "center", cursor: "pointer", width: "fit-content" }} onClick={() => redirectToBase()}>
      <Image src={getImageSrc("logo-ms-black.svg")} priority width={width} height={height} alt="MeaningSphere logo" />
    </Grid>
  );
}

