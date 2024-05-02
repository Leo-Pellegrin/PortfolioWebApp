<template>
  <div id="to-top-arrow">
    <ULink v-auto-animate @click="scrollTop()">
      <Icon name="tabler:arrow-up" size="2.5em" />
    </ULink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showThreshold = ref(100) // Minimum scroll distance to show arrow

const handleScroll = () => {
  if(window.scrollY > showThreshold.value){
    document.getElementById('to-top-arrow')?.classList.add('show') 
  }
  else{
    document.getElementById('to-top-arrow')?.classList.remove('show')  
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollTop = () => {
  window.scrollTo({
  top: 0,
  behavior: 'smooth',
})
}

</script>

<style scoped>
#to-top-arrow {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 120; /* Ensure arrow is above other elements */
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  color: #dba085;
  padding: 10px;
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

#to-top-arrow.show {
  opacity: 1;
}
</style>
