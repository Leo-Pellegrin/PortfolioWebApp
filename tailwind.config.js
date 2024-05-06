/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {     
      gridTemplateColumns: {
        'knowledge-columns': '1fr 2fr',
      },
      colors: {
        'blackcolor': '#121212',
        'current': {
          50: '#fcf7f4',
          100: '#f8ede8',
          200: '#f4ded4',
          300: '#ebc7b6',
          400: '#dba085',
          500: '#cd8666',
          600: '#b86d4a',
          700: '#9a593b',
          800: '#804c34',
          900: '#6b4331',
          950: '#392116'
        }
      }
    }
  },
  plugins: [],
}

