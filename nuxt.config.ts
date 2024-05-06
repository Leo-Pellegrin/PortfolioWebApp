// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    baseURL: '/', 
    buildAssetsDir: 'assets', 
    pageTransition: { name: 'page', mode: 'out-in'}
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'nuxt-icon',
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  ui: {
    icons: ['heroicons', 'simple-icons']
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "first" }],
    configPath: '~/tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  colorMode: {
    preference: 'dark', 
    fallback: 'dark',   
  },
  image:{
    provider: 'ipx',
  }
})