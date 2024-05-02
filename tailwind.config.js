/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [ 
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
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
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      gridTemplateColumns: {
        'knowledge-columns': '1fr 2fr',
      },
      colors: {
        'bgcolor': '#1A191D',
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

