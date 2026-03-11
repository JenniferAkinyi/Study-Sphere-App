export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    colors: {
      background: {
        light: "#FAF9F6",
        dark: "#0A192F",
      },
      primary: {
        light: "#1E3A8A",
        dark: "#E5E5E5",
      },
      accent: {
        light: "#2563EB",
        dark: "#4F9CF9",
      },
      highlight: {
        light: "#FFDAB9",
        dark: "#FFB085",
      }
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"], 
      brand: ["Poppins", "sans-serif"],              
      mono: ["Fira Code", "monospace"],          
    }
  },
};
export const plugins = [require('@tailwindcss/forms')];