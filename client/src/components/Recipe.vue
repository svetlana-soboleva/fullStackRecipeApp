<script lang="ts" setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import { FormKitIcon } from '@formkit/vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'

defineProps<{
  recipe: RecipeBare
}>()
</script>

<template>
  <Card
    class="relative flex w-80 flex-col items-center justify-between gap-4"
    data-testid="project"
  >
    <div class="absolute left-10 top-10 rounded-lg bg-slate-300 px-4 py-2 opacity-80 shadow-md">
      <FormKitIcon icon="time" />
      <p>{{ recipe.cooking_time }}</p>
    </div>

    <div v-if="recipe.picture_link">
      <img class="h-80 w-80 object-cover" :src="recipe.picture_link" :alt="recipe.tittle" />
    </div>
    <h5 class="text-sm font-bold tracking-tight text-gray-900 md:text-2xl">
      {{ recipe.tittle }}
    </h5>
    <!-- prettier-ignore -->
    <FwbButton
      component="RouterLink"
      tag="router-link"
      data-testid="viewProjectBugs"
      :href="({ name: 'Recipe', params: { id: recipe.id } } as any)"
      class="pr-3"
    >
      View the recipe
      <ArrowRightIcon aria-hidden="true" class="inline h-4 w-4" />
    </FwbButton>
  </Card>
</template>

