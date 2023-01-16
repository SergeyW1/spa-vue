<template>
  <div class="app">
    <my-select />
  </div>
</template>

<script>
import MySelect from "./components/MySelect.vue";
export default {
  components: { MySelect },
};
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
