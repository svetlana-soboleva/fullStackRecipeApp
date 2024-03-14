<script setup lang="ts">
import ResponsiveNavBar from './ResponsiveNavBar.vue'

import { logout } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = [
  { label: 'Dashboard', name: 'Dashboard' },
  { label: 'All Recipes', name: 'All Recipes' },
]

function logoutUser() {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <ResponsiveNavBar :links="links">
    <template #menu>
      <button
        @click="logoutUser"
        class="mx-12 w-28 cursor-pointer rounded-xl duration-300 hover:text-green-400"
      >
        Logout
      </button>
    </template>
  </ResponsiveNavBar>
</template>
