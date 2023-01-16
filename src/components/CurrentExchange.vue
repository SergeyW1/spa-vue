<!-- <template>
  <div>
    <h4>Курсы валют национальных банков!</h4>
    <span>{{ amount }} USD = {{ resultUSD }} RUB</span>
    <span>{{ amount }} EUR = {{ resultEUR }} RUB</span>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fromEUR: "EUR",
      fromUSD: "USD",
      resultEUR: 0,
      resultUSD: 0,
    };
  },
  props: {
    amount: Number,
  },
  emits: ["currencyDefault"],
  methods: {
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
      this.$emit("currencyDefault", this.fetchCurrencyDefault);
    },
  },
};
</script>

<style scoped>
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

.btn-addFetch__active {
  display: flex;
  justify-content: flex-end;
  width: 50%;
}
</style> -->