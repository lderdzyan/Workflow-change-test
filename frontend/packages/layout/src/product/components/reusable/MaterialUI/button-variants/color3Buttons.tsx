import { PaletteOptions } from "@mui/material";

const color3TextButton = (palette: PaletteOptions) => ({
  textTransform: "none",
  padding: "0",
  color: palette.color3[700],
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
    border: `2px solid ${palette.color3[400]}`,
  },
  "&:disabled": {
    color: palette.color3[300],
  },
});

export const color3ButtonVariants = (palette: PaletteOptions) => [
  { props: { variant: "text", size: "large", color: "color3" }, style: { fontSize: "18px", ...color3TextButton(palette) } },
  { props: { variant: "text", size: "medium", color: "color3" }, style: { fontSize: "16px", ...color3TextButton(palette) } },
  { props: { variant: "text", size: "small", color: "color3" }, style: { fontSize: "14px", ...color3TextButton(palette) } },
  { props: { variant: "text", size: "x-small", color: "color3" }, style: { fontSize: "12px", ...color3TextButton(palette) } },
];

