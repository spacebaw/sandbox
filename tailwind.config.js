/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#040F49',         // Industrial Executive Navy (Primary)
        'teal': '#00BFA6',         // Industrial Executive Teal (Accent)
        'slate': '#0A2F30',        // Industrial Executive Slate (Background)
        'primary': '#040F49',
        'accent': '#00BFA6',
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'industrial': '0 4px 12px rgba(4, 15, 73, 0.15)',
        'industrial-lg': '0 10px 30px rgba(4, 15, 73, 0.25)',
      },
      animation: {
        'tighten': 'tighten 1.2s ease-out forwards',
      },
      keyframes: {
        tighten: {
          '0%': {
            opacity: '0',
            letterSpacing: '0.1em',
          },
          '100%': {
            opacity: '1',
            letterSpacing: '-0.02em',
          },
        },
      },
    },
  },
  plugins: [],
}
