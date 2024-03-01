<script lang="ts" setup>
import type { RecipeBare } from '@mono/server/src/shared/entities'

import Card from './Card.vue'

defineProps<{
  recipe: RecipeBare
}>()
</script>

<template>
  <Card class="max-w-xs overflow-hidden rounded shadow-lg">
    <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }">
      <img class="w-full h-96 object-cover" :src="recipe.picture_link" :alt="recipe.tittle" />
      <div class="px-6 py-4">
        <div class="mb-2 text-xl font-bold">{{ recipe.tittle }}</div>
        <p class="text-base text-gray-700">
          {{ recipe.description }}
        </p>
      </div>
    </router-link>
  </Card>
</template>
