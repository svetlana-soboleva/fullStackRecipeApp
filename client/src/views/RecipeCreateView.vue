<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading } from 'flowbite-vue'
import MultiStepForm from '@/components/MultiStepForm.vue'
import AlertError from '@/components/AlertError.vue'


const router = useRouter()

const recipe = ref({
  tittle: '',
  category: '',
  cooking_time: '',
  servings: '',
  video_link: '',
  picture_link: '',
  visibility: '',
})

const errorMessage = ref('')

async function createRecipe() {
  try {
    const category_id = await trpc.category.create.mutate({ name: recipe.value.category })
    const createdRecipe = await trpc.recipe.create.mutate({
      ...recipe.value,
      categoryId: category_id.id,
    })
    router.push({ name: 'StepCreate', params: { id: createdRecipe.id } } as any)
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
}
</script>

<template>
  {{ recipe }}

  <div class="flex justify-center">
    <form aria-label="Recipe" @submit.prevent="createRecipe">
      <MultiStepForm :recipe="recipe" />
      <div class="space-y-6">
        <FwbHeading tag="h4">New recipe</FwbHeading>
      </div>

      <AlertError :message="errorMessage" />

      <div class="mt-8 grid grid-cols-2 items-center gap-3">
        <FwbButton type="submit">Save</FwbButton>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          component="RouterLink"
          :to="{ name: 'Dashboard' }"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>
