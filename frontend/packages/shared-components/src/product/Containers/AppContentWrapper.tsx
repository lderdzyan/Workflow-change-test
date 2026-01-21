import { styled, Grid, GridProps } from "@mui/material";
import { downTabletQuery } from "../breakpoints";

export const AppContentWrapper: React.ComponentType<GridProps> = styled(Grid)({
  flexDirection: "column",
  padding: "60px",
  gap: "40px",

  [`@media ${downTabletQuery}`]: {
    padding: "20px",
  },
});

