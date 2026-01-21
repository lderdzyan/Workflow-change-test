import { createTheme } from "@mui/material";
import { Inter } from "next/font/google";
import { MuiTextField } from "../components/reusable/MaterialUI/inputs";
import { MuiButton } from "../components/reusable/MaterialUI/buttons";
import MuiPalette from "./pallete";
import { TypographyVariants } from "../components/reusable/MaterialUI/typographies";
import { MuiSwitch } from "../components/reusable/MaterialUI/switches";
import { MuiCheckbox } from "../components/reusable/MaterialUI/checkboxes";
import { MuiSnackbarContent } from "../components/reusable/MaterialUI/snackbar";

const font = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const theme = createTheme({
  palette: MuiPalette,
  typography: {
    fontFamily: font.style.fontFamily,
    ...TypographyVariants,
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
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#90A4AE",
          "&.Mui-checked": {
            color: "#7635DC",
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    ...MuiButton,
    ...MuiTextField,
    ...MuiSwitch,
    ...MuiCheckbox,
    ...MuiSnackbarContent,
  },
});

export default theme;

declare module "@mui/material/styles" {
  interface PaletteColorOptions {
    main?: string;
    light?: string;
    dark?: string;
    contrastText?: string;
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  }

  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    950?: string;
  }

  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
    info: PaletteColor;
    success: PaletteColor;
    warning: PaletteColor;
    error: PaletteColor;
    greyscale: PaletteColor;
    white: PaletteColor;
  }

  interface PaletteOptions {
    primary?: PaletteColorOptions;
    secondary?: PaletteColorOptions;
    info?: PaletteColorOptions;
    success?: PaletteColorOptions;
    warning?: PaletteColorOptions;
    error?: PaletteColorOptions;
    greyscale?: PaletteColorOptions;
    white?: PaletteColorOptions;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    buttonLarge: true;
    buttonMedium: true;
    buttonSmall: true;
    title: true;
    subtitle3: true;
    inputLabel: true;
  }
}

