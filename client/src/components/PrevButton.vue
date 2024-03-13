<script lang="ts" setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/welcome', label: 'AllRecipes' },
]
</script>

<template>
  <div class="relative z-50">
    <Menu>
      <MenuButton
        class="my-2 rounded-l-lg bg-yellow-200 px-4 py-2 text-slate-600 shadow-md hover:bg-lime-100"
      >
        Back
      </MenuButton>
      <MenuItems class="absolute left-0 w-28 rounded-lg bg-slate-200 p-2 opacity-70">
        <MenuItem
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          as="a"
          class="my-2 flex flex-col text-center font-semibold text-slate-700"
        >
          {{ link.label }}
        </MenuItem>
      </MenuItems>
    </Menu>
  </div>
</template>
