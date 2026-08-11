import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        neutral: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          700: "#404040",
          900: "#171717",
        },
        signal: {
          red: "#DC2626",
          amber: "#D97706",
          blue: "#2563EB",
          green: "#16A34A",
          gray: "#6B7280",
        },
      },
      fontSize: {
        "2xl": ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        lg: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "500" }],
        base: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        xs: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }],
      },
      borderRadius: {
        card: "8px",
        button: "6px",
        input: "6px",
        badge: "4px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
        "card-hover": "0 2px 6px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;