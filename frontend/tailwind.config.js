const { transform } = require('next/dist/build/swc');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "show-modal": "show-modal 100ms linear",
      },
      keyframes: {
        'show-modal': {
          '0%': {
            'transform': 'translateY(50vh)',
          },
          '100%': {
            'transform': 'translateY(0px)',
          },
        }
      }
    },
  },
  plugins: [],
};
