<script lang="ts" setup>
import { CameraIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate() {
  router.push({ name: 'RecipeCreate' })
}
</script>

<template>
  <button
    @click.prevent="navigate"
    data-testid="createRecipe"
    class="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white opacity-80 hover:bg-green-700"
  >
    Add Recipe
    <CameraIcon aria-hidden="true" class="inline h-4 w-4 ms-4" />
  </button>
</template>
