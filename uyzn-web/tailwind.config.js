// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0F2742",
          50:"#E8EEF5",100:"#D1DCEB",200:"#A4BAD7",300:"#7899C3",
          400:"#4B77AF",500:"#2F5E98",600:"#234874",700:"#183251",
          800:"#11253C",900:"#0F2742"
        },
        gold:   "#D4AF37",
        surface:"#FFFFFF",
        bg:     "#F7F9FC",
        success:"#16A34A",
        warning:"#F59E0B",
        error:  "#DC2626",
        text: { primary:"#101828", muted:"#475467" }
      },
      boxShadow: { card: "0 4px 20px rgba(16, 24, 40, 0.06)" },
      borderRadius: { xl2: "1rem" },
    },
  },
  plugins: [],
};
