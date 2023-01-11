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
              <p class="currency-symbol">{{ currency }}</p>
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
              <h4>From</h4>
              <select
                v-if="isSelectLoading"
                class="select"
                name="Tos"
                v-model="from"
              >
                <option v-for="(item, name, index) in currencies" :key="index">
                  {{ name }} - {{ item }}
                </option>
              </select>
              <select v-else class="select">
                <option value="" selected>loading...</option>
              </select>
            </div>
            <div class="select-wrapper">
              <h4>To</h4>
              <select
                v-if="isSelectLoading"
                class="select"
                name="From"
                v-model="to"
              >
                <option v-for="(item, name, index) in currencies" :key="index">
                  {{ name }} - {{ item }}
                </option>
              </select>
              <select v-else class="select">
                <option value="" selected>loading...</option>
              </select>
            </div>
          </div>
        </div>
        <div class="add-convert">
          <button class="btn" @click="fetchConverter">Convert</button>
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
      isPostsLoading: true,
      isSelectLoading: true,
      convert: "",
      currency: "",
      amount: "1",
      to: "RUB - Russian Ruble",
      from: "USD - United States Dollar",
      requestOptions: {
        method: "GET",
        redirect: "follow",
        headers: {
          apikey: "jtdVTZag9x3ks293RWNmshZYpjgERq8t",
        },
      },
    };
  },
  methods: {
    async fetchConverter() {
      this.isPostsLoading = false;
      try {
        const amountNumber = this.amount;
        const toCurrency = this.to.split("").slice(0, 3).join("");
        const fromCurrency = this.from.split("").slice(0, 3).join("");
        const response = await axios(
          `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amountNumber}`
        );
        this.convert = (await response.data.result) + " " + toCurrency;
      } catch (e) {
        console.log("Error", e);
      } finally {
        this.load = true;
        this.isPostsLoading = true;
      }
    },
    async fetchCurrencies() {
      this.isSelectLoading = false;
      try {
        const response = await axios(
          "https://api.apilayer.com/currency_data/list",
          this.requestOptions
        );
        this.currencies = await response.data.currencies;
      } catch (e) {
        alert("error async", e);
      } finally {
        this.isSelectLoading = true;
      }
    },
  },
  mounted() {
    this.fetchCurrencies();
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

.currency-symbol {
  position: absolute;
  top: 34px;
  left: 3px;
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

.add-convert {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: Inter, sans-serif;
}

.entry-field__title {
  margin-top: 14px;
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
</style>
