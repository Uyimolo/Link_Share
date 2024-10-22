import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: '#633CFF',
        lightBlue: '#BEADFF',
        lighterBlue: '#D4CAFB',
        veryLightBlue: '#EFEBFF',
        gray: '#737373',
        darkGray: '#333333',
        lighterGray: '#D9D9D9',
        lightestGray: '#FAFAFA',
        white: '#FFFFFF',
        red: '#FF3939',
      },
    },
  },
  plugins: [],
};
export default config;
