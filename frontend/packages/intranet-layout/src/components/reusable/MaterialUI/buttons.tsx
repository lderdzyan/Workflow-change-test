const primaryButton = {
  backgroundColor: "#1C252E",
  color: "#FFFFFF",
  border: `2px solid #1C252E`,
  "&:hover": {
    border: `2px solid #3E5265`,
    backgroundColor: "#3E5265",
  },
  "&:active": {
    backgroundColor: "#1C252E",
    border: `2px solid #93A8BD`,
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const secondaryButton = {
  backgroundColor: "#7635DC",
  color: "#FFFFFF",
  border: `2px solid #7635DC`,
  "&:hover": {
    border: `2px solid #915EE3`,
    backgroundColor: "#915EE3",
  },
  "&:active": {
    backgroundColor: "#7635DC",
    border: `2px solid #C7ACF1`,
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const warningButton = {
  backgroundColor: "#FFAB00",
  color: "#FFFFFF",
  border: `2px solid #FFAB00`,
  "&:hover": {
    border: `2px solid #FFBB33`,
    backgroundColor: "#FFBB33",
  },
  "&:active": {
    backgroundColor: "#FFAB00",
    border: `2px solid #FFDD99`,
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const errorButton = {
  backgroundColor: "#FF5630",
  color: "#FFFFFF",
  border: `2px solid #FF5630`,
  "&:hover": {
    border: `2px solid #FF7A5C`,
    backgroundColor: "#FF7A5C",
  },
  "&:active": {
    backgroundColor: "#FF5630",
    border: `2px solid #FFBCAD`,
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const successButton = {
  backgroundColor: "#22C55E",
  color: "#FFFFFF",
  border: `2px solid #22C55E`,
  "&:hover": {
    border: `2px solid #40DE7A`,
    backgroundColor: "#40DE7A",
  },
  "&:active": {
    backgroundColor: "#22C55E",
    border: `2px solid #9FEFBC`,
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const primaryButtonOutlined = {
  color: "#1C252E",
  border: "1px solid #1C252E",
  "&:hover": {
    border: `1px solid #3E5265`,
    color: "#3E5265",
  },
};

const secondaryButtonOutlined = {
  color: "#7635DC",
  border: "1px solid #7635DC",
  "&:hover": {
    border: `1px solid #915EE3`,
    color: "#915EE3",
  },
};

const errorButtonOutlined = {
  color: "#FF5630",
  border: "1px solid #FF5630",
  "&:hover": {
    border: `1px solid #FF7A5C`,
    color: "#FF7A5C",
  },
  "&:disabled": {
    border: "2px solid #1C252E",
    color: "rgba(252, 252, 253, 0.6)",
    backgroundColor: "#1C252E",
    opacity: "0.3",
  },
};

const successButtonOutlined = {
  color: "#22C55E",
  border: "1px solid #22C55E",
  "&:hover": {
    border: `1px solid #40DE7A`,
    color: "#40DE7A",
  },
};

export const MuiButton: { MuiButton: object } = {
  MuiButton: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        textTransform: "none",
        boxShadow: "none !important",
        borderRadius: "8px",
      },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "14px 22px",
          ...primaryButton,
        },
      },
      {
        props: { variant: "contained", color: "primary", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "10px 18px",
          ...primaryButton,
        },
      },
      {
        props: { variant: "contained", color: "primary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "6px 14px",
          ...primaryButton,
        },
      },
      {
        props: { variant: "contained", color: "secondary", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "14px 22px",
          ...secondaryButton,
        },
      },
      {
        props: { variant: "contained", color: "secondary", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "10px 18px",
          ...secondaryButton,
        },
      },
      {
        props: { variant: "contained", color: "secondary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "6px 14px",
          ...secondaryButton,
        },
      },
      {
        props: { variant: "contained", color: "warning", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "14px 22px",
          ...warningButton,
        },
      },
      {
        props: { variant: "contained", color: "warning", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "10px 18px",
          ...warningButton,
        },
      },
      {
        props: { variant: "contained", color: "secondary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "6px 14px",
          ...warningButton,
        },
      },
      {
        props: { variant: "contained", color: "error", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "14px 22px",
          ...errorButton,
        },
      },
      {
        props: { variant: "contained", color: "error", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "10px 18px",
          ...errorButton,
        },
      },
      {
        props: { variant: "contained", color: "error", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "6px 14px",
          ...errorButton,
        },
      },
      {
        props: { variant: "contained", color: "success", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "14px 22px",
          ...successButton,
        },
      },
      {
        props: { variant: "contained", color: "success", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "10px 18px",
          ...successButton,
        },
      },
      {
        props: { variant: "contained", color: "success", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "6px 14px",
          ...successButton,
        },
      },
      //OUTLINED
      {
        props: { variant: "outlined", color: "primary", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "15px 23px",
          ...primaryButtonOutlined,
          "&:active": {
            color: "#1C252E",
            border: "2px solid #C9D4DE",
            padding: "14px 22px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "14px 22px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "primary", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "11px 19px",
          ...primaryButtonOutlined,
          "&:active": {
            color: "#1C252E",
            border: "2px solid #C9D4DE",
            padding: "10px 18px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "10px 18px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "primary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "7px 15px",
          ...primaryButtonOutlined,
          "&:active": {
            color: "#1C252E",
            border: "2px solid #C9D4DE",
            padding: "6px 14px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "6px 14px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "secondary", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "15px 23px",
          ...secondaryButtonOutlined,
          "&:active": {
            color: "#7635DC",
            border: "2px solid #E4D8F8",
            padding: "14px 22px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "14px 22px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "secondary", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "11px 19px",
          ...secondaryButtonOutlined,
          "&:active": {
            color: "#7635DC",
            border: "2px solid #E4D8F8",
            padding: "10px 18px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "10px 18px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "secondary", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "7px 15px",
          ...secondaryButtonOutlined,
          "&:active": {
            color: "#7635DC",
            border: "2px solid #E4D8F8",
            padding: "6px 14px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "6px 14px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "error", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "15px 23px",
          ...errorButtonOutlined,
          "&:active": {
            color: "#FF5630",
            border: "2px solid #FFDED6",
            padding: "14px 22px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "14px 22px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "error", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "11px 19px",
          ...errorButtonOutlined,
          "&:active": {
            color: "#FF5630",
            border: "2px solid #FFDED6",
            padding: "10px 18px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "10px 18px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "error", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "7px 15px",
          ...errorButtonOutlined,
          "&:active": {
            color: "#FF5630",
            border: "2px solid #FFDED6",
            padding: "6px 14px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "6px 14px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "success", size: "large" },
        style: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "15px 23px",
          ...successButtonOutlined,
          "&:active": {
            color: "#22C55E",
            border: "2px solid #CFF7DE",
            padding: "14px 22px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "14px 22px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "success", size: "medium" },
        style: {
          fontSize: "14px",
          lineHeight: "24px",
          fontWeight: "600",
          padding: "11px 19px",
          ...successButtonOutlined,
          "&:active": {
            color: "#22C55E",
            border: "2px solid #CFF7DE",
            padding: "10px 18px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "10px 18px",
          },
        },
      },
      {
        props: { variant: "outlined", color: "success", size: "small" },
        style: {
          fontSize: "12px",
          lineHeight: "20px",
          fontWeight: "600",
          padding: "7px 15px",
          ...successButtonOutlined,
          "&:active": {
            color: "#22C55E",
            border: "2px solid #CFF7DE",
            padding: "6px 14px",
          },
          "&:disabled": {
            border: "2px solid #1C252E",
            color: "#1C252E",
            opacity: "0.3",
            padding: "6px 14px",
          },
        },
      },
    ],
  },
};

