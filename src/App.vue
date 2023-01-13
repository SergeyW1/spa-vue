<template>
  <div class="app">
    <form class="spa-list" @submit.prevent>
      <div class="spa-conteiner">
        <div class="spa-conteiner__title">
          <h1>Currency Converter</h1>
        </div>
        <div class="spa-conteiner__inputs">
          <div class="entry-field">
            <div>
              <h4>Amount</h4>
              <input class="input" type="text" v-model.number="amount" />
            </div>
            <div v-if="isPostsLoading" class="entry-field__title">
              <p class="entry-field__name">
                {{ result !== "" ? description : "" }}
              </p>
              <span
                >{{ amount }} {{ fromCurrency }} = {{ result.toFixed(4) }}
                {{ toCurrency }}</span
              >
            </div>
          </div>
          <div class="currency-fields">
            <div class="select-wrapper">
              <h4>To</h4>
              <select class="select" v-model="toCurrency">
                <option
                  :value="item.code"
                  v-for="item of currencies"
                  :key="item"
                >
                  {{ item.code }} - {{ item.description }}
                </option>
              </select>
            </div>
            <div class="select-wrapper">
              <h4>From</h4>
              <select class="select" v-model="fromCurrency">
                <option
                  :value="item.code"
                  v-for="item of currencies"
                  :key="item"
                >
                  {{ item.code }} - {{ item.description }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="add-convert">
          <div class="current-exchange" v-if="currentExchange">
            <h4>Курсы валют национальных банков</h4>
            <span>{{ amount }} USD = {{ resultUSD }} RUB</span>
            <span>{{ amount }} EUR = {{ resultEUR }} RUB</span>
          </div>
          <div :class="!currentExchange ? 'btn-addFetch' : 'btn-addFetch2'">
            <button class="btn" @click="fetchConverted">Converted</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currencies: [],
      currentExchange: false,
      isPostsLoading: false,
      isSelectLoading: true,
      amount: 1,
      toCurrency: "RUB",
      fromCurrency: "USD",
      result: 0,
      resultEUR: 0,
      resultUSD: 0,
      description: "",
      fromEUR: "EUR",
      fromUSD: "USD",
    };
  },
  methods: {
    async fetchConverted() {
      const { formValid, fromCurrency, amount, toCurrency } = this;
      if (!formValid) {
        return;
      }
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/latest?base=${fromCurrency}`
        );
        const rates = await response.data.rates;
        this.result = amount * rates[toCurrency];
      } catch (e) {
        alert("Converted Error", e);
      } finally {
        this.fetchCurrencyDefault();
        this.description = this.currencies[this.toCurrency].description;
        this.isPostsLoading = true;
        this.currentExchange = true;
      }
    },
    async fetchCurrencyList() {
      try {
        const response = await axios.get(
          "https://api.exchangerate.host/symbols"
        );
        this.currencies = await response.data.symbols;
      } catch (e) {
        alert("List Error", e);
      }
    },
    async fetchCurrencyDefault() {
      const responseEUR = await axios.get(
        `https://api.exchangerate.host/latest?base=${this.fromEUR}`
      );
      const responseUSD = await axios.get(
        `https://api.exchangerate.host/latest?base=${this.fromUSD}`
      );
      const ratesEUR = responseEUR.data.rates;
      const ratesUSD = responseUSD.data.rates;
      this.resultEUR = this.amount * ratesEUR["RUB"];
      this.resultUSD = this.amount * ratesUSD["RUB"];
    },
  },
  computed: {
    formValid() {
      const { amount, toCurrency, fromCurrency } = this;
      return +amount > 0 && toCurrency && fromCurrency;
    },
  },
  mounted() {
    this.fetchCurrencyDefault();
    this.fetchCurrencyList();
  },
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

.spa-conteiner__inputs {
  display: flex;
  width: 600px;
  height: 200px;
  justify-content: space-between;
  align-items: center;
}

.spa-conteiner__inputs h4 {
  font-weight: 500;
}

.entry-field {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80%;
}

.currency-fields {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 15px;
  height: 70%;
}

.input {
  padding: 15px;
  border: 2px solid #14509b;
  border-radius: 6px;
  background: #efedd5;
  outline: none;
}

.select {
  font-size: 14px;
  padding: 10px;
  width: 322px;
  border-radius: 7px;
  background: #efedd5;
  border: 2px solid #14509b;
  position: relative;
  border-radius: 6px;
  font-family: inter, cursive;
  font-weight: 600;
  cursor: pointer;
  appearance: none;
}

.select-wrapper {
  position: relative;
}

.select-wrapper::after {
  content: "";
  position: absolute;
  top: calc(61% - 4px);
  right: 8px;
  width: 20px;
  height: 20px;
  background-image: url(./assets/arrow-short-down.svg);
  background-repeat: no-repeat;
  background-size: 100%;
}

.btn {
  padding: 10px 14px;
  background: #f48f44;
  color: #fff;
  border: 1px solid;
  border-radius: 7px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Comfortaa", cursive;
  border: 1px solid #f48f44;
}

.btn:hover {
  background: #af6832;
  border: 1px solid #af6832;
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

/* .current-exchange {
  float: left;
} */

.add-convert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Inter, sans-serif;
  height: 90px;
}

.entry-field__title {
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  color: rgb(46, 60, 87);
  font-size: 21px;
  flex-direction: column;
}

.entry-field__name {
  font-size: 13px;
  font-family: monospace;
  color: #00000082;
}

.add-convert__btn {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}

.current-exchange__item {
  margin: 8px 0;
  border-bottom: 1px solid black;
}

.current-exchange {
  animation: ani 2.5s forwards;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  height: 70px;
  justify-content: space-between;
}
</style>
