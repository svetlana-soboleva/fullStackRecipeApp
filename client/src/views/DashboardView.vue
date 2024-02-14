<script lang="ts" setup>
import { ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import Recipe from '@/components/Recipe.vue'

const recipes = ref<RecipeBare[]>([
  {
    id: 1,
    title: 'Recipe 1',
    description: 'any discription',
    instructions: 'do like so',
    cooking_time: 15,
    servings: 4,
    video_link: 'https://',
    picture_link: 'url/',
    created_at: new Date(2024, 1, 1),
    updated_at: new Date(2024, 2, 2),
    visibility: 'public',
  },
])
</script>

<template>
  <div class="DashboardView">
    <div v-if="recipes.length" data-testid="projectList">
      <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <FwbAlert v-else data-testid="recipeListEmpty">No recipes yet!</FwbAlert>

    <div class="mt-4">
      <!-- prettier-ignore -->
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="({ title: 'RecipeCreate' } as any)"
        data-testid="createRecipe"
        size="xl"
      >
        Add a new recipe
      </FwbButton>
    </div>
  </div>
</template>
