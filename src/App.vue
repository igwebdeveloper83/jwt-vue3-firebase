<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
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
</style>
