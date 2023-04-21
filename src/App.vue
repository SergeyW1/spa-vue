<template>
  <div class="app">
    <my-select />
  </div>
</template>

<script setup>
import MySelect from "./components/MySelect.vue";
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  height: 100vh;
  background: #ebebeb;
}
</style>
