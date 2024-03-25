<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { PencilIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  route: { name: string }
}>()

const router = useRouter()

function navigate() {
  router.push({ name: props.route.name })
}
</script>

<template>
  <button
  data-testId="updateBtn"
    @click.prevent="navigate"
    class="h-12 w-12 items-center rounded-md bg-green-300 p-4 text-sm font-medium text-white opacity-80 hover:bg-green-400"
  >
    <PencilIcon />
  </button>
</template>
