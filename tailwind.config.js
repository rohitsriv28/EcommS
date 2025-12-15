/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Red: "#AC2F2D",
        White: "#FFFFFF",
        DarkColor: "#222224",
        ExtraDarkColor: "#000000",
      },
      width: {
        140: "35rem",
      },
      height: {
        140: "35rem",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
};
