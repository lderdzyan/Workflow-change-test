export const TypographyVariants = {
  h1: {
    fontSize: "48px",
    lineHeight: "64px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "40px",
      lineHeight: "56px",
    },
  },
  h2: {
    fontSize: "40px",
    lineHeight: "56px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "32px",
      lineHeight: "40px",
    },
  },
  h3: {
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  h4: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 700,
    "@media (max-width: 768px)": {
      fontSize: "24px",
      lineHeight: "32px",
    },
  },
  h5: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "22px",
      lineHeight: "30px",
    },
  },
  h6: {
    fontSize: "22px",
    lineHeight: "30px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "20px",
      lineHeight: "24px",
    },
  },
  title: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "18px",
      lineHeight: "24px",
    },
  },
  subtitle1: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "18px",
      lineHeight: "24px",
    },
  },
  subtitle2: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  subtitle3: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  body1: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 400,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "22px",
    },
  },
  body2: {
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: 400,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  caption: {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 400,
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "16px",
    },
  },
  overline: {
    fontSize: "12px",
    lineHeight: "30px",
    fontWeight: 500,
    letterSpacing: "1.44px",
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "30px",
    },
  },
  buttonLarge: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      lineHeight: "24px",
    },
  },
  buttonMedium: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
  buttonSmall: {
    fontSize: "12px",
    lineHeight: "20px",
    fontWeight: 600,
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
  inputLabel: {
    fontSize: "12px",
    lineHeight: "20px",
    fontWeight: 500,
    "@media (max-width: 768px)": {
      fontSize: "12px",
      lineHeight: "20px",
    },
  },
};

export const MuiTypography = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        buttonLarge: "p",
        buttonMedium: "p",
        buttonSmall: "p",
        title: "p",
        subtitle3: "h6",
        inputLabel: "p",
      },
    },
  },
};

