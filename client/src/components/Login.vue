<template>
  <div>
    <div v-if="throwError">{{ error }}</div>
    <br>
    <form @submit="loginUser">
      <input required tpye="email" placeholder="E-Mail" v-model="emailInput" />
      <br>
      <br>
      <input required type="password" placeholder="Password" v-model="passwordInput" />
      <br>
      <br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import {
  login
} from "../utils/functions/login";

export default defineComponent({
  name: "LoginComponent",

  async setup() {
    const store = useStore()
    const router = useRouter()

    const emailInput = ref()
    const passwordInput = ref()

    const throwError = ref(false)
    const error = ref()

    async function loginUser(e) {
      e.preventDefault()
      const response = await login(emailInput.value, passwordInput.value)

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
      passwordInput,
      loginUser
    }
  }
});
</script>

<style lang="scss" scoped></style>
