<script setup lang="ts">
import { trpc } from '@/trpc'
import { FormKitIcon } from '@formkit/vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type StepBare } from '@mono/server/src/shared/entities'
import Step from '../components/Step.vue'
import Instructions from '../components/Instructions.vue'
import DeleteButton from '@/components/DeleteButton.vue'

const route = useRoute()
const router = useRouter()

const recipe = ref()
const category = ref()
const steps = ref<StepBare[]>([])
const recipeId = Number(route.params.id)
const showInstructions = ref(false)

onBeforeMount(async () => {
  const [recipeFound, stepsFound] = await Promise.all([
    trpc.recipe.get.query(recipeId),
    trpc.step.find.query({ recipeId }),
  ])
  recipe.value = recipeFound
  category.value = await trpc.category.find.query({ id: recipe.value.categoryId })
  steps.value = stepsFound
})

const deleteFunction = async () => {
  await trpc.recipe.reciveRecipe.mutate({ id: recipeId })
  router.push({ name: 'Dashboard' })
}
</script>

<template>
  <div v-if="recipe">
    <div
      class="flex flex-col rounded-lg border border-gray-200 bg-white shadow md:max-w-full lg:flex-row"
    >
      <div class="picture relative lg:w-1/2">
        <DeleteButton class="absolute right-4 top-4" @click="deleteFunction" />
        <div class="absolute right-12 top-16">
          <div class="flex flex-col text-right">

            <h5 class="mb-2 text-4xl font-bold tracking-tight text-black lg:text-6xl bg-white mix-blend-screen px-2 py-2">
              {{ recipe.tittle }}
            </h5>
            <hr />
            <h6 class="text-2xl  text-amber-200 lg:text-4xl">{{ category }}</h6>
          </div>
        </div>
        <img
          class="w-full rounded-t-lg object-cover md:h-auto md:rounded-lg"
          :src="recipe.picture_link"
          alt=""
        />
        <div
          class="absolute bottom-0 left-0 right-0 mx-auto my-2 flex flex-row justify-between gap-4 bg-slate-100 px-8 py-2 opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100 hover:shadow-lg"
        >
          <div class="flex flex-row items-center gap-2">
            <FormKitIcon icon="time" />
            <p class="text-center">{{ recipe.cooking_time }} min</p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <FormKitIcon icon="avatarMan" />
            <p class="text-center">{{ recipe.servings }} pers</p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <FormKitIcon icon="youtube" />
            <p class="text-center">Video</p>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-col items-center lg:w-1/2">
        <!-- Toggle switch for Instructions and Steps -->
        <label
          for="toggleSwitch"
          class="flex cursor-pointer rounded-md p-2 opacity-75 dark:text-gray-800"
        >
          <input id="toggleSwitch" type="checkbox" class="peer hidden" v-model="showInstructions" />
          <span
            class="w-28 rounded-l-md bg-green-200 px-4 py-2 text-center peer-checked:bg-gray-200"
            :class="{ 'bg-gray-300': !showInstructions }"
            >Steps</span
          >
          <span
            class="rw-28 rounded-r-md bg-gray-300 px-4 py-2 text-center peer-checked:bg-green-200"
            :class="{ 'bg-violet-400': showInstructions }"
            >Instructions</span
          >
        </label>

        <div v-if="showInstructions">
          <Instructions v-for="step in steps" role="listitem" :key="step.id" :step="step" />
        </div>
        <div v-else>
          <div class="flex flex-wrap">
            <Step
              v-for="step in steps"
              role="listitem"
              :key="step.id"
              :step="step"
              class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.formkit-icon {
  width: 2em;
}

h6 {
  line-height: calc(5px + 5vh);
  text-shadow:
    0 0 5px #ffa500,
    0 0 15px #ffa500,
    0 0 20px #ffa500,
    0 0 40px #ffa500,
    0 0 60px #ff0000,
    0 0 10px #ff8d00,
    0 0 98px #ff0000;
}
</style>
