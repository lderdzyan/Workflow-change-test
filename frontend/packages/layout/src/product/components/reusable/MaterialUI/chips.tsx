const largeLabel = {
  fontSize: "16px",
  lineHeight: "16px",
  padding: "6px",
  gap: "8px",
};

const mediumLabel = {
  fontSize: "14px",
  lineHeight: "14px",
  padding: "4px",
  gap: "4px",
};

const smallLable = {
  fontSize: "12px",
  lineHeight: "12px",
  padding: "2px",
  gap: "2px",
};

export const MuiChip: { MuiChip: object } = {
  MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: "600",
        alignItems: "center",
        ".MuiChip-label": {
          padding: "0",
        },
      },
      icon: {
        margin: "0",
      },
      deleteIcon: {
        margin: "0",
      },
    },
    variants: [
      {
        props: { variant: "default", size: "large" },
        style: {
          ...largeLabel,
          padding: "8px 12px",
        },
      },
      {
        props: { variant: "endIcon", size: "large" },
        style: {
          ...largeLabel,
          paddingLeft: "12px",
        },
      },
      {
        props: { variant: "startIcon", size: "large" },
        style: {
          ...largeLabel,
          paddingRight: "12px",
        },
      },
      {
        props: { variant: "bothIcons", size: "large" },
        style: {
          ...largeLabel,
          paddingRight: "6px",
          paddingLeft: "8px",
        },
      },
      {
        props: { variant: "default", size: "medium" },
        style: {
          ...mediumLabel,
          padding: "6px 12px",
        },
      },
      {
        props: { variant: "endIcon", size: "medium" },
        style: {
          ...mediumLabel,
          paddingLeft: "10px",
          paddingRight: "3px",
        },
      },
      {
        props: { variant: "startIcon", size: "medium" },
        style: {
          ...mediumLabel,
          paddingRight: "12px",
          paddingLeft: "8px",
        },
      },
      {
        props: { variant: "bothIcons", size: "medium" },
        style: {
          ...mediumLabel,
          paddingRight: "3px",
          paddingLeft: "6px",
        },
      },
      {
        props: { variant: "default", size: "small" },
        style: {
          ...smallLable,
          padding: "4.5px 12px",
        },
      },
      {
        props: { variant: "endIcon", size: "small" },
        style: {
          ...smallLable,
          paddingLeft: "6px",
        },
      },
      {
        props: { variant: "startIcon", size: "small" },
        style: {
          ...smallLable,
          paddingRight: "8px",
        },
      },
      {
        props: { variant: "bothIcons", size: "small" },
        style: {
          ...smallLable,
        },
      },
    ],
  },
};

