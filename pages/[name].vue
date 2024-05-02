<template>
  <div>
    <div class="ml-4 mt-24 sm:ml-8 md:ml-12 lg:ml-16 relative border-b border-gray-200 dark:border-gray-800 py-8">
      <div class="mb-3 text-sm/6 font-semibold text-primary flex items-center gap-1.5">
        <span class=" mb-2 text-base/7 font-semibold text-primary'">{{ project.type }}</span>        
      </div>
      <div class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
        <span class="text-5xl font-bold flex justify-start text-left tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl"> {{ project.title }}</span>
      </div>
      <div class="mt-4 text-lg text-gray-500 dark:text-gray-400">
        <UBreadcrumb :links="links" class="mt-10" />
        <div class="mt-24 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div class="text-left">
            <span class="text-lg/8 text-gray-600 dark:text-gray-300">
              {{ project.description }}
            </span>
          </div>
          <div class="grid grid-cols-2">
            <div class="px-10 text-left">
              <span>
                <UDivider class="mt-10 bgdivider" size="md" />
                <p class="font-extrabold mt-5 dark:text-gray-300">Client</p>
                <p>{{ project.client }}</p>
              </span>
            </div>
            <div class="px-10 text-left">
              <span>
                <UDivider class="mt-10 bgdivider" size="md" />
                <p class="font-extrabold mt-5 dark:text-gray-300">Technologies</p>
                <p>{{ technologies }}</p>
              </span>
            </div>
          </div>
          <div class="grid content-center justify-start mt-2 dark:text-gray-100">            
            <UButton color="gray" variant="ghost" class="mx-2" :to="project.githubrepo">
              <div class="flex items-center arrow hover:text-primary-500">
                <span class="text-base">Go to the project code</span>                          
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-2 " />
              </div>                  
            </UButton>
          </div>
        </div>
      </div>  
    </div>  
    <div v-if="images" class="my-10 mx-auto flex justify-center items-center w-3/4 sm:w-4/5">
      <UCarousel ref="carouselRef" :items="images" :ui="{ item: 'basis-full' }" class="rounded-lg overflow-hidden mx-auto" arrows indicators>
        <template #default="{ item }">
          <img :src="item" class="object-fit object-center" @click="openItem(item)">
        </template>       
      </UCarousel>
    </div>    
    <UModal v-model="isOpen" fullscreen>
      <UCard
        :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow'
          }
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Image Zoom
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
          </div>
        </template>

        <div class="p-4">
          <img :src="selectedItemPath" class="object-fit object-center">
        </div>
      </UCard>     
    </UModal>
    <ToNextProject :is-mobile="isMobile" />
    <ToTopArrow />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

const route = useRoute()

const project = ref({
  title: '',
  type: '',
  description: '',
  githubrepo: '',
  technologies: [],
  client: '',
  images: []
})
const links = ref([])
const technologies = ref('')
const images = ref([])
const carouselRef = ref()

onMounted(async () => {
  if(window){
    if (window.innerWidth < 500) isMobile.value = true
  }
  project.value = page.value.projects.find((project) => project.title === route.params.name)

  links.value = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/#projects' },
    { label: project.value?.title || 'Project' } 
  ]

  technologies.value = project.value.technologies.map((tech) => tech.name).join(', ')

  images.value = project.value.images.map((image) => image.path)

  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 4500)
})

const isOpen = ref(false)
const selectedItemPath = ref('')
const isMobile = ref(true)

watchEffect(() => {
 if(window){
    if (window.innerWidth < 500) isMobile.value = true
    else isMobile.value = false
  }
 })

function openItem(item){
  isOpen.value = true
  selectedItemPath.value = item
}
</script>

<style scoped>

.bgdivider * {
  border-color: #dba085!important;
}

.arrow:hover .w-5 {
  animation: aniArrow01 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;
}

.arrow:hover .h-5 {
  animation: aniArrow02 1s cubic-bezier(0, 0.6, 1, 0.4) infinite 0.5s;
}

@keyframes aniArrow01 {
  0% {
    transform:rotatez(45deg) translateY(10px) translateX(10px);
  }
  100% {
    transform: rotatez(45deg) translateY(20px) translateX(20px);
  }
}

@keyframes aniArrow02 {
  0% {
    transform:translateX(-10px);
  }
  100% {
    transform:translateX(15px);
  }
}
</style>
