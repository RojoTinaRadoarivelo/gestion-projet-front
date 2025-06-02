/** @type {import('tailwindcss').Config} */
import { amber,  transparent,  blue, } from "tailwindcss/colors";
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important:true,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      primary: amber[700],
      amber:{
        50:amber[50],
        100:amber[100],
        200:amber[200],
        400:amber[400],
        500:amber[500],
        700:amber[700],
        900:amber[900]
      },
      accent:{
        50:amber[700],
        100:amber[800]
      },
      secondary:  {
        100:blue[100],
        400:blue[400],
        500:blue[500],
        700:blue[700],
        900:blue[900]
      },
      gray: {
        50: "#aea59b",
        100: "#988d81",
        400: "#70665c",
        500: "#5e564d",
        900: "#413b34",
        950: "#37322c",
      },
      white: "#fdfdfd",
      dark: "#2d2d2d",
      transparent: transparent,
    },
    // fontFamily: {
    //   sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
    //   serif: ['"Source Serif 4"', ...defaultTheme.fontFamily.serif],
    // },
    extend: {
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
      },
       keyframes: {
        "bounce-up": {
          "0%, 100%": {
            transform: "translateY(25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-left": {
          "0%, 100%": {
            transform: "translateX(-25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "bounce-right": {
          "0%, 100%": {
            transform: "translateX(25%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateX(0)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        loadingAnimation: {
          " 0% ": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        "left-bouncing": "bounce-left 1s ease-in-out infinite",
        "right-bouncing": "bounce-right 1s ease-in-out infinite",
        "up-bouncing": "bounce-up 1s ease-in-out infinite",
        "loading-bar": "loadingAnimation 1s ease-in-out infinite",
      },
    },
  },
  plugins: [
     function ({ addBase, theme }) {
      addBase({
        ":root": {
          "--primary": theme("colors.primary"),
          "--amber":theme("colors.amber"),
          "--secondary": theme("colors.secondary"),
          "--white":theme("colors.white"),
          "--dark":theme("colors.dark"),
          "--gray":theme("colors.gray.400"),
        },
      });
    },
  ],
}

