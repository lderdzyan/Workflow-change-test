const primaryButton = {
  backgroundColor: "#8867E0",
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#5C2ED5",
  },
  "&:active": {
    backgroundColor: "#5C2ED5",
    boxShadow: "0px 0px 0px 3px #D5CAF4",
  },
  "&:disabled": {
    border: "none !important",
    backgroundColor: "#DED3FC",
  },
};

const secondaryButton = {
  backgroundColor: "#FFFFFF",
  color: "#8867E0",
  border: "2px solid #8867E0",
  "&:hover": {
    backgroundColor: "#F4EFFF",
    color: "#5C2ED5",
    border: "2px solid #5C2ED5",
  },
  "&:disabled": {
    color: "#DED3FC",
    border: "2px solid #DED3FC",
  },
  "&:active": {
    backgroundColor: "#FFFFFF",
    border: "2px solid #5C2ED5",
    color: "#5C2ED5",
    boxShadow: "0px 0px 0px 3px #D5CAF4",
  },
};

export const MuiButton: { MuiButton: object } = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: "32px",
        textTransform: "none",
      },
    },
    variants: [
      {
        props: { color: "primary", size: "large" },
        style: {
          fontSize: "18px",
          lineHeight: "22px",
          fontWeight: "600",
          padding: "13px 36px",
          ...primaryButton,
        },
      },
      {
        props: { color: "secondary", size: "large" },
        style: {
          fontSize: "18px",
          lineHeight: "22px",
          fontWeight: "600",
          padding: "11px 34px",
          ...secondaryButton,
        },
      },
      {
        props: { color: "primary", size: "medium" },
        style: {
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: "600",
          padding: "10.5px 28px",
          ...primaryButton,
        },
      },
      {
        props: { color: "secondary", size: "medium" },
        style: {
          fontSize: "16px",
          lineHeight: "19px",
          fontWeight: "600",
          padding: "8.5px 26px",
          ...secondaryButton,
        },
      },
      {
        props: { color: "primary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "17px",
          fontWeight: "600",
          padding: "7.5px 16px",
          ...primaryButton,
        },
      },
      {
        props: { color: "secondary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "17px",
          fontWeight: "600",
          padding: "5.5px 16px",
          ...secondaryButton,
        },
      },
    ],
  },
};

