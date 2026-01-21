import { Source_Sans_3, Frank_Ruhl_Libre } from "next/font/google";

import { TypographyVariants, MuiTypography } from "../components/reusable/MaterialUI/typographies";
import { MuiCheckbox } from "../components/reusable/MaterialUI/checkboxes";
import { MuiRadio } from "../components/reusable/MaterialUI/radioButtons";
import { MuiTextField } from "../components/reusable/MaterialUI/inputs";
import { MuiSwitch } from "../components/reusable/MaterialUI/switches";
import { MuiButton } from "../components/reusable/MaterialUI/buttons";
import { MuiChip } from "../components/reusable/MaterialUI/chips";
import { BaseColors } from "@repo/utilities";
import { MuiPalette } from "./palette";

import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const sourceSans = Source_Sans_3({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const buildTheme = (baseColors?: BaseColors) => {
  const palette = MuiPalette(baseColors);

  return extendTheme({
    cssVarPrefix: "app",
    colorSchemes: {
      light: {
        palette: palette,
      },
    },
    typography: {
      fontFamily: sourceSans.style.fontFamily,
      ...TypographyVariants(frankRuhl.style.fontFamily),
    },
    components: {
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            padding: 0,
            color: palette.white.main,
          },
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: palette.color1[100],
          },
        },
      },
      ...MuiButton(palette),
      ...MuiTextField(palette),
      ...MuiChip,
      ...MuiTypography,
      ...MuiCheckbox(palette),
      ...MuiRadio(palette),
      ...MuiSwitch(palette),
    },
  });
};

declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
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
  }

  // type CustomPaletteColor = Partial<SimplePaletteColorOptions>;
  // type CustomColors =
  //   | "color1"
  //   | "color2"
  //   | "color3"
  //   | "color4"
  //   | "color5"
  //   | "color6"
  //   | "color7"
  //   | "color8"
  //   | "color9"
  //   | "charcoal"
  //   | "canary"
  //   | "periwinkle"
  //   | "orange"
  //   | "lucky"
  //   | "pink"
  //   | "sky"
  //   | "white";

  interface Palette extends Record<CustomColors, CustomPaletteColor> {}
  interface PaletteOptions extends Record<CustomColors, CustomPaletteColor> {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
    marketing: true;
  }

  interface ButtonPropsColorOverrides {
    color3: true;
  }

  interface ButtonPropsSizeOverrides {
    "x-small": true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsSizeOverrides {
    large: true;
  }

  interface ChipPropsVariantOverrides {
    default: true;
    endIcon: true;
    startIcon: true;
    bothIcons: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    label1: true;
    label2: true;
    label3: true;
    label4: true;
    singleLine1: true;
    singleLine2: true;
    singleLine3: true;
    singleLine4: true;
    multiLine1: true;
    multiLine2: true;
    multiLine3: true;
    multiLine4: true;
    link1: true;
    link2: true;
    link3: true;
    link4: true;
    display1: true;
    display2: true;
    display3: true;
  }
}

export type AppTheme = ReturnType<typeof import("./theme").buildTheme>;

