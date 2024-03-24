<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { type StepBare } from '@mono/server/src/shared/entities'
import AlertError from '@/components/AlertError.vue'
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'

import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const steps = ref<StepBare[]>([])
const errorMessage = ref('')
const recipeId = Number(route.params.id)

onBeforeMount(async () => {
  try {
    const [stepsFound] = await Promise.all([trpc.step.findForUpdating.query({ recipeId })])
    steps.value = stepsFound
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
})

async function updateStep(step: StepBare) {
  try {
    await trpc.step.update.mutate({ ...step })
    router.push({ name: 'Recipe' })
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
}

async function addNewStep() {
  await trpc.step.create.mutate({ name: '', ingredients: '', description: '', recipeId })
  await refreshSteps()
}

async function deleteStep(step: StepBare) {
  await trpc.step.remove.mutate({ id: step.id })
  refreshSteps()
}

async function refreshSteps() {
  try {
    const [stepsFound] = await Promise.all([trpc.step.findForUpdating.query({ recipeId })])
    steps.value = stepsFound
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
}
</script>

<template>
  <button
    @click.prevent="router.push({ name: 'Recipe' })"
    type="button"
    class="opacity-85 flex items-center justify-center gap-x-2 rounded-lg border bg-yellow-200 px-4 py-2 font-customFont text-sm text-gray-700 duration-200 hover:bg-yellow-300 sm:w-auto"
  >
    <span>Back</span>
  </button>
  <div v-if="steps.length > 0" class="min-h-screen font-customFont">
    <template v-for="step in steps" :key="step">
      <form aria-label="Step" @submit.prevent="updateStep(step)">
        <div v-if="typeof step.name === 'string'" class="my-8">
          <FwbInput
            label="Step Name"
            v-model="step.name"
            type="text"
            :id="'stepName-' + step.id"
            placeholder="Step name"
          />
        </div>
        <div v-if="typeof step.ingredients === 'string'" class="my-8">
          <FwbTextarea
            label="Ingredients"
            name="ingredients"
            :id="'stepIngredients-' + step.id"
            v-model="step.ingredients"
            placeholder="Ingredients"
          />
        </div>
        <div v-if="typeof step.description === 'string'" class="my-8">
          <FwbTextarea
            label="Description"
            name="description"
            :rows="10"
            :id="'stepDescription-' + step.id"
            v-model="step.description"
            placeholder="Description"
          />
        </div>

        <AlertError :message="errorMessage" />
        <div class="mt-8 flex items-center justify-center gap-4">
          <FwbButton class="w-40" color="green" type="submit">Save</FwbButton>
          <FwbButton @click="deleteStep(step)" class="w-40 bg-red-500 hover:text-red-600">
            Delete
          </FwbButton>
        </div>
      </form>
    </template>
    <div class="mt-8 flex justify-center">
      <FwbButton color="green" @click="addNewStep">Add Step</FwbButton>
    </div>
  </div>
  <div v-else class="min-h-screen">
    <AlertError class="my-10 flex justify-center" :message="errorMessage" />
  </div>
</template>
