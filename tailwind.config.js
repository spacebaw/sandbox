/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'louisiana-blue': '#003366',
        'louisiana-gold': '#FFB81C',
      },
    },
  },
  plugins: [],
}
