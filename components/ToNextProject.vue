<template>
  <div class="relative" @mouseenter="displayimage = true" @mouseleave="displayimage = false">
    <div id="imgtonext">
      <div class="flex items-center mb-3 img">
        <Transition>
          <img
              v-if="displayimage"
              :src="mainImageNextProject"
              class="object-cover	rounded-t-xl h-auto imgtonext"
            >          
        </Transition>      
      </div>
    </div>
    <UCard :id="isMobile ? '' : 'to-next-project'" class="rounded-b-lg">
      <template #header>    
        <div class="flex items-center justify-center mb-3">
          <UButton color="gray" :to="nextProjectname" variant="ghost">
            <div class="flex items-center arrow hover:text-primary-500">
              <span class="text-base">Next Project</span>                          
              <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5 ml-2 " />
            </div>    
          </UButton>
        </div>      
        <div class="flex justify-center">
          <span class="text-lg text-gray-100 font-extrabold">{{ nextProjectname }}</span>
        </div>      
      </template>    
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const props = defineProps<{
  isMobile: boolean
}>()

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())
const route = useRoute()

const nextProjectname = ref('')
const mainImageNextProject = ref('')

const displayimage = ref(false)

onMounted(() => {
  const projects = page.value.projects
  const currentProjectIndex = projects.findIndex((project) => project.title === route.params.name)
  let nextProjectIndex = 0
  if(currentProjectIndex + 1 < projects.length - 1) nextProjectIndex = currentProjectIndex + 1
  
  const nextProject = projects[nextProjectIndex]
  nextProjectname.value = nextProject.title
  if(!props.isMobile){
    mainImageNextProject.value = nextProject.images.find((image) => image.main === true).path
  }
})


</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.img {
  width: 93%;
  height: 100%;
  border-top-left-radius: 30%;
  border-top-right-radius: 30%;
}

#imgtonext {
  position: fixed;
  bottom: 105px;
  right: 33px;
  opacity: 1;
  width: 15.5em;
}

#to-next-project {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 100; /* Ensure arrow is above other elements */
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
  color: #818CF8;
  padding: 10px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
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
