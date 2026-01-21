import { Components, PaletteOptions, Theme } from "@mui/material";

export const MuiRadio = (palette: PaletteOptions): Components<Theme> => ({
  MuiRadio: {
    defaultProps: {
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        "&.MuiRadio-root": {
          color: palette.color1[500],
        },
        "&:hover": {
          "&.MuiRadio-root": {
            backgroundColor: palette.color1[100],
            color: palette.color1[200],
          },
        },
        "&.Mui-checked": {
          "&.MuiRadio-root": {
            color: palette.color1[500],
          },
        },
        "&:active": {
          "&.MuiRadio-root": {
            color: palette.color1[500],
          },
          "&.Mui-checked": {
            "&.MuiRadio-root": {
              color: palette.color1[500],
            },
          },
        },
        "&.Mui-disabled": {
          "&.MuiRadio-root": {
            color: palette.color1[500],
            opacity: "0.38",
          },
        },
      },
    },
  },
});

