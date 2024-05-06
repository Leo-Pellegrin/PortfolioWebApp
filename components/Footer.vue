<script setup lang="ts">
const colorMode = useColorMode()

const isDarkTheme = ref(true)
const isMobile = ref(false)

onMounted(() => {  
  if(window){
    if (window.innerWidth < 768) isMobile.value = true
  }
})

function changeTheme(theme: string) {
  if(theme === 'dark'){
    colorMode.preference = 'dark'
    isDarkTheme.value = true
  } else {
    console.log('light')
    colorMode.preference = 'light'
    console.log('light')
    isDarkTheme.value = false
  }
}

// Watcher to update isMobile when window width changes
watchEffect(() => {
  if(window){{
    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 768
    })
  }}

  // Cleanup function
  return () => {
    window.removeEventListener('resize', () => {
      isMobile.value = window.innerWidth < 768
    })
  }
})

</script>

<script setup lang="ts">
</script>

<template>
  <UDivider class="w-full mb-5" size="md" />
  <footer id="contact" class="animate-on-scroll mb-10 bg-current-50 dark:bg-blackcolor ">
    <!-- Cols Available -->
    <div class="flex justify-center pr-20 xs:grid xs:mx-auto xs:pr-0 sm:grid md:flex">
      <div class="text-xl text-black dark:text-white font-extrabold text-center">
        <div class="ml-4 xs:ml-0 text-primary-500">
          <span>Available for freelance opportunities</span>
        </div>  
        <UDivider class="w-full py-3" />      
        <div class="text-xl text-black dark:text-white font-bold text-center ml-4 xs:mx-2 sm:mx-2 md:ml-4">
          <span>Have an exciting project you need help with?</span>
        </div>
        <div class="text-xl text-primary-500 font-bold text-center ml-4 xs:mx-2 sm:mx-2 md:ml-4">
          <span>Let's talk!</span>
        </div>
      </div>
      <!-- Divider -->
      <UDivider v-if="isMobile" class="h-full xs:w-full xs:h-5 sm:h-5 sm:w-full  md:h-24 md:ml-5 md:w-10 xs:mt-2 bgdividergray" size="sm" />    
      <UDivider v-else orientation="vertical" class="h-full xs:w-full xs:h-5 sm:h-5 sm:w-full  md:h-24 md:ml-5 md:w-10 xs:mt-2 bgdividergray" size="sm" />    
      
      <!-- Cols Contact -->
      <div class="mt-4 xs:mb-4 sm:mb-4 md:mb-0">
        <div class=" text-center">
          <span class="text-xl font-extrabold text-primary">Contact</span>
        </div>
        <div class="flex justify-center flex-wrap">          
          <div class="mt-2 mx-2">            
            <ULink to="mailto:leo.pellegrin87@gmail.com">                         
              <Icon name="material-symbols:mail" color="indigo-600" size="1.5em" />
            </ULink>
          </div> 
          <div class="mt-2 mx-2">
            <ULink to="https://linkedin.com/in/pellegrin-léo-9873b122b" class="flex justify-center">
              <Icon name="bxl:linkedin" color="indigo-600" size="1.5em" />
            </ULink>
          </div> 
          <div class="mt-2 mx-2">            
            <ULink to="https://github.com/Leo-Pellegrin">
              <Icon name="bxl:github" size="1.5em" />
            </ULink>
          </div>
          <div class="mt-2 mx-2">            
            <ULink to="https://m.me/leo.pellegrin.1">
              <Icon name="bxl:messenger" size="1.5em" />
            </ULink>
          </div>
          <div class="mt-2 mx-2">            
            <ULink to="https://www.instagram.com/leo_pellegrin/">
              <Icon name="mdi:instagram" size="1.5em" />
            </ULink>
          </div>             
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-10">
      <UButton v-if="isDarkTheme" icon="i-heroicons-sun" color="primary" @click="changeTheme('light')"/>         
      <UButton v-if="!isDarkTheme" icon="i-heroicons-moon" color="primary" @click="changeTheme('dark')"/>    
    </div>
  </footer>
</template>