export const MuiTextField: { MuiOutlinedInput: object; MuiTextField: object; MuiInputLabel: object; MuiSelect: object; MuiFormControl: object; MuiInputBase: object } = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: "8px",
        ".MuiOutlinedInput-notchedOutline": {
          border: "1px solid #C9D4DE",
        },
        "&.Mui-focused .MuiOutlinedInput-input": {
          color: "#11171D",
        },
        "& .MuiInputBase-input": {
          color: "#607D8B",
        },
        "&.Mui-disabled": {
          "& .MuiOutlinedInput-notchedOutline": {
            border: "1px solid #90A4AE !important",
            opacity: "0.3",
          },
          "& .MuiInputBase-input": {
            color: "#90A4AE",
            WebkitTextFillColor: "#90A4AE",
          },
          "&.Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              border: "1px solid #FF5630 !important",
            },
          },
        },
        "&: hover": {
          "& input:valid + fieldset": {
            borderColor: "#3E5265",
          },
          ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid #3E5265",
          },
          "&.Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              border: "1px solid #FF5630",
            },
          },
        },
        "&.Mui-focused": {
          ".MuiOutlinedInput-notchedOutline": {
            border: "2px solid #1C252E",
          },
        },
        "&.Mui-error": {
          ".MuiOutlinedInput-notchedOutline": {
            border: "1px solid #FF5630",
          },
        },
      },
    },
  },
  MuiInputBase: {
    "& .MuiInputBase-root": {
      color: "#607D8B",
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        "&.Mui-disabled": {
          color: "#90A4AE",
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
            borderColor: "#3E5265",
          },
        },
        input: {
          color: "#5E6062",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "24px",
        },
        "& .MuiOutlinedInput-input": {
          padding: "16px !important",
        },
        label: {
          "&.MuiFormLabel-filled": {
            fontWeight: "700",
            color: "#F94D4D",
            "&.Mui-disabled": {
              color: "#93A8BD",
            },
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
        "&: hover": {
          "&.MuiTextField-root label": {
            color: "#37474F",
            "&.Mui-disabled": {
              color: "#93A8BD",
            },
          },
          "&.MuiTextField-root input": {
            // NEED REMOVE ?
            color: "#37474F",
          },
        },
        input: {
          color: "#607D8B",
          padding: "16px !important",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "23px",
          borderColor: "#C9D4DE",
        },
        label: {
          color: "#607D8B",
          top: "0px",
          "&.Mui-focused": {
            color: "#11171D",
            fontWeight: "400",
            top: "0",
            "&.MuiFormLabel-filled": {
              color: "#11171D",
              fontWeight: "400",
              top: "0",
            },
          },
          "&.MuiFormLabel-filled": {
            color: "#607D8B",
            fontWeight: "400",
            top: "0",
            "&.Mui-disabled": {
              color: "#93A8BD",
            },
          },
          "&.Mui-error": {
            color: "#5E6062",
            "&.Mui-focused": {
              color: "#FF5630",
            },
            "&.MuiFormLabel-filled": {
              color: "#FF5630",
            },
          },
        },
      },
    },
  },
};

