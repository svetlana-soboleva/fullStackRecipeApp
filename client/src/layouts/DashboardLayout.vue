<script setup lang="ts">
import { FwbNavbarLink } from 'flowbite-vue'
import StackedLayout from './StackedLayout.vue'
import { logout } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = [{ label: 'Dashboard', name: 'Dashboard' }]

function logoutUser() {
  logout()
  router.push({ name: 'Login' })
}

function toAllRecipes() {
  router.push({ name: 'AllRecipes' })
}
</script>

<template>
  <StackedLayout :links="links">
    <template #menu>
      <FwbNavbarLink @click.prevent="toAllRecipes" link="#">All Recipes</FwbNavbarLink>
      <FwbNavbarLink @click.prevent="logoutUser" link="#">Logout</FwbNavbarLink>
    </template>
  </StackedLayout>
</template>
