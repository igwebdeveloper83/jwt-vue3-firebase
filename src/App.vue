<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

const checkUser = () => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  if (token) {
    authStore.userInfo.token = token.token
    authStore.userInfo.refreshToken = token.refreshToken
    authStore.userInfo.expiresIn = token.expiresIn
  }
  console.log(authStore.userInfo)
}
checkUser()
</script>

<template>
  <div class="menu">
    <RouterLink class="menu_link" to="/">Home</RouterLink>
    <RouterLink class="menu_link" v-if="!token" to="/signin">Signin</RouterLink>
    <RouterLink class="menu_link" v-if="!token" to="/signup">Signup</RouterLink>
    <RouterLink class="menu_link" v-if="token" to="/phones">Phones</RouterLink>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 30px;
}
.menu_link {
  color: black;
  margin: 0 20px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
