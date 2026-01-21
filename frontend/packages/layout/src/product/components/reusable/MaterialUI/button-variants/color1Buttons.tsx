import { PaletteOptions } from "@mui/material";

const color1PrimaryButton = (palette: PaletteOptions) => ({
  backgroundColor: palette.color1[600],
  color: palette.white.main,
  "&:hover": {
    backgroundColor: palette.color1[700],
  },
  "&:active": {
    backgroundColor: palette.color1[700],
    boxShadow: `0px 0px 0px 3px ${palette.color1[200]}`,
  },
  "&:disabled": {
    border: "none !important",
    backgroundColor: palette.color1[200],
    color: palette.white.main,
  },
});

const color1SecondaryButton = (palette: PaletteOptions) => ({
  backgroundColor: palette.color1[100],
  color: palette.color1[800],
  "&:hover": {
    backgroundColor: palette.color1[200],
    color: palette.color1[900],
  },
  "&:active": {
    backgroundColor: palette.color1[200],
    color: palette.color1[900],
    boxShadow: `0px 0px 0px 3px ${palette.color1[300]}`,
  },
  "&:disabled": {
    color: palette.color1[400],
    backgroundColor: palette.color1[100],
  },
});

const color1TertiaryButton = (palette: PaletteOptions) => ({
  backgroundColor: "transparent",
  color: palette.color1[800],
  "&:hover": {
    backgroundColor: palette.color1[100],
    color: palette.color1[900],
  },
  "&:active": {
    backgroundColor: palette.color1[100],
    color: palette.color1[900],
    boxShadow: `0px 0px 0px 3px ${palette.color1[300]}`,
  },
  "&:disabled": {
    color: palette.color1[300],
  },
});

const color1TextButton = (palette: PaletteOptions) => ({
  textTransform: "none",
  padding: "0",
  color: palette.color1[700],
  fontWeight: 600,
  lineHeight: "100%",
  minWidth: "unset",
  "&:hover": {
    backgroundColor: "unset",
    textDecoration: "underline",
  },
  "&:active": {
    backgroundColor: "unset",
    borderRadius: "4px",
    padding: "0 4px",
    border: `2px solid ${palette.color1[400]}`,
  },
  "&:disabled": {
    color: palette.color1[300],
  },
});

const baseText = {
  lineHeight: "120%",
  fontWeight: "400",
};

const largeBase = {
  ...baseText,
  fontSize: "18px",
  letterSpacing: "2.7px",
  textIndent: "2.7px",
  padding: "13px 36px",
  "@media (max-width: 768px)": {
    padding: "9px 12px",
  },
};

const mediumBase = {
  ...baseText,
  fontSize: "16px",
  letterSpacing: "2.4px",
  textIndent: "2.4px",
  padding: "10.5px 28px",
  "@media (max-width: 768px)": {
    padding: "6.5px 12px",
  },
};

const smallBase = {
  ...baseText,
  fontSize: "14px",
  letterSpacing: "2.1px",
  textIndent: "2.1px",
  padding: "7.5px 20px",
  "@media (max-width: 768px)": {
    padding: "5.5px 12px",
  },
};

const xSmallBase = {
  ...baseText,
  fontSize: "12px",
  letterSpacing: "1.8px",
  textIndent: "1.8px",
  padding: "7px 16px",
  "@media (max-width: 768px)": {
    padding: "4px 12px",
  },
};

export const color1ButtonVariants = (palette: PaletteOptions) => [
  { props: { variant: "primary", size: "large" }, style: { ...largeBase, ...color1PrimaryButton(palette) } },
  { props: { variant: "secondary", size: "large" }, style: { ...largeBase, ...color1SecondaryButton(palette) } },
  { props: { variant: "tertiary", size: "large" }, style: { ...largeBase, ...color1TertiaryButton(palette) } },
  { props: { variant: "text", size: "large" }, style: { fontSize: "18px", ...color1TextButton(palette) } },

  { props: { variant: "primary", size: "medium" }, style: { ...mediumBase, ...color1PrimaryButton(palette) } },
  { props: { variant: "secondary", size: "medium" }, style: { ...mediumBase, ...color1SecondaryButton(palette) } },
  { props: { variant: "tertiary", size: "medium" }, style: { ...mediumBase, ...color1TertiaryButton(palette) } },
  { props: { variant: "text", size: "medium" }, style: { fontSize: "16px", ...color1TextButton(palette) } },

  { props: { variant: "primary", size: "small" }, style: { ...smallBase, ...color1PrimaryButton(palette) } },
  { props: { variant: "secondary", size: "small" }, style: { ...smallBase, ...color1SecondaryButton(palette) } },
  { props: { variant: "tertiary", size: "small" }, style: { ...smallBase, ...color1TertiaryButton(palette) } },
  { props: { variant: "text", size: "small" }, style: { fontSize: "14px", ...color1TextButton(palette) } },

  { props: { variant: "primary", size: "x-small" }, style: { ...xSmallBase, ...color1PrimaryButton(palette) } },
  { props: { variant: "secondary", size: "x-small" }, style: { ...xSmallBase, ...color1SecondaryButton(palette) } },
  { props: { variant: "tertiary", size: "x-small" }, style: { ...xSmallBase, ...color1TertiaryButton(palette) } },
  { props: { variant: "text", size: "x-small" }, style: { fontSize: "12px", ...color1TextButton(palette) } },
];

