<script setup lang="ts">

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const route = useRoute()
const colorMode = useColorMode()

useSeoMeta({
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})

const projects = ref(page.value?.projects)
const projectFilter = ref('All')

const projectTypesWithCount = computed(() => {
  const typesCountMap = page.value?.projects.reduce((acc: Record<string, number>, project: { type: string }) => {
    const type = project.type
    if (acc['All']) {
      acc['All']++
    } else {
      acc['All'] = 1
    }

    if (acc[type]) {
      acc[type]++
    } else {
      acc[type] = 1
    }

    return acc
  }, {})

  // Convertir le map en tableau de paires [type, count]
  return Object.entries(typesCountMap)
})

function updateProjectsShow(type: string){
  if(type === 'All'){
    projects.value = page.value?.projects
    projectFilter.value = 'All'
  } else {
    projects.value = page.value?.projects.filter((project: { type: string; }) => project.type === type)
    projectFilter.value = type
  }
}

function animateOnScroll() {
    'use strict'

    const MARGIN = 10 // Définir une marge supplémentaire de 200 pixels

    const detectAndAnimate = () => {
        const elements = document.querySelectorAll('.animate-on-scroll')
        elements.forEach(element => {
            const isVisible = isElementInViewport(element, MARGIN)
            element.classList.toggle('is-visible', isVisible)
        })
    }

    const isElementInViewport = (el: Element, margin: number) => {
        const rect = el.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        
        return (
            rect.top - margin <= viewportHeight &&
            rect.left - margin <= viewportWidth &&
            rect.bottom + margin >= 0 &&
            rect.right + margin >= 0
        )
    }

    window.addEventListener('scroll', detectAndAnimate)
    detectAndAnimate()
}


onMounted(() => {
  animateOnScroll()
  if(route.hash) navigateTo(route.hash)   
})

