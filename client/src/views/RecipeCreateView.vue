<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton } from 'flowbite-vue'
import MultiStepForm from '@/components/MultiStepForm.vue'
import AlertError from '@/components/AlertError.vue'
import { type RecipeBare } from '@mono/server/src/shared/entities'
import useErrorMessage from '@/composables/useErrorMessage'

const router = useRouter()

const recipe = ref({
  tittle: '',
  category: '',
  description: '',
  cooking_time: '',
  servings: '',
  video_link: '',
  picture_link: '',
  visibility: '',
})


const [createRecipe, errorMessage] = useErrorMessage(async () => {
  const category_id = await trpc.category.create.mutate({ name: recipe.value.category })
  const createdRecipe = (await trpc.recipe.create.mutate({
    ...recipe.value,
    categoryId: category_id.id,
  })) as RecipeBare
  router.push({ name: 'StepCreate', params: { id: createdRecipe.id } } as any)
})


const handleUpdateRecipe = (newRecipe: any) => {
  recipe.value = newRecipe
}
</script>

<template>
  <div class="flex min-h-screen justify-center">
    <form aria-label="Recipe" @submit.prevent="createRecipe">
      <MultiStepForm :recipe="recipe" @updateRecipe="handleUpdateRecipe" />
      <AlertError class="" :message="errorMessage" />

      <div class="mt-8 grid grid-cols-2 items-center gap-3">
        <fwb-button type="submit" color="green">Save</fwb-button>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-red-400 hover:text-red-500"
          component="RouterLink"
          :to="{ name: 'Dashboard' }"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>
