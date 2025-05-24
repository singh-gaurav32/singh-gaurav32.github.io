// src/theme.js
import { createTheme } from "@mantine/core";

export const myTheme = {
  /** Example custom colors */
  colors: {
    brand: [
      "#f0e6ff",
      "#d6bbfc",
      "#bb92f8",
      "#a86bf4",
      "#8a46f0",
      "#6d1df3",
      "#5300e7",
      "#3c00b0",
      "#2a0079",
      "#1b0045",
    ],
  },

  /** Use your custom color as primary */
  primaryColor: "brand",

  /** Customize other theme properties here */
  fontFamily: "Open Sans, sans-serif",
};
