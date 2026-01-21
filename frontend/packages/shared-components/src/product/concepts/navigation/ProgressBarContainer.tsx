import { Grid, GridProps, styled } from "@mui/material";

export const ProgressBarContainer: React.ComponentType<GridProps> = styled(Grid)({
  height: "12px",
  gap: "4px",
  flexWrap: "nowrap",
});

