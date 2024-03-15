<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref } from 'vue'
import { FwbAlert } from 'flowbite-vue'
import Recipe from '@/components/Recipe.vue'
import ProfileSide from '@/components/ProfileSide.vue'
import AddRecipeBtn from '@/components/buttons/AddRecipeBtn.vue'
import type { RecipeBare } from '@mono/server/src/shared/entities'

const recipes = ref<RecipeBare[]>([])

onBeforeMount(async () => {
  recipes.value = await trpc.recipe.find.query()
})
</script>

<template>
  <div class="DashboardView md:min-h-screen flex flex-col-reverse md:flex-row">
    <div class="mb-4 w-full md:mb-0 md:w-3/4">
      <div
        v-if="recipes.length"
        data-testid="recipeList"
        class="flex flex-row flex-wrap justify-center gap-4"
      >
        <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
      </div>
      <div v-else class="mt-4 flex flex-col justify-center items-center gap-6">
        <FwbAlert data-testid="recipeListEmpty" class="text-center bg-yellow-100 text-stone-700 font-semibold font-customFont">You have no recipes yet!</FwbAlert>
        <div class="w-60">
          <img  src="../assets/burger.png" alt="">
        </div>
  
      </div>
    </div>

    <div class="flex flex-col items-center gap-6 py-2 md:w-1/4">
      <AddRecipeBtn />

      <ProfileSide></ProfileSide>
    </div>
  </div>
</template>
