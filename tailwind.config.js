/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#64ffda',
        navy: 'var(--background)',
        'light-navy': 'var(--light-navy)',
        slate: 'var(--foreground)',
        'light-slate': 'var(--light-slate)',
        'lightest-slate': 'var(--lightest-slate)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
}
