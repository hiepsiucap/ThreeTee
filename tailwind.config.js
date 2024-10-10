/**
 * @format
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#12372A",
        primary2: "#F9F7F1",
        blackadmin: "#1C1C1C",
      },
      backgroundImage: {
        "my-image":
          "url('https://res.cloudinary.com/dhhuv7n0h/image/upload/v1714202688/div.background_h76wu5.png')",
      },
      fontSize: {
        admin: "15px", // Define the text-admin size
      },
    },
  },
  plugins: [],
};
