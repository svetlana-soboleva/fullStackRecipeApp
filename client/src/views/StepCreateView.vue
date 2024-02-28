<script setup lang="ts">
import { trpc } from '@/trpc'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import AlertError from '@/components/AlertError.vue'
import { FwbButton } from 'flowbite-vue'
import { ref } from 'vue'
import { type StepBare } from '@mono/server/src/shared/entities'

const route = useRoute()
const router = useRouter()

const recipeId = Number(route.params.id)
const errorMessage = ref('')
const steps = ref([{ name: '', ingredients: '', description: '' }])

async function createStep() {
  try {
    for (const singleStep of steps.value) {
      ;(await trpc.step.create.mutate({
        ...singleStep,
        recipeId,
      })) as StepBare
    }
    console.log('recipeId:', recipeId)
    console.log('steps.value:', steps.value)
    router.push({ name: 'Dashboard' })
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  }
}
</script>

<template>
  <form aria-label="Recipe" @submit.prevent="createStep">
    <FormKit type="list" v-model="steps" :value="[{}]" dynamic #default="{ items, node, value }">
      <FormKit type="group" v-for="(item, index) in items" :key="item" :index="index">
        <div class="group">
          <FormKit type="text" name="name" label="Step name:" placeholder="Step name" />

          <FormKit type="textarea" name="ingredients" label="Ingredients:" />
          <FormKit type="textarea" name="description" label="Description:" />

          <button
            type="button"
            @click="() => node.input(value.filter((_: any, i: number) => i !== index))"
            class="border border-red-500 p-3 text-red-500"
          >
            - Remove
          </button>
        </div>
      </FormKit>

      <button
        type="button"
        @click="() => node.input(value.concat({}))"
        class="mb-4 border border-teal-600 p-3 text-teal-600"
      >
        + Add another step
      </button>
      <!--     <pre wrap>{{ value }}</pre> -->
    </FormKit>
    <AlertError :message="errorMessage" />
    <div class="mt-8 grid grid-cols-2 items-center gap-3">
      <FwbButton type="submit">Save</FwbButton>
    </div>
  </form>
</template>

<style>
.group {
  position: relative;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 10px;
  margin-bottom: 5px;
}

.group button {
  position: absolute;
  top: 438px;
  right: 10px;
}
</style>
