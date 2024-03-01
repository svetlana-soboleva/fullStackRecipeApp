<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert, FwbButton } from 'flowbite-vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import { CameraIcon } from '@heroicons/vue/24/outline'
import Recipe from '@/components/Recipe.vue'
import ProfileSide from '@/components/ProfileSide.vue'

const recipes = ref<RecipeBare[]>([])

onBeforeMount(async () => {
  recipes.value = await trpc.recipe.find.query()
})
</script>

<template>
  <div class="DashboardView flex flex-col-reverse md:flex-row">
    <div class="mb-4 w-full md:mb-0 md:w-3/4">
      <div
        v-if="recipes.length"
        data-testid="projectList"
        class="flex flex-row flex-wrap justify-center gap-4"
      >
        <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
      </div>
      <FwbAlert v-else data-testid="projectListEmpty">No recipes yet!</FwbAlert>

      <div class="mt-4"></div>
    </div>

    <div class="flex flex-col items-center gap-6 py-2 md:w-1/4">
      <!-- prettier-ignore -->
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="({ name: 'RecipeCreate' } as any)"
        data-testid="createProject"
        size="md"
      >
        Add a new recipe
        <CameraIcon aria-hidden="true" class="inline h-4 w-4" />
      </FwbButton>

      <ProfileSide></ProfileSide>
    </div>
  </div>
</template>
