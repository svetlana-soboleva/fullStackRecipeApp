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
        const [stepsFound] = await Promise.all([
          trpc.step.findForUpdating.query({ recipeId }),
        ])
        steps.value = stepsFound
      } catch (error: any) {
        errorMessage.value = error.message || 'An unexpected error occurred.'
      }
    })
async function updateStep(step: StepBare) {
    try {
        await trpc.step.update.mutate({...step })
        router.push({ name: 'Recipe' })
    } catch (error: any) {
        errorMessage.value = error.message || 'An unexpected error occurred.'
    }  
}

</script>

<template>
  <div v-if="steps.length > 0" class="min-h-screen"> 
    <template v-for="step in steps" :key="step">
      <form aria-label="UserProfile" @submit.prevent="updateStep(step)">
        <div v-if="typeof step.name === 'string'">
          <FwbInput label="Name" v-model="step.name" type="text" />
        </div>
        <div v-if="typeof step.ingredients === 'string'">
          <FwbTextarea
            label="Ingredients"
            name="ingredients"
            v-model="step.ingredients"
            placeholder="Ingredients"
          />
        </div>
        <div v-if="typeof step.description === 'string'">
          <FwbTextarea
            label="Description"
            name="description"
            v-model="step.description"
            placeholder="Description"
          />
        </div>
        <AlertError :message="errorMessage" />
        <div class="mt-8 flex justify-center items-center gap-4">
          <FwbButton class="w-40" color="green" type="submit">Save</FwbButton>
          <RouterLink
            class="w-40 text-center text-sm text-red-500 font-semibold leading-6 hover:text-red-600"
            component="RouterLink"
            :to="{ name: 'Dashboard' }"
          >
            Cancel
          </RouterLink>
        </div>
      </form>
    </template>

</div>
  <div v-else class="min-h-screen">
    <AlertError class="flex justify-center my-10" :message="errorMessage" />
  </div>
</template>
