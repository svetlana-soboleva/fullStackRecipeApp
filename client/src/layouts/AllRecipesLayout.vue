<script setup lang="ts">
import ResponsiveNavBar from './ResponsiveNavBar.vue'

const links = [
  { label: 'Dashboard', name: 'Dashboard' },
  { label: 'All Recipes', name: 'All Recipes' },
]
</script>

<template>
  <ResponsiveNavBar :links="links"> </ResponsiveNavBar>
</template>
