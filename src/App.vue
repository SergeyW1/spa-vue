<template>
  <div class="app">
    <div class="spa-list" @submit.prevent>
      <div class="spa-conteiner">
        <div class="spa-conteiner__title">
          <h1>Currency Converter</h1>
        </div>
        <my-select />
      </div>
    </div>
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
.spa-list {
  font-family: "Comfortaa", cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50em;
  margin: 0 auto;
  max-width: 400px;
}

.spa-conteiner {
  background: #efedd5;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px 0 rgb(0 0 0 / 20%);
}

.spa-conteiner__title {
  text-align: center;
}
</style>
