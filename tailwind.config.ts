import type { Config } from "tailwindcss";
import plugin from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "500px",
      },
      colors: {
        blue: "#633CFF",
        lightBlue: "#BEADFF",
        lighterBlue: "#D4CAFB",
        veryLightBlue: "#EFEBFF",
        gray: "#737373",
        darkGray: "#333333",
        lighterGray: "#E0E0E0",
        lightestGray: "#F1f1f1",
        white: "#FFFFFF",
        red: "#FF3939",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    // @ts-expect-error
    plugin(({ addComponents, theme }) => {
      addComponents({
        ".scrollbar-custom": {
          scrollbarWidth: "2px",
          "&::-webkit-scrollbar": {
            width: "2px", // Adjust the width as needed
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: theme("colors.blue.500"),
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: theme("colors.gray.300"),
          },
        },
      });
    }),
    require("tailwindcss-animate"),
  ],
  // variants: {
  //   scrollbar: ['rounded'], // This adds rounded scrollbar support.
  // },
};
export default config;
