import React from "react";

import { BORDER_RADIUS } from "../borderRadius";

import { useTheme } from "@mui/material/styles";
import { Box, Grid, GridProps } from "@mui/material";

interface AppCardProps<C extends React.ElementType = "div"> extends Partial<GridProps> {
  component?: C;
  container?: boolean;
  maxWidth?: string;
  children: React.ReactNode;
  sx?: object;
  noBackgroundColor?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({ component, container = false, maxWidth = "1040px", children, sx = {}, noBackgroundColor = false, ...gridProps }) => {
  const theme = useTheme();

  const commonStyles = {
    borderRadius: BORDER_RADIUS.large,
    backgroundColor: noBackgroundColor ? "none" : theme.palette.white.main,
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

