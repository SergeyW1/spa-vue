<template>
  <div
    :class="isPostsLoading ? 'current-exchange__active' : 'current-exchange'"
  >
    <div class="current-exchange__item">
      <h3>Курсы валют национальных банков!</h3>
      <div class="current-currencies">
        <span>{{ amount }} USD = {{ resultUSD.toFixed(4) }} RUB</span>
        <span>{{ amount }} EUR = {{ resultEUR.toFixed(4) }} RUB</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "current-exchange",
  props: {
    amount: Number,
    isPostsLoading: Boolean,
    resultEUR: Number,
    resultUSD: Number,
  },
};
</script>

<style scoped>
.current-exchange__item {
  margin: 8px 0;
  border-bottom: 1px solid black;
}

.current-currencies {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  height: 50px;
  justify-content: space-evenly;
}

.current-exchange__active {
  opacity: 1;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  height: 110px;
  justify-content: space-between;
  color: rgb(46, 60, 87);
  font-weight: 600;
  transition: ease 0.5s;
}
.current-exchange {
  visibility: hidden;
  opacity: 0;
  font-weight: 600;
}
</style>