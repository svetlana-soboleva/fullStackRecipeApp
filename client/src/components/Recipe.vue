<script lang="ts" setup>
import type { RecipeBare } from '@mono/server/src/shared/entities'

import Card from './Card.vue'

defineProps<{
  recipe: RecipeBare
}>()
</script>

<template>
<Card
  class="flex flex-col mx-auto md:mx-4 w-80 justify-center items-center border-gray-200 rounded-lg shadow md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  data-testid="project"
>
  <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }" >
    <div class="">
      <img class="object-cover w-full h-96 rounded-lg" :src="recipe.picture_link" :alt="recipe.tittle">
    </div>
    
    <div class="flex flex-col justify-between p-2 leading-normal text-center">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ recipe.tittle }}</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ recipe.description }}</p>
    </div>
  </router-link>
</Card>






</template>

