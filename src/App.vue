<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Button from 'primevue/button'
import router from './router'

const authStore = useAuthStore()

const token = computed(() => authStore.userInfo.token)

// Function to handle user logout
const logOut = () => {
  authStore.logout()
  localStorage.removeItem('userToken')
  router.push('/signin')
}

// Function to check for an existing user token in localStorage and update the authStore
const checkUser = () => {
  const token = JSON.parse(localStorage.getItem('userToken'))
  if (token) {
    // Update the authStore with the user token and refresh token
    authStore.userInfo.token = token.token
    authStore.userInfo.refreshToken = token.refreshToken
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
    <Button
      label="Logout"
      v-if="token"
      icon="pi pi-user"
      class="w-7rem"
      @click.prevent="logOut"
    ></Button>
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
