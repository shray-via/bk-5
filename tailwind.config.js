/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        },
        accent: {
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706'
        },
        ink: {
          500: '#1f2937',
          700: '#111827'
        }
      },
    },
  },
  plugins: [],
}
