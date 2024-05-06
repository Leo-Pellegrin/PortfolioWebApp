<script setup lang="ts">
const nuxtApp = useNuxtApp()

const { activeHeadings, updateHeadings } = useScrollspy()

const links = computed(() => [
{
  label: ' / Knowledge',
  to: '/#knowledge',
  icon: 'iconoir:learning',
  active: activeHeadings.value.includes('knowledge') && !activeHeadings.value.includes('home')
}, {
  label: '/ Projects',
  to: '/#projects',
  icon: 'ph:projector-screen-chart',
  active: activeHeadings.value.includes('projects') && !activeHeadings.value.includes('experience') && !activeHeadings.value.includes('knowledge')
}, {
  label: '/ Experience',
  to: '/#experience',
  icon: 'ph:student',
  active: activeHeadings.value.includes('experience')
},
{
  label: '/ Contact',
  to: '/#contact',
  icon: 'i-heroicons-phone-20-solid',
  active: false
}
])

const route = useRoute()

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

const projectpage = computed(() => {
  const project = page.value?.projects.find((project: { title: string | string[]; }) => project.title === route.params.name)
  if(project) {   
    return true
  }
  else{
     updateHeadings([
      document.querySelector('#home'),
      document.querySelector('#knowledge'),
      document.querySelector('#projects'),
      document.querySelector('#experience'),
      document.querySelector('#contact'),
    ])
    return false
  }
})

nuxtApp.hooks.hookOnce('page:finish', () => {   
  if(!projectpage.value){    
    updateHeadings([
      document.querySelector('#home'),
      document.querySelector('#knowledge'),
      document.querySelector('#projects'),
      document.querySelector('#experience'),
      document.querySelector('#contact'),
    ])
  }
})


function useScrollspy(): { activeHeadings: any; updateHeadings: any; } {
  const activeHeadings = ref([])
  
  const updateHeadings = (headings: HTMLElement[]) => {
    const active: string[] = []
    
    headings.forEach((heading) => {
      if(!heading) return
      const { top, bottom } = heading.getBoundingClientRect()
      
      if (top <= 0 && bottom > 0) {
        active.push(heading.id)
      }
    })
    activeHeadings.value = active
  }
  
  return {
    activeHeadings,
    updateHeadings
  }
}

const toTop = () => {
  if(!projectpage.value) {
    scrollToSection('/#home')
  }
  else{
    window.location.href = '/'
  }
  window.scrollTo({
  top: 0,
  behavior: 'smooth',
})
}

const scrollToSection = (to: string) => {
  if (document && to) {
    let path = ''    
    if (projectpage.value) {     
      window.location.href = `${to}`
      return
    } else {
      path = to.split('/')[1]
    }
    
    const targetElement = document.querySelector(path)
    if (targetElement) {
      
      let targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
      if (showAsideLink.value) {
        targetPosition -= 200
      }
      // Faire défiler jusqu'à la nouvelle position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })

      // Masquer le menu latéral après le défilement
      showAsideLink.value = false
    }
  }
}


const showAsideLink = ref(false)

function showAsideLinkfct(){
  showAsideLink.value = !showAsideLink.value
}

const showHeader = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollY = window.scrollY
  const threshold = 300 // Valeur de scrolly seuil à partir de laquelle le header doit être affiché

  if (scrollY > threshold) {
    showHeader.value = true
  } else {
    showHeader.value = false
  }

  // if(!projectpage.value){
    updateHeadings([
      document.querySelector('#home'),
      document.querySelector('#knowledge'),
      document.querySelector('#projects'),
      document.querySelector('#experience'),
      document.querySelector('#contact'),
    ])
  // }
}

</script>

<template>
  <header class="border-b border-current-200 dark:border-gray-800 -mb-px top-0 z-50 w-full" :class="{ 'sticky-header': showHeader }">
    <div class=" grid grid-cols-3 items-center justify-between gap-3 h-[--header-height] bg-current-100 dark:bg-blackcolor">
      <div class="flex items-center mx-6 my-4">
        <UBadge variant="subtle" class="mb-0.5 transition-all ease-in-out delay-1000" size="lg" color="primary">
          <span class="text-primary dark:text-primary" @click="toTop()">Léo Pellegrin</span>
        </UBadge>
      </div>
      <div class="flex justify-center lg:flex-1 gap-1.5">
        <UButton v-for="(link, index) in links" :key="index" variant="ghost" class="hoverbtn border-none hover:bg-current-500 dark:hover:bg-gray-800 mx-5 xs:hidden sm:hidden md:hidden lg:flex xl:flex transition-all ease-in-out delay-300" @click="scrollToSection(link.to)">
          <span class="" :class="link.active ? ' underline underline-offset-8 dark:text-white text-blackcolor font-bold' : 'text-gray-500 dark:text-gray-400'">{{ link.label }}</span>
        </UButton>
      </div>

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <div class="lg:hidden">
          <UButton icon="i-heroicons-bars-3" variant="ghost" class="mx-5" @click="showAsideLinkfct()" />
        </div>        
      </div>
    </div>
    <div v-if="showAsideLink" v-auto-animate class="lg:block dark:my-2 bg-current-100 dark:bg-blackcolor">
      <UDivider class="w-full" />
      <div>
        <template v-for="(link, index) in links" :key="index">
          <ULink class="group p-2 flex w-full rounded-md font-medium text-sm truncate bg-current-100 hover:bg-current-500 dark:bg-blackcolor dark:hover:bg-gray-700 ml-8 my-5 xs:block sm:block md:block lg:hidden xl:hidden" @click="scrollToSection(link.to)">
            <div class="flex justify-start">
              <Icon :name="link.icon" class="w-5 h-5 mr-3 text-gray-800 dark:text-gray-300 group-hover:text-gray-100" />
              <span>{{ link.label }}</span>
            </div>
          </ULink>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.hoverbtn:hover span{
  color: white;
  transition: all 0.7s ease-in-out;
}

.sticky-header {
  position: sticky;
  left: 0;
  background-color: light-dark(#f8ede8,#121212);
  transition: all 1s ease-in-out; /* Transition de l'opacité */
}

</style>