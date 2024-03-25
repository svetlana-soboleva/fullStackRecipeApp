<script setup lang="ts">
import { trpc } from '@/trpc'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue'
import AlertError from '@/components/AlertError.vue'
import { type UserProfileBare } from '@mono/server/src/shared/entities'
import useErrorMessage from '@/composables/useErrorMessage'

const router = useRouter()

const userProfile = ref({
  name: '',
  surname: '',
  profile_picture: '',
  about: '',
})


const [createUserProfile, errorMessage ] = useErrorMessage(async () => {
  (await trpc.userProfile.create.mutate({
      ...userProfile.value,
    })) as UserProfileBare
    router.push({ name: 'Dashboard' })
})

</script>

<template>
  <div class="flex min-h-screen justify-center">
    <form aria-label="UserProfile" @submit.prevent="createUserProfile">
      <FwbInput data-testid="userProfileName" label="Name" v-model="userProfile.name" type="text" />

      <FwbInput data-testid="userProfileSurname" label="Surname" v-model="userProfile.surname" type="text" />
      <FwbInput
        label="Picture link"
        v-model="userProfile.profile_picture"
        type="text"
        placeholder="http://"
        data-testid="userProfilePicture"
      />
      <FwbTextarea
        label="About"
        name="about"
        v-model="userProfile.about"
        placeholder="Few words about yourself"
        data-testid="userProfileAbout"
      />

      <AlertError :message="errorMessage" />

      <div class="mt-8 grid grid-cols-2 items-center gap-3">
        <FwbButton data-testid="saveBtnUserProfile" type="submit">Save</FwbButton>
        <RouterLink
          class="text-center text-sm font-semibold leading-6 text-red-500 hover:text-red-600"
          component="RouterLink"
          :to="{ name: 'Dashboard' }"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>
