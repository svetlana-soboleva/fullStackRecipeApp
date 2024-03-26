<script lang="ts" setup>
import type { RecipeBare } from '@mono/server/src/shared/entities'

import Card from './Card.vue'

defineProps<{
  recipe: RecipeBare
}>()
</script>

<template>
  <Card data-testId="recipeCardTest" class="max-w-xs overflow-hidden rounded shadow-lg">
    <router-link :to="{ name: 'Recipe', params: { id: recipe.id } }">
      <img class="w-full h-80 object-cover" :src="recipe.picture_link" :alt="recipe.tittle" />
      <div class="px-6 py-4">
        <div data-testId="recipeCardHeading" class="font-mono text-gray-600 mb-2 text-xl font-bold">{{ recipe.tittle }}</div>
        <p class="font-mono text-gray-500">
          {{ recipe.description }}
        </p>
      </div>
    </router-link>
  </Card>
</template>
