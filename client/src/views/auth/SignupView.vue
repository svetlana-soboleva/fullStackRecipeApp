<script lang="ts" setup>
import { signup } from '@/stores/user'
import { ref } from 'vue'
import PageForm from '@/components/PageForm.vue'
import { FwbAlert, FwbButton, FwbInput } from 'flowbite-vue'
import { DEFAULT_SERVER_ERROR } from '@/consts'
import AlertError from '@/components/AlertError.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userForm = ref({
  email: '',
  password: '',
})



const errorMessage = ref('')
async function submitSignup() {
  try {
    await signup(userForm.value)
    errorMessage.value = ''
    router.push({ name: 'Login'})
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : DEFAULT_SERVER_ERROR
  }
}
</script>

<template>
  
  <PageForm class="signupBg font-customFont"
    heading="Sign up for an account"
    formLabel="Signup"
    @submit="submitSignup"
  >
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

<style scoped>
.signupBg{
  background-image: url("../../assets/macaron.jpeg");
  background-size:cover;
background-repeat: no-repeat;
background-position: center;
}
</style>