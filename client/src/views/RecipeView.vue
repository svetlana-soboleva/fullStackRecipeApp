<script setup lang="ts">
import { trpc } from '@/trpc'
import { FormKitIcon } from '@formkit/vue'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type StepBare } from '@mono/server/src/shared/entities'
import Step from '../components/Step.vue'
import Instructions from '../components/Instructions.vue'
import DeleteButton from '@/components/buttons/DeleteButton.vue'
import PrevButton from '@/components/buttons/PrevButton.vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import UpdateButton from '@/components/buttons/UpdateButton.vue'
import { FwbButton } from 'flowbite-vue'

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
  await trpc.recipe.removeRecipe.mutate({ id: recipeId })
  router.push({ name: 'Dashboard' })
}

const navigate =() => router.push({ name: 'StepCreate', params: { id: recipeId } } as any)

</script>

<template>
  <div class="min-h-screen" v-if="recipe">
    <PrevButton />
    <div
      class="flex flex-col rounded-lg border border-gray-200 bg-white shadow md:max-w-full lg:flex-row"
    >
      <div class="picture relative lg:w-1/2">
        <div class="absolute right-12 top-16">
          <div class="flex flex-col text-right">
            <h5
              class="mb-2 bg-slate-200 px-2 py-2 font-customFont text-4xl font-bold tracking-tight text-black mix-blend-screen lg:text-6xl"
            >
              {{ recipe.tittle }}
            </h5>
            <hr />
            <h6 class="font-mono text-2xl text-amber-200 lg:text-4xl">{{ category }}</h6>
          </div>
        </div>

        <img
          class="w-full rounded-t-lg object-cover md:h-auto md:rounded-lg"
          :src="recipe.picture_link"
          alt=""
        />
        <div
          class="absolute bottom-0 left-0 right-0 mx-auto my-2 flex flex-row justify-between gap-4 bg-slate-100 px-8 py-2 font-customFont opacity-50 transition-opacity duration-300 ease-in-out hover:opacity-100 hover:shadow-lg"
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
            <a
              :href="recipe.video_link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-grey-500 text-center hover:underline"
            >
              Video
            </a>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-col lg:w-1/2">
        <!-- Toggle switch for Instructions and Steps -->
        <label
          for="toggleSwitch"
          class="flex cursor-pointer justify-center rounded-md p-2 opacity-75 dark:text-gray-800"
        >
          <input id="toggleSwitch" type="checkbox" class="peer hidden" v-model="showInstructions" />
          <span
            class="w-28 rounded-l-md bg-yellow-200 px-4 py-2 text-center font-mono font-semibold shadow-md peer-checked:bg-gray-200 peer-checked:hover:bg-gray-400"
            :class="{ 'bg-gray-300': !showInstructions }"
            >Steps</span
          >
          <span
            class="rw-28 rounded-r-md bg-gray-300 px-4 py-2 text-center font-mono font-semibold shadow-md hover:bg-gray-400 peer-checked:bg-yellow-200"
            :class="{ 'bg-violet-400': showInstructions }"
            >Instructions</span
          >
        </label>

        <div v-if="showInstructions">
          <div class="mx-4 flex flex-wrap justify-start">
            <Instructions v-for="step in steps" role="listitem" :key="step.id" :step="step" />
          </div>
        </div>
        <div v-else>
          <div v-if="steps.length > 0" class="mx-4 flex flex-wrap justify-start">
            <Step
              v-for="step in steps"
              role="listitem"
              :key="step.id"
              :step="step"
              class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2"
            />
          </div>
          <div v-else class="flex justify-center">
            <fwb-button @click="navigate" class="my-8 bg-green-300">Add description</fwb-button>
          </div>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <UpdateButton :route="{ name: 'StepUpdateView' }" class="m-2" />
        <DeleteButton class="m-2 h-12" @click="deleteFunction" />
      </div>
    </div>
  </div>
  <div v-else class="m-10 flex justify-center">
    <ArrowPathIcon aria-hidden="true" class="inline h-8 w-8 animate-spin text-stone-600" />
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
