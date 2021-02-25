<template>
  <div>
    <div v-if="throwError">{{ error }}</div>
    <br>
    <form @submit="registerUser">
      <input required tpye="email" placeholder="E-Mail" v-model="emailInput" />
      <br>
      <br>
      <input required placeholder="Firstname" v-model="firstnameInput" />
      <br>
      <br>
      <input required placeholder="Lastname" v-model="lastnameInput" />
      <br>
      <br>
      <input required type="password" placeholder="Password" v-model="passwordInput" />
      <br>
      <br>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { useStore } from "vuex"
import {
  register
} from "../utils/functions/register";

export default defineComponent({
  name: "RegisterComponent",

  async setup() {
    const router = useRouter()
    const store = useStore()

    const emailInput = ref()
    const passwordInput = ref()
    const firstnameInput = ref()
    const lastnameInput = ref()

    const throwError = ref(false)
    const error = ref()

    async function registerUser(e) {
      e.preventDefault()
      const response = await register({
        email: emailInput.value,
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        password: passwordInput.value
      })

      try {
        const user = response.response.data.user
        const token = response.response.data.token
        const { id } = response.response.data.user

        store.commit("setUser", user)
        store.commit("setToken", token)

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
