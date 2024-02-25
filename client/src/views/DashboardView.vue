<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import Recipe from '@/components/Recipe.vue'

const recipes = ref<RecipeBare[]>([])

onBeforeMount(async () => {
  recipes.value = await trpc.recipe.find.query()
})
</script>

<template>
  <div class="DashboardView">
    <div v-if="recipes.length" data-testid="projectList" class="flex flex-row flex-wrap gap-4">
      <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <FwbAlert v-else data-testid="projectListEmpty">No recipes yet!</FwbAlert>

    <div class="mt-4">
      <!-- prettier-ignore -->
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="({ name: 'RecipeCreate' } as any)"
        data-testid="createProject"
        size="xl"
      >
        Add a new recipe
      </FwbButton>
    </div>
  </div>
</template>
