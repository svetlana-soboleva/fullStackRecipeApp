<script lang="ts" setup>
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'
import Card from './Card.vue'

defineProps<{
  recipe: RecipeBare
}>()
</script>

<template>
  <Card class="flex flex-row items-center justify-between" data-testid="project">
    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      {{ recipe.title }}
    </h5>
    <!-- prettier-ignore -->
    <FwbButton
      component="RouterLink"
      tag="router-link"
      data-testid="viewProjectBugs"
      :href="({ title: 'Recipe 1', params: { id: recipe.id } } as any)"
      class="pr-3"
    >
      View recipe comment
      <ArrowRightIcon aria-hidden="true" class="inline h-4 w-4" />
    </FwbButton>
  </Card>
</template>
