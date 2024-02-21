<script lang="ts" setup>
import { signup } from '../stores/user'
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput, FwbSelect, FwbCheckbox } from 'flowbite-vue'
import AlertError from '../components/AlertError.vue'

import { DEFAULT_SERVER_ERROR } from '../consts'

const userForm = ref({
  email: '',
  password: '',
  username: '',
  admin: false,
  secretToken: '',
})

const roleOptions = [
  { value: true, name: 'Admin' },
  { value: false, name: 'User' },
]

const hasSucceeded = ref(false)
const errorMessage = ref('')

async function submitSignup() {
  try {
    if (userForm.value.admin) {
      if (!userForm.value.secretToken) {
        throw new Error('Secret token is required to set admin role.')
      }

      if (userForm.value.secretToken !== import.meta.env.VITE_SECRET_TOKEN) {
        throw new Error('Invalid secret token.')
      }
    }
    await signup(userForm.value)
    hasSucceeded.value = true
    errorMessage.value = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : DEFAULT_SERVER_ERROR
  }
}
</script>

<template>
  <PageForm heading="Sign up for an account" formLabel="Signup" @submit="submitSignup">
    <template #default>
      <FwbInput label="Email" type="email" v-model="userForm.email" :required="true" />

      <FwbInput
        label="Password"
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        v-model="userForm.password"
        :required="true"
      />
      <FwbInput label="Username" type="text" v-model="userForm.username" :required="true" />
      <FwbCheckbox v-model="userForm.admin" label="Admin Mode" />

      <FwbSelect v-model="userForm.admin" :options="roleOptions" label="Select a role" />

      <FwbInput
        v-if="userForm.admin"
        label="Secret Token"
        type="password"
        v-model="userForm.secretToken"
        :required="userForm.admin"
      />

      <FwbAlert v-if="hasSucceeded" data-testid="successMessage" type="success">
        You have successfully signed up! You can now log in.
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >Go to the login page</RouterLink
        >
      </FwbAlert>
      <AlertError :message="errorMessage">
        {{ errorMessage }}
      </AlertError>

      <div class="grid">
        <FwbButton color="green" type="submit" size="xl">Sign up</FwbButton>
      </div>
    </template>

    <template #footer>
      <FwbAlert class="bg-transparent text-center">
        Already a member?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >Log in</RouterLink
        >
      </FwbAlert>
    </template>
  </PageForm>
</template>
