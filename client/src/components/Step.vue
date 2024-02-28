<script lang="ts" setup>
import type { StepBare } from '@mono/server/src/shared/entities'
import organizeIngredients from '../stores/organizeIngredients'

const { step } = defineProps<{
  step: StepBare
}>()
</script>

<template>
  <div class="flex flex-col gap-2 p-4">
    <div class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{{ step.name }}:</div>
    <ul class="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
      <li v-for="(ingredient, index) in organizeIngredients(step.ingredients)" :key="index">
        {{ ingredient }}
      </li>
    </ul>
  </div>
</template>
