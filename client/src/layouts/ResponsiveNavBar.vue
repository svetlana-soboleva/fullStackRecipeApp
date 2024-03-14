<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Bars3BottomRightIcon } from '@heroicons/vue/24/outline'
import { XCircleIcon } from '@heroicons/vue/24/outline'

const nav = ref(false)
const router = useRouter()

const { links } = defineProps<{
  links: {
    label: string
    name: string
  }[]
}>()

const route = useRoute()

const navigation = computed(() =>
  links.map((item) => ({
    ...item,
    isActive: route.name === item.name,
  }))
)

const handleNavItem = (link: any) => {
  router.push({ name: link })
}

const toggleNav = () => {
  nav.value = !nav.value
}
</script>
<template>
  <div class="mx-auto font-customFont font-semibold flex h-24 items-center justify-between bg-white px-4 text-black">
    <!-- Logo -->
    <img src="../assets/logo.svg" alt="" class="w-32" />

    <!-- Desktop Navigation -->
    <ul class="hidden md:flex">
      <li
        v-for="link in navigation"
        :key="link.name"
        @click="handleNavItem(link.name)"
        class="mx-4 w-28 cursor-pointer rounded-xl duration-300 hover:text-green-400"
        :class="{ 'text-green-700': link.isActive}" 
      >
        {{ link.label }}
      </li>
    </ul>
    <slot name="menu"></slot>

    <!-- Mobile Navigation Icons -->
    <div @click="toggleNav" class="absolute right-8 z-10 md:hidden">
      <div v-if="nav">
        <XCircleIcon aria-hidden="true" class="ms-4 inline h-6 w-6 hover:text-red-400" />
      </div>
      <div v-else>
        <Bars3BottomRightIcon aria-hidden="true" class="ms-4 inline h-6 w-6 hover:text-green-400" />
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <ul
      v-if="nav"
      class="w-26 absolute right-10 top-16 z-20 flex flex-col items-center justify-center rounded-lg bg-slate-200 opacity-70 md:hidden"
    >
      <!-- Mobile Navigation Items -->
      <li
        v-for="link in navigation"
        :key="link.name"
        :is-active="link.isActive"
        @click="handleNavItem(link.name)"
        class="w-40 px-4 py-2 text-center text-lg text-green-600 transition-colors duration-300 hover:text-[#00df9a]"
      >
        {{ link.label }}
      </li>
    </ul>
  </div>

  <main>
    <div class="container mx-auto px-6 py-8">
      <RouterView />
    </div>
  </main>
</template>
