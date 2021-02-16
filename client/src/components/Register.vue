<template>
  <div>
    <div v-if="throwError">{{ error }}</div>
    <br>
    <form @submit="registerUser">
      <input tpye="email" placeholder="E-Mail" v-model="emailInput" />
      <br>
      <br>
      <input placeholder="Firstname" v-model="firstnameInput" />
      <br>
      <br>
      <input placeholder="Lastname" v-model="lastnameInput" />
      <br>
      <br>
      <input type="password" placeholder="Password" v-model="passwordInput" />
      <br>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import {
  register
} from "../utils/functions/register";

export default defineComponent({
  name: "Register",

  async setup() {
    const router = useRouter()

    const emailInput = ref()
    const passwordInput = ref()
    const firstnameInput = ref()
    const lastnameInput = ref()

    const throwError = ref(false)
    const error = ref()

    async function registerUser(e) {
      e.preventDefault()
      const user = {
        email: emailInput.value,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        password: passwordInput.value
      }
      const response = await register(user)

      try {
        const token = response.response.data.token
        const { id } = response.response.data.user

        router.push({
          name: 'User',
          params: {
            userId: id
          }
        })
      } catch {
        throwError.value = true
        error.value = response.response.data
      }
    }

    return {
      throwError,
      error,
      emailInput,
      firstnameInput,
      lastnameInput,
      passwordInput,
      registerUser
    }
  }
});
</script>

<style lang="scss" scoped></style>
