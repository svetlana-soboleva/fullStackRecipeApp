<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue'
</script>

<template>
  <!-- landing page with Tailwind -->
  <div class="bg-white dark:bg-gray-800 lg:mx-auto lg:w-2/3">
    <div class="container mx-auto px-8 py-8">
      <div class="items-center lg:flex">
        <div class="lg:w-1/2">
          <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Create your own recipe book!
          </h2>

          <p class="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
            Craft, Share, Delight! <br />
            Where creativity blossoms, communities connect, and every meal tells a unique story!
          </p>

          <div class="mt-6 flex items-center gap-2">
            <!-- prettier-ignore -->
            <FwbButton
              component="RouterLink"
              tag="router-link"
              color="green"
              :href="({ name: 'Signup' } as any)"
            >
              Get Started
            </FwbButton>
            <FwbButton
              component="RouterLink"
              tag="router-link"
              color="alternative"
              :href="{ name: 'Login' } as any"
            >
              Log in
            </FwbButton>
          </div>
        </div>

        <div class="mt-8 lg:mt-0 lg:w-1/2">
          <div class="flex items-center justify-center lg:justify-end">
            <div class="max-w-lg md:p-8">
              <picture>
                <source srcset="../assets/landing1.jpeg" type="image/jpeg" />
                <img class="w-full rounded-lg" src="../assets/landing1.jpeg" alt="" />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
