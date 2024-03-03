<script lang="ts" setup>
import { defineProps, defineEmits, onMounted } from 'vue'

defineProps(['categories'])

const emit = defineEmits(['selectedCategory', 'noCategory'])

const selectCategory = (categoryId: number) => {
  emit('selectedCategory', categoryId)
}

const noSelectedCategory = () => {
  emit('noCategory')
}

onMounted(() => {
  noSelectedCategory()
})
</script>

<template>
  <div class="my-6 flex flex-row flex-wrap items-center justify-center gap-4 ">
    <div
    @click="() => noSelectedCategory()"
      class="rounded-full border-2 border-solid border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs opacity-80 hover:bg-amber-200"
    >
      All
    </div>
    <div
      v-for="category in categories"
      :key="category.id"
      @click="() => selectCategory(category.id)"
      class="cursor-pointer rounded-full border-2 border-solid border-amber-300 bg-amber-100 px-4 py-2 text-center text-xs opacity-80 hover:bg-amber-200"
    >
      {{ category.name }}
    </div>
  </div>
</template>
