import Image from "next/image";
import { getImageSrc, redirectToBase } from "@repo/utilities";
import { Grid } from "@mui/material";

export const Logo = () => {
  return (
    <Grid sx={{ cursor: "pointer", height: "30px", width: "fit-content" }} onClick={() => redirectToBase()}>
      <Image src={getImageSrc("logo_main_colorful.svg")} priority width={214} height={30} alt="MeaningSphere logo" />
    </Grid>
  );
};

