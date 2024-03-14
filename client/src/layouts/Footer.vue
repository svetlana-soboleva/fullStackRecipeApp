<script lang="ts" setup></script>

<template>
  <footer class=" m-4 rounded-lg bg-white shadow dark:bg-gray-800">
    <div class="flex w-full flex-col items-center justify-between p-4 md:flex-row">
      <span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center"
        >© 2024 Svetlana Soboleva
      </span>
      <ul class="flex gap-6 text-sm font-medium">
        <li>
          <a href="https://www.instagram.com/baketimeoff/" class="mx-5">
            <div aria-label="Instagram">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#718096"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-instagram"
                style="--hover-stroke-color: #1cac78"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </div>
          </a>
        </li>
        <li>
          <a href="https://github.com/svetlana-so" class="mx-5">
            <div aria-label="Github">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#718096"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-github"
                style="--hover-stroke-color: #1cac78"
              >
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                ></path>
              </svg>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
<style scoped>
.feather-github:hover,
.feather-instagram:hover {
  stroke: var(--hover-stroke-color);
}

</style>
