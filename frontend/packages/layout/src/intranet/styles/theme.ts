import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import { MuiTextField } from "../components/reusable/MaterialUI/inputs";
import { MuiButton } from "../components/reusable/MaterialUI/buttons";

const font = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: 0,
          color: "#4F4F4F",
        },
      },
    },
    ...MuiButton,
    ...MuiTextField,
  },
});

export default theme;
