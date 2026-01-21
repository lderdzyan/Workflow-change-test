import { Components, PaletteOptions, Theme } from "@mui/material";

export const MuiSwitch = (palette: PaletteOptions): Components<Theme> => ({
  MuiSwitch: {
    styleOverrides: {
      root: {},
    },
    variants: [
      {
        props: { size: "medium" },
        style: {
          width: 52,
          height: 32,
          padding: 0,
          "&.MuiSwitch-root": {
            overflow: "visible",
            "& .MuiTouchRipple-root": {
              color: palette.color1[700] + "2e",
            },
          },
          "& .MuiSwitch-switchBase": {
            padding: 8,
            margin: "-4px",
            transitionDuration: "300ms",
            "&:hover": {
              backgroundColor: palette.color1[700] + "2e",
            },
            "&:active": {
              margin: "-6.5px",
              "& .MuiSwitch-thumb": {
                width: "28.5px",
                height: "28.5px",
              },
            },
            "&.Mui-checked": {
              transform: "translateX(20px)",
              "&:hover": {
                backgroundColor: palette.color1[700] + "2e",
              },
              "& + .MuiSwitch-track": {
                backgroundColor: palette.color1[400],
                opacity: 1,
                border: 0,
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: palette.white.main,
                "&::before": {
                  backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6.0001 10.78L3.2201 8L2.27344 8.94L6.0001 12.6667L14.0001 4.66667L13.0601 3.72667L6.0001 10.78Z" fill="${palette.color1[600]}"/></svg>`)}')`,
                },
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                backgroundColor: palette.color1[50],
                "&::before": {
                  backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g opacity="0.38"><path d="M6.0001 10.78L3.2201 8L2.27344 8.94L6.0001 12.6667L14.0001 4.66667L13.0601 3.72667L6.0001 10.78Z" fill="${palette.color1[700]}"/></g></svg>`)}')`,
                },
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                border: "0",
                background: palette.color1[700] + "2e",
                opacity: 1,
              },
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              backgroundColor: palette.color1[700] + "2e",
              "&::before": {
                backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g opacity="0.38"><path d="M12.6666 4.27333L11.7266 3.33333L7.99992 7.06L4.27325 3.33333L3.33325 4.27333L7.05992 8L3.33325 11.7267L4.27325 12.6667L7.99992 8.93999L11.7266 12.6667L12.6666 11.7267L8.93992 8L12.6666 4.27333Z" fill="${palette.color1[50]}"/></g></svg>`)}')`,
              },
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              border: `2px solid ${palette.color1[700] + "2e"}`,
              background: palette.color1[50],
              opacity: 1,
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 24,
            height: 24,
            backgroundColor: palette.color1[700],
            boxShadow: "none",
            "&::before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12.6666 4.27333L11.7266 3.33333L7.99992 7.06L4.27325 3.33333L3.33325 4.27333L7.05992 8L3.33325 11.7267L4.27325 12.6667L7.99992 8.93999L11.7266 12.6667L12.6666 11.7267L8.93992 8L12.6666 4.27333Z" fill="${palette.white.main}"/></svg>`)}')`,
            },
          },
          "& .MuiSwitch-track": {
            borderRadius: 32 / 2,
            backgroundColor: palette.color1[50],
            border: `2px solid ${palette.color1[700]}`,
            opacity: 1,
          },
        },
      },
      {
        props: { size: "small" },
        style: {
          width: 40,
          height: 24,
          padding: 0,
          "&.MuiSwitch-root": {
            overflow: "visible",
            "& .MuiTouchRipple-root": {
              color: palette.color1[700] + "2e",
            },
          },
          "& .MuiSwitch-switchBase": {
            padding: 8,
            margin: "-5px",
            transitionDuration: "300ms",
            "&:hover": {
              backgroundColor: palette.color1[700] + "2e",
            },
            "&:active": {
              margin: "-7.4px",
              "& .MuiSwitch-thumb": {
                width: "22.5px",
                height: "22.5px",
              },
            },
            "&.Mui-checked": {
              transform: "translateX(16px)",
              "&:hover": {
                backgroundColor: palette.color1[700] + "2e",
              },
              "& + .MuiSwitch-track": {
                backgroundColor: palette.color1[400],
                opacity: 1,
                border: 0,
              },
              "& .MuiSwitch-thumb": {
                backgroundColor: palette.white.main,
                "&::before": {
                  backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.50008 8.085L2.41508 6L1.70508 6.705L4.50008 9.5L10.5001 3.5L9.79508 2.795L4.50008 8.085Z" fill="${palette.color1[600]}"/></svg>`)}')`,
                },
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                backgroundColor: palette.color1[50],
                "&::before": {
                  backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><g opacity="0.38"><path d="M4.50008 8.085L2.41508 6L1.70508 6.705L4.50008 9.5L10.5001 3.5L9.79508 2.795L4.50008 8.085Z" fill="${palette.color1[700]}"/></g></svg>`)}')`,
                },
              },
              "&.Mui-disabled + .MuiSwitch-track": {
                border: "0",
                background: palette.color1[700] + "2e",
                opacity: 1,
              },
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
              backgroundColor: palette.color1[700] + "2e",
              "&::before": {
                backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><g opacity="0.38"><path d="M9.5 3.205L8.795 2.5L6 5.295L3.205 2.5L2.5 3.205L5.295 6L2.5 8.795L3.205 9.5L6 6.705L8.795 9.5L9.5 8.795L6.705 6L9.5 3.205Z" fill="${palette.white.main}"/></g></svg>`)}')`,
              },
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              border: `2px solid ${palette.color1[700] + "2e"}`,
              background: palette.color1[50],
              opacity: 1,
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 18,
            height: 18,
            backgroundColor: palette.color1[700],
            boxShadow: "none",
            "&::before": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url('data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M12.6666 4.27333L11.7266 3.33333L7.99992 7.06L4.27325 3.33333L3.33325 4.27333L7.05992 8L3.33325 11.7267L4.27325 12.6667L7.99992 8.93999L11.7266 12.6667L12.6666 11.7267L8.93992 8L12.6666 4.27333Z" fill="${palette.white.main}"/></svg>`)}')`,
            },
          },
          "& .MuiSwitch-track": {
            borderRadius: 24 / 2,
            backgroundColor: palette.color1[50],
            border: `2px solid ${palette.color1[700]}`,
            opacity: 1,
          },
        },
      },
    ],
  },
});
