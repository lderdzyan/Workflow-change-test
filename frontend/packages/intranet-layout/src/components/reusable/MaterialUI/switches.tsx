export const MuiSwitch: { MuiSwitch: object } = {
  MuiSwitch: {
    variants: [
      {
        props: { size: "small" },
        style: {
          height: 20,
          width: 36,
          padding: 0,
          "&.MuiSwitch-root": {
            overflow: "visible",
            "& .MuiTouchRipple-root": {
              color: "#90A4AE",
            },
          },
          "& .MuiSwitch-switchBase": {
            padding: 8,
            margin: "-5px",
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(16px)",
              "& + .MuiSwitch-track": {
                backgroundColor: "#7635DC",
                opacity: 1,
                border: 0,
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                border: "0",
                background: "rgba(91, 36, 168, 0.18)",
                opacity: 1,
              },
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              border: "none",
              background: "#CFD8DC",
              opacity: 1,
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 14,
            height: 14,
            backgroundColor: "#ffffff",
            boxShadow: "none",
          },
          "& .MuiSwitch-track": {
            borderRadius: 12,
            backgroundColor: "#90A4AE",
            border: "none",
            opacity: 1,
          },
        },
      },
    ],
  },
};

