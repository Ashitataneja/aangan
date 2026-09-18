/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        terracotta: '#C17B5A',
        saffron: '#F5A623',
        cream: '#FDF6EC',
        deepgreen: '#2D5016',
        purple: '#6B3FA0',
        gold: '#D4A017',
      },
      fontFamily: {
        sans: ['Inter', 'ui-rounded', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 8px 24px -8px rgba(193, 123, 90, 0.35)',
        glow: '0 0 24px 4px rgba(245, 166, 35, 0.45)',
      },
      borderRadius: {
        blob: '42% 58% 62% 38% / 45% 40% 60% 55%',
      },
    },
  },
  plugins: [],
}
