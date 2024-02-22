<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading } from 'flowbite-vue'
import MultiStepForm from '@/components/MultiStepForm.vue'
import AlertError from '@/components/AlertError.vue'

const router = useRouter()

const recipeForm = ref({
  title: '',
  category: '',
  description: '',
  cooking_time: '',
  servings: '',
  video_link: '',
  picture_link: '',
  created_at: new Date(),
  visibility: '',
})

//category
const errorMessage = ref('')

async function createRecipe() {
  try {
    await trpc.recipe.create.mutate(recipeForm.value)
    router.push({ name: 'Dashboard' })
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
}
</script>

<template>
  {{ recipeForm }}

  <div class="flex justify-center">
    <form aria-label="Recipe" @submit.prevent="createRecipe">
      <MultiStepForm />
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
