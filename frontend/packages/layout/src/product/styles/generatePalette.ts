import convert from "color-convert";

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

type ShadeKey = (typeof shades)[number];
type Shades = Record<ShadeKey, string>;

const lightnessScale: Record<ShadeKey, number> = {
  50: 98,
  100: 94,
  200: 88,
  300: 78,
  400: 68,
  500: 58,
  600: 48,
  700: 38,
  800: 28,
  900: 18,
} as const;

export function generatePalette(base500: string): Shades {
  const hslColor = convert.hex.hsl(base500);

  const [hue, saturation] = hslColor;

  return shades.reduce((acc, key) => {
    acc[key] = "#" + convert.hsl.hex([hue, saturation, lightnessScale[key]]);
    return acc;
  }, {} as Shades);
}

