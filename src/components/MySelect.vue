<template>
  <div class="spa-list" @submit.prevent>
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
          <div
            :class="
              isPostsLoading ? 'entry-field__title' : 'entry-field__no-active'
            "
          >
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
            <h4>Tos</h4>
            <select class="select" v-model="toCurrency">
              <option :value="item.code" v-for="item of currencies" :key="item">
                {{ item.code }} - {{ item.description }}
              </option>
            </select>
          </div>
          <div class="select-wrapper">
            <h4>From</h4>
            <select class="select" v-model="fromCurrency">
              <option :value="item.code" v-for="item of currencies" :key="item">
                {{ item.code }} - {{ item.description }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="add-convert">
        <current-exchange
          :isPostsLoading="isPostsLoading"
          :amount="amount"
          :resultEUR="resultEUR"
          :resultUSD="resultUSD"
        />
        <div :class="currentExchange ? 'btn-addFetch' : 'btn-addFetch__active'">
          <my-buttons @click="fetchConverted">Converted</my-buttons>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyButtons from "./MyButtons.vue";
import CurrentExchange from "./CurrentExchange.vue";
export default {
  components: { MyButtons, CurrentExchange },
  data() {
    return {
      fromEUR: "EUR",
      fromUSD: "USD",
      resultEUR: 0,
      resultUSD: 0,
      currencies: [],
      currentExchange: false,
      isPostsLoading: false,
      isSelectLoading: true,
      amount: 1,
      toCurrency: "RUB",
      fromCurrency: "USD",
      result: 0,
      description: "",
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
        this.description = this.currencies[this.toCurrency].description;
        this.isPostsLoading = true;
        this.currentExchange = true;
        this.fetchCurrencyDefault();
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
      this.resultEUR = this.amount * ratesEUR.RUB;
      this.resultUSD = this.amount * ratesUSD.RUB;
    },
  },
  mounted() {
    this.fetchCurrencyList();
  },
  computed: {
    formValid() {
      const { amount, toCurrency, fromCurrency } = this;
      return +amount > 0 && toCurrency && fromCurrency;
    },
  },
};
</script>

<style scoped>
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
.input {
  padding: 15px;
  border: 2px solid #14509b;
  border-radius: 6px;
  background: #efedd5;
  outline: none;
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
.entry-field__title {
  height: 97px;
  opacity: 1;
  position: relative;
  display: flex;
  font-weight: 600;
  color: rgb(46, 60, 87);
  font-size: 21px;
  flex-direction: column;
  transition: ease 0.5s;
  justify-content: center;
}

.entry-field__no-active {
  opacity: 0;
  visibility: hidden;
  font-weight: 600;
  font-size: 21px;
}

.entry-field__name {
  font-size: 13px;
  font-family: monospace;
  color: #00000082;
}

.entry-field {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80%;
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
  background-image: url(../assets/arrow-short-down.svg);
  background-repeat: no-repeat;
  background-size: 100%;
}

.currency-fields {
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 15px;
  height: 70%;
}
.add-convert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Inter, sans-serif;
  height: 90px;
}

.btn-addFetch {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.btn-addFetch__active {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
</style>