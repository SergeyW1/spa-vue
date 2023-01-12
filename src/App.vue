<template>
  <div class="app">
    <div class="spa-list">
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
                {{ convert !== "" ? to : "" }}
              </p>
              <span>{{ convert }}</span>
            </div>
            <div v-else style="position: absolute; top: 100px; left: 65px">
              <span>Loading...</span>
            </div>
          </div>
          <div class="currency-fields">
            <div class="select-wrapper">
              <h4>To</h4>
              <select class="select" name="From" v-model="to">
                <option
                  v-for="item in currencies"
                  :key="item.currencies"
                  :value="item.code"
                >
                  {{ item.code }} - {{ item.description }}
                </option>
              </select>
            </div>
            <div class="select-wrapper">
              <h4>From</h4>
              <select class="select" name="to" v-model="from">
                <option
                  v-for="item in currencies"
                  :key="item.currencies"
                  :value="item.code"
                >
                  {{ item.code }} - {{ item.description }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="add-convert">
          <div class="current-exchange" v-show="currentExchange">
            <div v-for="(item, index) in defaultCurrencies" :key="index">
              <div class="current-exchange__item">
                {{ amount }} {{ item.name }} = {{ item.num }} {{ to }}
              </div>
            </div>
          </div>
          <div :class="!currentExchange ? 'btn-addFetch' : 'btn-addFetch2'">
            <!-- <button class="btn" @click="fetchConverter">Convert</button> -->
            <button class="btn" @click="fetchConverted">fetchConverted</button>
          </div>
        </div>
        <div v-for="item in baseCurrencies" :key="item.baseCurrencies">
          <p>{{ item.USD }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currencies: [],
      baseCurrencies: [],
      currentExchange: false,
      isPostsLoading: true,
      isSelectLoading: true,
      convert: "",
      amount: "1",
      to: "RUB",
      from: "USD",
      fromEuro: "EUR",
      fromUSD: "USD",
      defaultCurrencies: [],
      list: [],
    };
  },
  methods: {
    // async fetchConverter() {
    //   this.isPostsLoading = false;
    //   try {
    //     const amountNumber = this.amount;
    //     const toCurrency = this.to;
    //     const fromCurrency = this.from;
    //     const response = await axios.get(
    //       `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amountNumber}`
    //     );
    //     const responseEuro = await axios.get(
    //       `https://api.exchangerate.host/convert?from=${this.fromEuro}&to=${toCurrency}&amount=${amountNumber}`
    //     );
    //     const responseUSD = await axios.get(
    //       `https://api.exchangerate.host/convert?from=${this.fromUSD}&to=${toCurrency}&amount=${amountNumber}`
    //     );

    //     const list = await axios.get(`https://api.exchangerate.host/latest`);
    //     console.log(list.data);
    //     console.log("rates:", list.data.rates);
    //     this.list = list.data;
    //     console.log(list);
    //     this.defaultCurrencies = [
    //       {
    //         name: this.fromEuro,
    //         num: responseEuro.data.result.toFixed(2),
    //       },
    //       {
    //         name: this.fromUSD,
    //         num: responseUSD.data.result.toFixed(2),
    //       },
    //     ];
    //     this.convert =
    //       (await response.data.result).toFixed(2) + " " + toCurrency;
    //   } catch (e) {
    //     console.log("Error", e);
    //   } finally {
    //     this.currentExchange = true;
    //     this.isPostsLoading = true;
    //   }
    // },
    async fetchConverted() {
      try {
        const response = await axios.get(
          `https://api.exchangerate.host/latest?base=RUB`
        );
        this.baseCurrencies = response.data.rates;
        console.log(this.baseCurrencies);
      } catch (e) {
        alert("Converted Error", e);
      }
    },
    async fetchCurrencyList() {
      try {
        const response = await axios.get(
          "https://api.exchangerate.host/symbols"
        );
        this.currencies = response.data.symbols;
      } catch (e) {
        alert("List Error", e);
      }
    },
  },
  mounted() {
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
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(45, 147, 253, 1) 100%
  );
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
  background-color: aliceblue;
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
  border: 1px solid #a1a1a1;
  border-radius: 6px;
  background-color: aliceblue;
  outline: none;
}

.select {
  font-size: 14px;
  padding: 10px;
  width: 322px;
  border-radius: 7px;
  background-color: aliceblue;
  border: 1px solid #a1a1a1;
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
  background: #2697ff;
  color: #fff;
  border: 1px solid;
  border-radius: 7px;
  cursor: pointer;
  font-size: 17px;
  font-family: "Comfortaa", cursive;
}

.btn:hover {
  background: #1d71c0;
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
}

.entry-field__title {
  position: relative;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  color: rgb(46, 60, 87);
  font-size: 26px;
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
</style>
