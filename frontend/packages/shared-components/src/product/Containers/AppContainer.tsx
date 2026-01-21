import React from "react";

import { useDownTablet } from "../breakpoints";
import { BORDER_RADIUS } from "../borderRadius";

import { useTheme } from "@mui/material/styles";
import { Box, Grid, GridProps } from "@mui/material";
interface AppContainerProps<C extends React.ElementType = "div"> extends Partial<GridProps> {
  component?: C;
  container?: boolean;
  maxWidth?: string;
  children: React.ReactNode;
  sx?: object;
  noBackgroundColor?: boolean;
}

export const AppContainer: React.FC<AppContainerProps> = ({ component, container = false, maxWidth = "1040px", children, sx = {}, noBackgroundColor = false, ...gridProps }) => {
  const theme = useTheme();
  const down768 = useDownTablet();

  const commonStyles = {
    borderRadius: BORDER_RADIUS.large,
    backgroundColor: noBackgroundColor ? "none" : theme.palette.white.main,
    position: "relative" as const,
    maxWidth: down768 ? "100%" : maxWidth,
    padding: down768 ? "20px" : "60px",
    gap: "40px",
  };
  const element: React.ElementType = component || "div";

  if (container) {
    return (
      <Grid container component={element} {...gridProps} sx={[commonStyles, sx]}>
        {children}
      </Grid>
    );
  }

  return (
    <Box
      component={element}
      sx={{
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
        ...commonStyles,
        ...sx,
      }}
      {...gridProps}
    >
      {children}
    </Box>
  );
};

