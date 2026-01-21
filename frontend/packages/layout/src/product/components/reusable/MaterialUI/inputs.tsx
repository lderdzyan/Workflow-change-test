import { Components, PaletteOptions, Theme } from "@mui/material";

const shrunkLabelStyle = {
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "1.8px",
  textTransform: "uppercase",
};

export const MuiTextField = (palette: PaletteOptions): Components<Theme> => ({
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: palette.white.main,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "12px",
        ".MuiOutlinedInput-notchedOutline": {
          border: `1px solid ${palette.color3[400]}`,
        },
        "& .MuiInputBase-input::placeholder": {
          color: palette.color3[500],
          opacity: 1,
        },
        "&.Mui-focused .MuiOutlinedInput-input": {
          color: palette.color3[700],
        },
        "& .MuiInputBase-input": {
          color: palette.color3[700],
        },
        "&.Mui-focused.Mui-error": {
          ".MuiOutlinedInput-notchedOutline": {
            border: `3px solid ${palette.color4[300]} !important`,
          },
        },
        "&.Mui-disabled": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${palette.color3[300]} !important`,
          },
          "& .MuiInputBase-input": {
            color: palette.color3[300],
            WebkitTextFillColor: palette.color3[300],
          },
        },
        "&:hover": {
          "& input:valid + fieldset": {
            borderColor: palette.color3[700],
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${palette.color3[700]}`,
          },
          "&.Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              border: `1px solid ${palette.color4[500]}`,
            },
          },
        },
        "&.Mui-focused": {
          ".MuiOutlinedInput-notchedOutline": {
            border: `3px solid ${palette.color1[300]} !important`,
          },
        },
        "&.Mui-error": {
          ".MuiOutlinedInput-notchedOutline": {
            border: `1px solid ${palette.color4[500]}`,
          },
        },
        "& .MuiOutlinedInput-notchedOutline legend > span": {
          ...shrunkLabelStyle,
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: palette.color3[500],
        transformOrigin: "left top",
        transform: "translate(14px, 14px)",
        "&.Mui-focused": {
          color: palette.color1[400],
        },
        "&.MuiInputLabel-shrink": {
          transform: "translate(14px, -8px)",
          ...shrunkLabelStyle,
        },
        "&.Mui-error": {
          color: palette.color3[500],
          "&.Mui-focused": {
            color: palette.color4[500],
          },
          "&.MuiFormLabel-filled": {
            color: palette.color4[500],
          },
        },
        "&.MuiInputLabel-sizeSmall": {
          transform: "translate(14px, 5px)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -8px)",
          },
        },
      },
    },
  },
  MuiFormControl: {},
  MuiTextField: {
    defaultProps: {
      autoComplete: "off",
    },
    styleOverrides: {
      root: {
        "&:hover": {
          "&.MuiTextField-root input": {
            color: palette.color3[700],
          },
        },
        input: {
          color: palette.color3[700],
          padding: "16px",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "100%",
          borderColor: palette.color3[700],
          height: "16px",
        },
      },
    },
    variants: [
      {
        props: { size: "small" },
        style: {
          input: {
            padding: "8px 12px",
          },
        },
      },
    ],
  },
  MuiSelect: {
    styleOverrides: {
      icon: {
        color: palette.color3[700],
      },
      select: {
        padding: "16px",
        lineHeight: "100%",
        minHeight: 0,
      },
      root: {
        "&:hover": {
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: palette.color3[700],
          },
        },
        input: {
          color: palette.color3[700],
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "100%",
          height: "16px",
        },
        "&.MuiInputBase-sizeSmall .MuiSelect-select": {
          padding: "8px 12px",
        },
      },
    },
  },
});

