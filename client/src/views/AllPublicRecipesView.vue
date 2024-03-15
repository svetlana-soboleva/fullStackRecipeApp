<script lang="ts" setup>
import { trpc } from '@/trpc'
import { onBeforeMount, ref, watch } from 'vue'
import { FaceFrownIcon } from '@heroicons/vue/24/outline'
import type { RecipeBare } from '@mono/server/src/shared/entities'
import Recipe from '@/components/Recipe.vue'
import Category from '@/components/Categories.vue'
import MainHeader from '@/components/MainHeader.vue'
import About from '@/components/About.vue'
import type { CategoryBare } from '@mono/server/src/shared/entities'

const categories = ref<CategoryBare[]>([])
const selectedCategory = ref<number>(0)
const recipes = ref<RecipeBare[]>([])

onBeforeMount(async () => {
  const [categoriesFound] = await Promise.all([trpc.category.list.query()])
  categories.value = categoriesFound
})

const handleSelectedCategory = (categoryId: number) => {
  selectedCategory.value = categoryId
}

watch(
  selectedCategory,
  async (newCategoryId) => {
    recipes.value = await trpc.recipe.listById.query(newCategoryId)
  },
  { immediate: true }
)

const handleNoCategory = async () => {
  recipes.value = await trpc.recipe.findAllPublicRecipes.query()
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 md:flex-row">
    <MainHeader class="w-full md:w-1/3" />
    <About class="w-full font-mono md:w-1/3" />
  </div>

  <div class="my-20">
    <Category
      :categories="categories"
      @selectedCategory="handleSelectedCategory"
      @noCategory="handleNoCategory"
    />
    <div
      v-if="recipes.length"
      data-testid="projectList"
      class="flex flex-row flex-wrap justify-center gap-4"
    >
      <Recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
    <div v-else class="my-12 flex flex-col items-center justify-end gap-4 text-slate-700">
      <p>No recipes found</p>
      <FaceFrownIcon aria-hidden="true" class="inline h-8 w-8" />
    </div>
  </div>
</template>
