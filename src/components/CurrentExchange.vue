<template>
  <div class="add-convert">
    <div
      :class="
        !currentExchange ? 'current-exchange' : 'current-exchange__active'
      "
    >
      <h4>Курсы валют национальных банков!</h4>
      <span>{{ amount }} USD = {{ resultUSD }} RUB</span>
      <span>{{ amount }} EUR = {{ resultEUR }} RUB</span>
    </div>
    <div :class="!currentExchange ? 'btn-addFetch' : 'btn-addFetch2'">
      <my-buttons class="btn" @click="fetchConverted">Converted</my-buttons>
    </div>
  </div>
</template>

<script>
import MyButtons from "./MyButtons.vue";
export default {
  components: { MyButtons },
  props: {
    amount: Number,
    currentExchange: Boolean,
  },
};
</script>

<style scoped>
.add-convert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Inter, sans-serif;
  height: 90px;
}
.current-exchange__item {
  margin: 8px 0;
  border-bottom: 1px solid black;
}
.current-exchange__active {
  opacity: 1;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-between;
}
.current-exchange {
  visibility: hidden;
  opacity: 0;
}
.btn-addFetch {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn-addFetch2 {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
</style>