import type { Config } from "tailwindcss";
import animate from "tailwindcss-animated";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

import forms from "@tailwindcss/forms";

export const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,md,mdx,html,json,scss}",
  ],
  theme: {
    screens: {
      mobile: { raw: "not (min-width: 640px)" },
      sm: "640px",
      nmd: { raw: "not (min-width: 932px)" },
      md: "932px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1836px",
    },
    extend: {
      colors: {
        status: {
          success: "rgb(var(--success), <alpha-value>)",
          warning: "rgb(var(--warning), <alpha-value>)",
          critical: "rgb(var(--critical), <alpha-value>)",
          special: "rgb(var(--special), <alpha-value>)",
        },
        background: {
          10: "rgb(var(--background-10), <alpha-value>)",
          20: "rgb(var(--background-20), <alpha-value>)",
          30: "rgb(var(--background-30), <alpha-value>)",
          40: "rgb(var(--background-40), <alpha-value>)",
          50: "rgb(var(--background-50), <alpha-value>)",
          60: "rgb(var(--background-60), <alpha-value>)",
          70: "rgb(var(--background-70), <alpha-value>)",
          80: "rgb(var(--background-80), <alpha-value>)",
          90: "rgb(var(--background-90), <alpha-value>)",
        },
        "accent-background": {
          10: "rgb(var(--accent-background-10), <alpha-value>)",
          20: "rgb(var(--accent-background-20), <alpha-value>)",
          30: "rgb(var(--accent-background-30), <alpha-value>)",
          40: "rgb(var(--accent-background-40), <alpha-value>)",
          50: "rgb(var(--accent-background-50), <alpha-value>)",
          60: "rgb(var(--accent-background-60), <alpha-value>)",
        },
      },
      fontSize: {
        DEFAULT: "calc(var(--font-size-standard) / 16)",
      },
      fontWeight: {
        DEFAULT: "500",
      },
      color: {
        DEFAULT: "rgb(var(--default-color), <alpha-value>)",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      transitionProperty: {
        height: "height",
        carousel: "left scale transform",
        rotation: "rotate",
      },
      keyframes: {
        explode: {
          "0%": {
            "transform-origin": "-100% 50%",
            transform: "scale(0)",
            rotate: "0deg",
            opacity: "1",
          },
          "70%": { transform: "scale(100%)" },
          "100%": { transform: "scale(100%)", rotate: "360deg", opacity: "0" },
        },
        floating: {
          "0%": {
            transform: "translateY(0%)",
          },
          "50%": {
            transform: "translateY(3%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        explode: "explode 6s ease-out",
        floating: "floating 12s cubic-bezier(0.64, 0.57, 0.67, 1.53) infinite",
      },
    },
    data: {
      checked: "checked=true",
    },
  },
  plugins: [
    forms,
    animate,
    typography,
    plugin(function ({ addUtilities }) {
      const textConfig = (fontSize: any, fontWeight: any) => ({
        fontSize,
        fontWeight,
      });
      addUtilities({
        ".text-main-title": textConfig(
          "calc(var(--font-size-title) / 16)",
          700
        ),
        ".text-section-title": textConfig(
          "calc(var(--font-size-section-title) / 16)",
          700
        ),
        ".text-standard": textConfig(
          "calc(var(--font-size-standard) / 16)",
          500
        ),
        ".text-standard-bold": textConfig(
          "calc(var(--font-size-standard) / 16)",
          700
        ),
      });
    }),
    plugin(function ({ addVariant }) {
      addVariant("checked-hover", ["&:hover", "&[data-checked=true]"]);
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};

export default config;
