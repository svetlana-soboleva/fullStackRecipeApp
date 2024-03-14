<script setup lang="ts">
import ResponsiveNavBar from './ResponsiveNavBar.vue';

const links = [
  { label: 'Login', name: 'Login' },
  { label: 'Signup', name: 'Signup' },
]
</script>

<template>
  <ResponsiveNavBar :links="links"> </ResponsiveNavBar>
</template>
