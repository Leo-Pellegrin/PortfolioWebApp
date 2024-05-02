<template>
  <div>
    <UAccordion :items="steps" color="primary" variant="solid" open-icon="i-heroicons-plus" close-icon="i-heroicons-minus" multiple>
      <template #default="{ item, open }">
        <UButton color="gray" variant="ghost" class="border rounded-md border-primary-500 dark:border-primary-500 mb-5" :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">               
          <span class="truncate text-lg">{{ item.subtitle }}</span>
          <UDivider class="flex-1" />
          <span class="truncate text-lg">{{ item.startdate }} - {{ item.enddate }}</span>
          <template #trailing>
            <UIcon
              name="i-heroicons-chevron-right-20-solid"
              class="w-5 h-5 ms-auto transform transition-transform duration-200"
              :class="[open && 'rotate-90']"
            />
          </template>               
        </UButton>
      </template>  
      <template #item="{ item }">
        <div class="flex items-center mt-2">
          <UIcon name="i-heroicons-map-pin" class="text-base text-primary-500 dark:text-primary-400" />
          <span class="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{{ item.location }}</span>

          <UIcon name="i-heroicons-arrow-top-right-on-square" class="text-base ml-3 text-primary-500 dark:text-primary-400" />
          <ULink :to="item.companylink" class="ml-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
            {{ item.companylink }}
          </ULink>
        </div>
        <p class="text-base text-gray-900 dark:text-white text-left ml-4 mt-3">
          {{ item.description }}
        </p>
        <div class="ml-3 mt-3 mb-5">
          <UBadge v-for="(tech, index) in item.technology" :key="index" variant="outline" color="primary" class="mx-1" size="md">
            {{ tech.name }}
          </UBadge>
        </div>
      </template>   
    </UAccordion>      
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    steps?: Array<any>  
  }>()
</script>

<style>

</style>