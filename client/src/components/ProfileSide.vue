<script lang="ts" setup>
import { trpc } from '@/trpc'
import { ref, onBeforeMount } from 'vue'
import { type UserProfileBare } from '@mono/server/src/shared/entities'
import { FwbButton } from 'flowbite-vue'

const userProfile = ref<UserProfileBare>()

onBeforeMount(async () => {
  userProfile.value = await trpc.userProfile.find.query()
})

const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
</script>

<template>
  <div
    v-if="userProfile"
    class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex justify-end px-4 pt-4">
      <!-- Dropdown button and menu here -->
      <button
        id="dropdownButton"
        data-dropdown-toggle="dropdown"
        class="absolute inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="button"
        @click="toggleDropdown"
      >
        <svg
          class="h-5 w-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdown"
        class="absolute top-36 z-10 w-32 list-none divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700"
        v-show="isDropdownOpen"
      >
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
          <li>
            <router-link
              :to="{ name: 'userProfileUpdate', params: { id: userProfile.id } }"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit profile
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="mx-2 flex flex-col items-center pb-10">
      <img
        v-if="userProfile.profile_picture"
        class="mb-3 h-24 w-24 rounded-full shadow-lg"
        :src="userProfile.profile_picture"
        alt="Profile Picture"
      />
      <img
        v-else
        class="mb-3 h-24 w-24 rounded-full shadow-lg"
        src="../assets/profile.png"
        alt="User Default Picture"
      />
      <h5 class="mb-1 text-center text-xl font-medium text-gray-900 dark:text-white">
        {{ userProfile.name }} {{ userProfile.surname }}
      </h5>
      <span class="text-center text-sm text-gray-500 dark:text-gray-400">{{
        userProfile.about
      }}</span>
    </div>
  </div>
  <div
    v-else
    class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex h-24 flex-col items-center justify-center gap-4">
      <span class="text-gray-500 dark:text-gray-400">No user profile</span>
      <FwbButton
        component="RouterLink"
        tag="router-link"
        :href="{ name: 'userProfileCreate' } as any"
        data-testid="createProject"
        size="sm"
      >
        Create your profile
      </FwbButton>
    </div>
  </div>
</template>
