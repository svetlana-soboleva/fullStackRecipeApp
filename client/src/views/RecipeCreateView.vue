<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import AlertError from '@/components/AlertError.vue'

const router = useRouter()

const recipeForm = ref({
  title: '',
  description: '',
  instructions: '',
  ingredients: '',
  cooking_time: '',
  servings: '',
  video_link: '',
  picture_link: '',
  //hardcoded
  created_at: new Date(),
  updated_at: new Date(),
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
  <div class="flex items-center justify-between">
    <form aria-label="Project" @submit.prevent="createRecipe">
      <div class="space-y-6">
        <FwbHeading tag="h4">Create a new recipe</FwbHeading>

        <!-- Recipe Name -->
        <div class="mt-6">
          <FwbInput
            aria-label="Recipe name"
            v-model="recipeForm.title"
            :minlength="2"
            label="Recipe name"
            placeholder="My recipe"
          />
        </div>
        <!-- Description -->
        <div class="mt-6">
          <FwbInput
            aria-label="Description"
            v-model="recipeForm.description"
            label="Description"
            placeholder="Add a description..."
            type="textarea"
            rows="6"
          />
        </div>

        <!-- Instructions -->
        <div class="mt-6">
          <FwbInput
            aria-label="Instructions"
            v-model="recipeForm.instructions"
            label="Instructions"
            placeholder="Add instructions..."
            type="textarea"
            rows="8"
          />
        </div>
        <!-- Ingredients -->
        <div class="mt-6">
          <FwbInput
            aria-label="Ingredients"
            v-model="recipeForm.ingredients"
            label="Ingredients"
            placeholder="Add ingredients..."
            type="textarea"
            rows="8"
          />
        </div>
        <!-- Cooking Time -->
        <div class="mt-6">
          <FwbInput
            aria-label="Cooking Time"
            v-model="recipeForm.cooking_time"
            label="Cooking Time (minutes)"
            placeholder="e.g., 30"
            type="number"
          />
        </div>

        <!-- Servings -->
        <div class="mt-6">
          <FwbInput
            aria-label="Servings"
            v-model="recipeForm.servings"
            label="Servings"
            placeholder="e.g., 4"
            type="number"
          />
        </div>

        <!-- Video Link -->
        <div class="mt-6">
          <FwbInput
            aria-label="Video Link"
            v-model="recipeForm.video_link"
            label="Video Link"
            placeholder="Add a video link..."
          />
        </div>

        <!-- Picture Link -->
        <div class="mt-6">
          <FwbInput
            aria-label="Picture Link"
            v-model="recipeForm.picture_link"
            label="Picture Link"
            placeholder="Add a picture link..."
          />
        </div>

        <div class="mt-6">
          <label for="visibility">Visibility</label>
          <select v-model="recipeForm.visibility" id="visibility">
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <AlertError :message="errorMessage" />

      <div class="mt-6 grid grid-cols-2 items-center gap-3">
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
