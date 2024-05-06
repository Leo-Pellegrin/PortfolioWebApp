<script setup lang="ts">
const colorMode = useColorMode()

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: 'Léo Pellegrin Portfolio',
  description: 'Software Engineer, front end & app developer.',
  ogImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterImage: 'https://landing-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  colorMode.preference = 'dark'
})

</script>

<template>
  <Header />

  <div class="min-h-[calc(100vh-var(--header-height))]">
    <NuxtPage />    
  </div>

  <Footer />
</template>

<style>  
  body{
    background-color: light-dark(#fcf7f4, #121212);
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
  }

  
</style>
