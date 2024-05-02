<template>
  <div>
    <UCard v-auto-animate class="m-5">
      <template #header>
        <div v-auto-animate class="-px-4 -py-5 sm:-p-6" @mouseover="showProjectDetailsActive = true" @mouseleave="mouseleave()">
          <UButton :to="urlprojectdetails" variant="ghost">
            <NuxtImg
              v-if="mainimage.path"
              :src="mainimage.path"
              sizes="100vw sm:80vw md:50vw lg:50vw xl:50vw"
              :class="{ 'img': true, 'image-contained': showProjectDetailsActive }"                          
            />
          </UButton>         
        </div>   
      </template>         
      <template #footer>
        <div class="p-5 text-left">
          <div class="ease-in-out duration-300">
            <span class="text-lg font-bold">{{ project.title }}</span>
          </div>          
          <div class="ease-in-out duration-300"> 
            <span v-if="!showProjectDetailsActive" class="text-base text-gray-400" @mouseover="showProjectDetailsActive = true">{{ project.type }}</span>
          </div>          
          <div class="ease-in-out duration-300"> 
            <ULink v-if="showProjectDetailsActive" :to="urlprojectdetails" class="flex" @mouseleave="mouseleave()">
              <span class="text-base text-gray-400 ease-in-out duration-300">Show project</span>     
              <UDivider class="flex-1 ml-3" />
            </ULink>
          </div>        
        </div>   
      </template>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
  interface Project {
    title: string;
    type: string;
    description: string;
    githubrepo?: string; // Optional property
    technologies: { name: string }[]; // Array of objects
    client: string;
    images: {name: string, path: string, size: any, main: boolean }[]
  }
  
  const props = defineProps<{
    project?: Project 
  }>()

  const mainimage = computed(() => {
    const data = props.project.images.find((image) => image.main === true)
      urlprojectdetails.value = props.project.title
      if(data){                
        return {
          name: data.name,
          path: data.path,
          size: data.size,
          main: data.main
        }
      }
  })

  const urlprojectdetails = ref('')

  onMounted(() => {
   
  })

  const showProjectDetailsActive = ref(false)

  function mouseleave() {
    showProjectDetailsActive.value = false
  }

</script>

<style scoped>

.UCard {
  /* Set a maximum width for the UCard to ensure images don't overflow */
  max-width: 400px; /* Adjust as needed based on your layout */
}

.img {
  border-radius: 3%;
  max-width: 100%; /* Ensure the image doesn't exceed UCard width */
  height: auto;  /* Maintain aspect ratio */
  object-fit: cover; /* Crop to fit while maintaining aspect ratio */
  transition: transform 0.1s ease-in-out;
}

.img:hover,
.image-contained {
  transform: scale(1.05); /* Adjust hover scale factor as desired */
}
</style>
