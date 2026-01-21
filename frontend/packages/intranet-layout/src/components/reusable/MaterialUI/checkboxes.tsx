export const MuiCheckbox: { MuiCheckbox: object } = {
  MuiCheckbox: {
    styleOverrides: {
      root: {
        "&.MuiCheckbox-root": {
          color: "#90A4AE",
        },
        "&:active": {
          "&.MuiCheckbox-root": {
            color: "#7635DC",
          },
          "& .MuiTouchRipple-root": {
            color: "#E5DFE8",
          },
          "&.Mui-checked": {
            "&.MuiCheckbox-root": {
              color: "#7635DC",
            },
          },
        },
        "&.Mui-checked": {
          "&.MuiCheckbox-root": {
            color: "#7635DC",
          },
        },
        "&.Mui-disabled": {
          "&.MuiCheckbox-root": {
            color: "#C9B6DB",
            opacity: "0.38",
          },
        },
      },
    },
  },
};

