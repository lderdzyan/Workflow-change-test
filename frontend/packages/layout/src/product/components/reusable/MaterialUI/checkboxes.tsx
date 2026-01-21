import { Components, PaletteOptions, Theme } from "@mui/material";

export const MuiCheckbox = (palette: PaletteOptions): Components<Theme> => ({
  MuiCheckbox: {
    defaultProps: {
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        padding: "11px",
        "&.MuiCheckbox-root": {
          color: palette.color1[500],
        },
        "&:hover": {
          "&.MuiCheckbox-root": {
            color: palette.color1[500],
            backgroundColor: palette.color1[100],
          },
          "&.Mui-checked": {
            "&.MuiCheckbox-root": {
              color: palette.color1[500],
            },
          },
        },
        "&:active": {
          "&.MuiCheckbox-root": {
            color: palette.color1[500],
          },
          "&.Mui-checked": {
            "&.MuiCheckbox-root": {
              color: palette.color1[500],
            },
          },
        },
        "&.Mui-checked": {
          "&.MuiCheckbox-root": {
            color: palette.color1[500],
          },
        },
        "&.Mui-disabled": {
          "&.MuiCheckbox-root": {
            color: palette.color1[500],
            opacity: "0.38",
          },
        },
      },
    },
  },
});