const scrollToKnowledge = () => {
  if(document){
    document.querySelector('#knowledge')?.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

</script>

<template>
  <div class="bg-current-50 dark:bg-blackcolor">
    <div id="home" :class="(colorMode.preference == 'dark' || colorMode.preference == 'system') ? 'darklineargradient' : 'lineargradient' " class="animate-on-scroll w-full h-screen bg-[url('/public/mainbg.png')] bg-cover bg-center dark: py-24 sm:py-32 md:py-40 relative">
      <div class="gap-10 sm:gap-y-24 flex flex-col text-center">
        <div class="mt-10">
          <span class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl"> {{ page?.hero.title }} </span>
        </div>
        <span class="text-lg tracking-tight text-gray-600 dark:text-gray-300"> {{ page?.hero.description }} </span>
        <div class="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
          <UButton size="xl" class="mt-16 2xl:mb-28 2xl:mt-40 2xl:text-xl px-8 py-4" @click="scrollToKnowledge()"> 
            <UIcon :name="page?.hero.links[0].icon" class="animate-bounce 2xl:text-2xl" /> 
            {{ page?.hero.links[0].label }}
          </UButton>
        </div>
      </div>
    </div>


    <div id="knowledge" class="py-24 sm:py-32 mt-10">
      <div class="gap-16 sm:gap-y-24 text-center z-50">
        <div class="mb-2 text-base/7 font-semibold text-primary"> 
          {{ page?.knowledge.headline }} 
        </div>
        <h2 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          {{ page?.knowledge.title }}
        </h2>
        <div class="mt-6 text-lg/8 text-gray-600 dark:text-gray-300 z-50">
          <div class="animate-on-scroll z-3 w-100 mt-16 mb-16 mx-20 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            <!-- Votre boucle v-for ici -->
            <UCard v-for="(category, index) in page?.knowledge.categories" :key="index" class="mb-4 !bg-inherit ring-1 ring-primary-200 dark:ring-primary-800">
              <template #header>          
                <div class="flex items-center">
                  <UIcon :name="category.icon" class="text-3xl text-primary-500 dark:text-primary-400" />
                  <span class="ml-2 text-2xl font-semibold text-dark-900 dark:text-white underline decoration-primary-500 decoration-2 underline-offset-6">{{ category.title }}</span>              
                </div>            
              </template>
              <div class="grid">
                <div class="col-start-1 auto-rows-min mt-3">
                  <span class="text-gray-500">&lt;div&gt;</span>
                  <UDivider orientation="vertical" class="h-24 w-10 bgdividergray" size="sm" />    
                  <span class="text-gray-500">&lt;/div&gt;</span>
                </div>
                <div class="col-start-2 text-left my-auto text-lg xs:ml-4">
                  <span class="mt-2 font-extrabold text-gray-700 dark:text-gray-200 z-50">
                    {{ category.description }}
                  </span>
                </div>              
              </div>
            </UCard>
            <!-- Fin de votre boucle v-for -->
            <div class="animate-on-scroll col-start-2 text-left my-auto text-lg hidden sm:hidden md:block lg:hidden xl:hidden">
              <div class="grid">
                <div class="col-start-1 auto-rows-min mt-3">
                  <UDivider orientation="vertical" class="h-36 w-10 bgdivider" size="md" />    
                </div>
                <div class="col-start-2 text-left my-auto text-lg">
                  <span class="mt-2 text-lg text-gray-500 dark:text-gray-200 font-bold">
                    "The Web as I envisaged it, we have not seen it yet. The future is still so much bigger than the past."
                  </span>
                  <div class="ml-10 mt-4">
                    <span class="text-primary-300">-</span>
                    <span class="text-md text-gray-500 dark:text-gray-400"> Tim Berners-Lee</span>           
                  </div>  
                </div>   
              </div>                 
            </div>  
          </div>
        </div>       
      </div>
      <div class="flex animate-on-scroll justify-center -mt-60 z-0 xs:-mt-40 sm:-mt-50 md:-mt-50 lg:-mt-60 xl:-mt-60 backdrop-opacity-35">
        <img 
          :src="colorMode.preference == 'dark' ? '/image.png' : '/imagelight.png'" 
          alt="Image" 
          class="z-0 opacity-35 dark:opacity-25 transform scale-100 sm:scale-100 md:scale-100 w-full px-2 sm:w-11/12 md:w-8/12 lg:w-8/12 xl:w-8/12">
      </div>
    </div>


    <div id="projects" class="mt-14 pt-24 pb-60 mb-14">
      <div class="gap-16 sm:gap-y-24 text-center">
        <div class="mb-2 text-base/7 font-semibold text-primary"> 
          Projects
        </div>
        <h2 class="text-4xl mb-8 font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl">
          Accomplishments to date
        </h2>
        <div class="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden">
          <span class="mr-3 ml-10 text-base xs:ml-2">Filter By</span>
        </div>
        <div class="flex items-center animate-on-scroll">
          <span class="mr-3 ml-10 text-base xs:ml-2 sm:ml-6 md:ml-6 hidden xs:hidden sm:block md:block lg:block xl:block">Filter By</span>
          <div class="flex xs:mx-auto sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0">
            <div v-for="(projectType, index) in projectTypesWithCount" :key="index" class="">
              <UChip :text="String(projectType[1])" size="xl" inset>           
                <UButton color="gray" variant="ghost" class="mx-2" @click="updateProjectsShow(projectType[0])"> 
                  <span id="projectFilter" class="text-sm" :class="{ 'text-primary-500': projectType[0] === projectFilter }">/ {{ projectType[0] }} </span>
                </UButton>
              </UChip>
            </div>  
          </div>
        </div>
        <div v-auto-animate :class="`grid grid-cols-1 sm:grid-cols-${Math.min(projects.length, 2)} md:grid-cols-${Math.min(projects.length, 2)} lg:grid-cols-${Math.min(projects.length, 3)} xl:grid-cols-${Math.min(projects.length, 3)}`">
          <ProjectCard v-for="(project, index) in projects" :key="index" v-auto-animate :project="project" />
        </div>
      </div>
    </div>

    <div id="experience" class="mt-14 py-24 mb-48">
      <div class="gap-16 sm:gap-y-24 text-center">
        <div class="animate-on-scroll mb-10">
          <span class="mb-10 text-base/7 font-semibold text-primary">Experience</span>
        </div>

     
        <div class="animate-on-scroll grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2">
          <div class="animate-on-scroll mt-0 xs:mt-10 sm:mt-10">
            <UIcon :name="page?.experiences[0].icon" class="text-5xl xs:mb-3 sm:mb-3 text-primary-500 dark:text-primary-400" />
            <h2 class="text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-4xl xs:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ page?.experiences[0].title }}
            </h2>
            <div class="mt-10">
              <ExperienceAccordion :steps="page?.experiences[0].steps" class="mx-10" />  
            </div>
          </div>
          <div class="animate-on-scroll mt-0 xs:mt-10 sm:mt-10">
            <UIcon :name="page?.experiences[1].icon" class="text-5xl xs:mb-3 sm:mb-3 text-primary-500 dark:text-primary-400" />
            <h2 class="text-5xl xl:text-5xl lg:text-4xl md:text-3xl sm:text-4xl xs:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ page?.experiences[1].title }}
            </h2>
            <div class="mt-10">
              <ExperienceAccordion :steps="page?.experiences[1].steps" class="mx-10" />  
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToTopArrow />
  </div>
</template>

<style scoped>
#projectFilter:hover {
  color: #dba085;
}

.darklineargradient{
    background-image: linear-gradient(to bottom, rgba(0,0,0,0), #121212), linear-gradient(to top, rgba(0,0,0,0), #121212), url('/public/mainbg.png');
    background-position: center top, center bottom;
    background-repeat: no-repeat;
}

.lineargradient{
    background-image: linear-gradient(to bottom, rgba(0,0,0,0), #FCF7F4), linear-gradient(to top, rgba(0,0,0,0), #f8ede8), url('/public/mainbg.png');
    background-position: center top, center bottom;
    background-repeat: no-repeat;
}

.bgdivider * {
  border-color: #dba085!important;
}

.bgdividergray * {
  border-color: #71717A!important;
}

.animate-on-scroll {    
    opacity: 0;    
    transition: opacity 1s;
}

.animate-on-scroll.is-visible { 
    opacity: 1;
}
</style>