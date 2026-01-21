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
    subtitle3: true
  }
}
