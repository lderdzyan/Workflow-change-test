import { ButtonProps, Components, CSSObject, Palette, PaletteOptions, SimplePaletteColorOptions, Theme } from "@mui/material";
import { color1ButtonVariants } from "./button-variants/color1Buttons";
import { color3ButtonVariants } from "./button-variants/color3Buttons";
import { calcLoaderSize } from "./button-variants/loadingProps";

type ButtonVariant = {
  props: Partial<ButtonProps>;
  style: CSSObject;
};

export const MuiButton = (palette: PaletteOptions): Components<Theme> => ({
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ ownerState, theme }) => {
        return {
          borderRadius: "12px",
          "& .MuiCircularProgress-root": {
            width: calcLoaderSize(ownerState.size as string) + "!important",
            height: calcLoaderSize(ownerState.size as string) + "!important",
            color: (theme.palette[ownerState.color as keyof Palette] as SimplePaletteColorOptions)?.[500],
          },
        };
      },
    },
    variants: [
      {
        props: { variant: "marketing", size: "small" },
        style: {
          fontSize: "14px",
          lineHeight: "16px",
          fontWeight: "700",
          padding: "9px 36px",
          backgroundColor: "transparent",
          color: "#595959",
          border: "1px solid #595959",
          borderRadius: "10px",
          "&:hover": {
            backgroundColor: "#569F93",
            color: palette.white.main,
          },
        },
      },
      ...(color1ButtonVariants(palette) as Array<ButtonVariant>),
      ...(color3ButtonVariants(palette) as Array<ButtonVariant>),
    ],
  },
});

