import type { PaletteColor } from "@mui/material/styles/createPalette";
import type { ColorPreset } from "./index";
import { blue, green, indigo, orange, purple } from "./colors";

export const getPrimary = (preset?: ColorPreset): PaletteColor => {
  switch (preset) {
    case "orange":
      return orange;
    case "blue":
      return blue;
    case "green":
      1;
      return green;
    case "indigo":
      return indigo;
    case "purple":
      return purple;
    default:
      console.error(
        'Invalid color preset, accepted values: "blue", "green", "indigo" or "purple"".'
      );
      return blue;
  }
};
