<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function navigate() {
  router.push({ name: 'userProfileCreate' })
}
</script>

<template>
  <button
    @click.prevent="navigate"
    data-testid="createUserProfile"
    class="inline-flex items-center rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white opacity-80 hover:bg-green-700"
  >
  Create your profile
  </button>
</template>
