export const MuiTextField: { MuiOutlinedInput: object; MuiTextField: object; MuiInputLabel: object; MuiSelect: object; MuiFormControl: object } = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "4px",
        "&: hover": {
          "& input:valid + fieldset": {
            borderColor: "#D5D2D1",
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D5D2D1",
          },
          "&.Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              border: "2px solid #FF445B",
            },
          },
        },
        "&.Mui-focused": {
          ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid #D5D2D1",
          },
        },
        "&.Mui-error": {
          ".MuiOutlinedInput-notchedOutline": {
            border: "2px solid #FF445B",
          },
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "#ACA7A5",
        "&.Mui-focused": {
          color: "#ACA7A5",
          fontWeight: "700",
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        label: {
          "&.MuiFormLabel-filled": {
            fontWeight: "700",
          },
        },
      },
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: {
        "&: hover": {
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "#D5D2D1",
          },
        },
        input: {
          color: "#5E6062",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
        },
        "& .MuiOutlinedInput-input": {
          padding: "8.5px 12px !important",
        },
        label: {
          "&.MuiFormLabel-filled": {
            fontWeight: "700",
            color: "#F94D4D",
          },
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      autoComplete: "off",
    },
    styleOverrides: {
      root: {
        input: {
          color: "#5E6062",
          padding: "8.5px 12px",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "23px",
          borderColor: "#D5D2D1",
        },
        label: {
          color: "#ACA7A5",
          top: "-6px",
          "&.Mui-focused": {
            color: "#ACA7A5",
            fontWeight: "700",
            top: "0",
          },
          "&.MuiFormLabel-filled": {
            color: "#ACA7A5",
            fontWeight: "700",
            top: "0",
          },
          "&.Mui-error": {
            color: "#ACA7A5",
            "&.Mui-focused": {
              color: "#FF445B",
            },
            "&.MuiFormLabel-filled": {
              color: "#FF445B",
            },
          },
        },
      },
    },
  },
};

