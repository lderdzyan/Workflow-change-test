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

  type CustomPaletteColor = Partial<SimplePaletteColorOptions>;
  type CustomColors = "color1" | "color2" | "color3" | "color4" | "color5" | "color6" | "color7" | "color8" | "color9" | "charcoal" | "canary" | "periwinkle" | "orange" | "lucky" | "pink" | "sky";

  interface Palette extends Record<CustomColors, CustomPaletteColor> {}
  interface PaletteOptions extends Record<CustomColors, CustomPaletteColor> {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    tertiary: true;
  }
  interface ButtonPropsSizeOverrides {
    "x-small": true;
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
  }
}

