import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import { useDownTablet } from "./breakpoints";
import { AppTheme } from "../theme";
import { BORDER_RADIUS } from "./borderRadius";

interface Props {
  children: ReactNode;
  maxWidth: string;
  backgroundImagePath?: string;
  backgroundPosition?: string;
}

export function CardContainer({ children, maxWidth, backgroundImagePath, backgroundPosition }: Props): ReactNode {
  const down768 = useDownTablet();
  const theme = useTheme() as AppTheme;

  return (
    <Box
      sx={{
        p: down768 ? "20px" : "60px",
        width: "100%",
        maxWidth: maxWidth,
        backgroundImage: backgroundImagePath ? `url(${backgroundImagePath})` : null,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: backgroundPosition,
        position: "relative",
        backgroundColor: theme.palette.white.main,
        borderRadius: BORDER_RADIUS.large,
      }}
    >
      {children}
    </Box>
  );
}

