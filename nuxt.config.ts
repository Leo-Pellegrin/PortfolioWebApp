// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/tailwindcss'    
    ],
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  tailwindcss:{
    configPath: 'tailwind.config.js',
  },
  css: ['~/assets/css/main.css'],
})