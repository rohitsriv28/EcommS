/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        PrimaryColor: "#ffffff",
        SecondaryColor: "#818589",
        DarkColor: "#1e1e1e",
        ExtraDarkColor: "#000000",
      },
      width: {
        140: "35rem",
      },
      height: {
        140: "35rem",
      },
    },
  },
  plugins: [],
};
