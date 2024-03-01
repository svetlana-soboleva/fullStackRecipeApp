<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import Recipe from '@/components/Recipe.vue'

const recipes = ref<RecipeBare[]>([])

onBeforeMount(async () => {
  recipes.value = await trpc.recipe.findAllPublicRecipes.query()
})
</script>

<template>
  <div>
    Random Recipe
  </div>
  <p>CATEGORIES</p>
  <div
    v-if="recipes.length"
    data-testid="projectList"
    class="flex flex-row flex-wrap justify-center gap-4"
  >
    <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>
