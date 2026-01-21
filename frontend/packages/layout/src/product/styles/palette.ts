import { PaletteOptions } from "@mui/material";
import { generatePalette } from "./generatePalette";
import { BaseColors } from "@repo/utilities";

const defaultBaseColors: Required<BaseColors> = {
  color1: "#8679AF", // Mulberry
  color2: "#E57342", // Orange
  color3: "#94979E", // Gunmetal Grey
  color4: "#FF586A", // Red
  color5: "#BD9B6B", // Pearl
  color6: "#6DA7BB", // Pool Blue
  color7: "#E3BC45", // Flax
  color8: "#78B0A7", // Almost Evergreen
  color9: "#B375A7", // Mauve
};

export const MuiPalette = (baseColors?: BaseColors): PaletteOptions => {
  const colors = { ...defaultBaseColors, ...baseColors };

  const generatedPalettes = generateAllPalettes(colors);

  return {
    primary: {
      main: generatedPalettes.color1[500],
      light: "#ffffff",
    },
    text: {
      primary: generatedPalettes.color3[900],
    },
    white: { main: "#ffffff" },
    ...generatedPalettes,
    charcoal: { main: "#1D1D1B" },
    canary: { main: "#FFF341" },
    periwinkle: { main: "#BF96E2" },
    orange: { main: "#FF931E" },
    lucky: { main: "#62C962" },
    pink: { main: "#F386BC" },
    sky: { main: "#79CFD3" },
  };
};

const generateAllPalettes = (colors: BaseColors): Record<keyof BaseColors, ReturnType<typeof generatePalette>> => {
  return Object.fromEntries(Object.entries(colors).map(([key, value]) => [key, generatePalette(value)])) as Record<keyof BaseColors, ReturnType<typeof generatePalette>>;
};

