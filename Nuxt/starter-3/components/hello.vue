<template>
  <div>
    <input type="text" v-model="msg" />
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup>
const msg = ref("");
</script>

<style scoped></style>
