<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'
import AlertError from '@/components/AlertError.vue'
import { type UserProfileUpdate } from '@mono/server/src/shared/entities'

const route = useRoute()
const userProfileId = Number(route.params.id)


const router = useRouter()
const userProfile = ref<UserProfileUpdate>({
  name: '',
  surname: '',
  profile_picture: '',
  about: '',
})
const errorMessage = ref('')
const isLoading = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    isLoading.value = true
    const userProfileFound = await trpc.userProfile.get.query(userProfileId)

    userProfile.value = userProfileFound
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
})

async function updateUserProfile() {
  try {
    isLoading.value = true
    await trpc.userProfile.update.mutate({ ...userProfile.value, userId: userProfileId })
    router.push({ name: 'Dashboard' })
  } catch (error: any) {
    errorMessage.value = error.message || 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex justify-center">
    <form aria-label="UserProfile" @submit.prevent="updateUserProfile">
      
     <!--  resolve this bug with v-if -->
      <FwbInput label="Name" v-model="userProfile.name" type="text" />

      <FwbInput
        label="Surname"
        v-model="userProfile.surname"
        type="text"
      />
      <FwbInput
        label="Picture link"
        v-model="userProfile.profile_picture"
        type="text"
        placeholder="http://"
      />

      <FwbTextarea
        label="About"
        name="about"
        v-model="userProfile.about"
        placeholder="Few words about yourself"
      />
      <div v-if="isLoading" class="text-center text-gray-600">Updating profile...</div>
      <AlertError :message="errorMessage" />
      <div class="mt-8 grid grid-cols-2 items-center gap-3">
        <FwbButton type="submit">Save</FwbButton>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          component="RouterLink"
          :to="{ name: 'Dashboard' }"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>
