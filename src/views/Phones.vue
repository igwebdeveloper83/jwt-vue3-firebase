<template>
  <div>
    <h2>Phones</h2>
    <Loader v-if="showLoader" />
    <div class="flex flex-column gap-3" v-else>
      <Card v-for="(phone, i) in phones" :key="i">
        <template #title> {{ phone.name }} </template>
        <template #subtitle> {{ phone.type }} </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import Card from 'primevue/card'
import Loader from '../components/Loader.vue'
import axios from 'axios'

const authStore = useAuthStore()

const phones = ref()
const showLoader = ref(false)

const getPhones = async () => {
  showLoader.value = true
  try {
    const response = await axios.get(
      `https://jwt-vue3-firebase-82c4e-default-rtdb.europe-west1.firebasedatabase.app/phone.json?auth=${authStore.userInfo.token}`
    )
    phones.value = response.data
  } catch (err) {
    console.log(err.response)
  } finally {
    showLoader.value = false
  }
}

onMounted(async () => await getPhones())
</script>
