import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss';

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
        lighterGray: '#E0E0E0', 
        lightestGray: '#F5F5F5', 
        white: '#FFFFFF',
        red: '#FF3939',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    // @ts-expect-error
    plugin(({ addComponents, theme }) => {
      addComponents({
        '.scrollbar-custom': {
          scrollbarWidth: '2px',
          '&::-webkit-scrollbar': {
            width: '2px', // Adjust the width as needed
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.blue.500'),
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: theme('colors.gray.300'),
          },
        },
      });
    }),
  ],
  // variants: {
  //   scrollbar: ['rounded'], // This adds rounded scrollbar support.
  // },
};
export default config;
