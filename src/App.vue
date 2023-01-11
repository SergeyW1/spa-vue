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
                <option v-for="(item, name, index) in currencies" :key="index">
                  {{ name }} - {{ item }}
                </option>
              </select>
            </div>
            <div class="select-wrapper">
              <h4>From</h4>
              <select class="select" name="Tos" v-model="from">
                <option v-for="(item, name, index) in currencies" :key="index">
                  {{ name }} - {{ item }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="add-convert">
          <div class="current-exchange" v-if="currentExchange">
            {{ currentExchanges() }}
          </div>
          <div class="btn-addFetch">
            <button class="btn" @click="fetchConverter">Convert</button>
          </div>
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
      currencies: {
        AED: "United Arab Emirates dirham",
        AFN: "Afghan afghani",
        ALL: "Albanian lek",
        AMD: "Armenian dram",
        ANG: "Netherlands Antillean guilder",
        AOA: "Angolan kwanza",
        ARS: "Argentine peso",
        AUD: "Australian dollar",
        AWG: "Aruban florin",
        AZN: "Azerbaijani manat",
        BAM: "Bosnia and Herzegovina convertible mark",
        BBD: "Barbadian dollar",
        BDT: "Bangladeshi taka",
        BGN: "Bulgarian lev",
        BHD: "Bahraini dinar",
        BIF: "Burundian franc",
        BND: "Brunei dollar",
        BOB: "Bolivian boliviano",
        BRL: "Brazilian real",
        BSD: "Bahamian dollar",
        BWP: "Botswana pula",
        BYN: "Belarusian ruble",
        BZD: "Belize dollar",
        CAD: "Canadian dollar",
        CDF: "Congolese franc",
        CHF: "Swiss franc",
        CLP: "Chilean peso",
        CNY: "Renminbi",
        COP: "Colombian peso",
        CRC: "Costa Rican colón",
        CUP: "Cuban peso",
        CVE: "Cape Verdean escudo",
        CZK: "Czech koruna",
        DJF: "Djiboutian franc",
        DKK: "Danish krone",
        DOP: "Dominican peso",
        DZD: "Algerian dinar",
        EGP: "Egyptian pound",
        ERN: "Eritrean nakfa",
        ETB: "Ethiopian birr",
        EUR: "Euro",
        FJD: "Fijian dollar",
        GBP: "Pound sterling",
        GEL: "Georgian lari",
        GHS: "Ghanaian cedi",
        GIP: "Gibraltar pound",
        GMD: "Gambian dalasi",
        GNF: "Guinean franc",
        GTQ: "Guatemalan quetzal",
        GYD: "Guyanese dollar",
        HKD: "Hong Kong dollar",
        HNL: "Honduran lempira",
        HRK: "Croatian kuna",
        HTG: "Haitian gourde",
        HUF: "Hungarian forint",
        IDR: "Indonesian rupiah",
        ILS: "Israeli new shekel",
        INR: "Indian rupee",
        IQD: "Iraqi dinar",
        IRR: "Iranian rial",
        ISK: "Icelandic króna",
        JMD: "Jamaican dollar",
        JOD: "Jordanian dinar",
        JPY: "Japanese yen",
        KES: "Kenyan shilling",
        KGS: "Kyrgyzstani som",
        KHR: "Cambodian riel",
        KMF: "Comorian franc",
        KRW: "South Korean won",
        KWD: "Kuwaiti dinar",
        KZT: "Kazakhstani tenge",
        LAK: "Lao kip",
        LBP: "Lebanese pound",
        LKR: "Sri Lankan rupee",
        LRD: "Liberian dollar",
        LSL: "Lesotho loti",
        LYD: "Libyan dinar",
        MAD: "Moroccan dirham",
        MDL: "Moldovan leu",
        MGA: "Malagasy ariary",
        MKD: "Macedonian denar",
        MMK: "Burmese kyat",
        MNT: "Mongolian tögrög",
        MOP: "Macanese pataca",
        MRU: "Mauritanian ouguiya",
        MUR: "Mauritian rupee",
        MVR: "Maldivian rufiyaa",
        MWK: "Malawian kwacha",
        MXN: "Mexican peso",
        MYR: "Malaysian ringgit",
        MZN: "Mozambican metical",
        NAD: "Namibian dollar",
        NGN: "Nigerian naira",
        NIO: "Nicaraguan córdoba",
        NOK: "Norwegian krone",
        NPR: "Nepalese rupee",
        NZD: "New Zealand dollar",
        OMR: "Omani rial",
        PAB: "Panamanian balboa",
        PEN: "Peruvian sol",
        PGK: "Papua New Guinean kina",
        PHP: "Philippine peso",
        PKR: "Pakistani rupee",
        PLN: "Polish złoty",
        PYG: "Paraguayan guaraní",
        QAR: "Qatari riyal",
        RON: "Romanian leu",
        RSD: "Serbian dinar",
        RUB: "Russian ruble",
        RWF: "Rwandan franc",
        SAR: "Saudi riyal",
        SBD: "Solomon Islands dollar",
        SCR: "Seychellois rupee",
        SDG: "Sudanese pound",
        SEK: "Swedish krona",
        SGD: "Singapore dollar",
        SLL: "Sierra Leonean leone",
        SOS: "Somali shilling",
        SRD: "Surinamese dollar",
        SSP: "South Sudanese pound",
        STN: "São Tomé and Príncipe dobra",
        SVC: "Salvadoran colón",
        SYP: "Syrian pound",
        SZL: "Swazi lilangeni",
        THB: "Thai baht",
        TJS: "Tajikistani somoni",
        TMT: "Turkmenistan manat",
        TND: "Tunisian dinar",
        TOP: "Tongan paanga",
        TRY: "Turkish lira",
        TTD: "Trinidad and Tobago dollar",
        TWD: "New Taiwan dollar",
        TZS: "Tanzanian shilling",
        UAH: "Ukrainian hryvnia",
        UGX: "Ugandan shilling",
        USD: "United States dollar",
        UYU: "Uruguayan peso",
        UZS: "Uzbekistani som",
        VES: "Venezuelan bolívar",
        VND: "Vietnamese đồng",
        VUV: "Vanuatu vatu",
        WST: "Samoan tālā",
        XAF: "Central African CFA franc",
        XCD: "Eastern Caribbean dollar",
        XDR: "Special drawing rights",
        XOF: "West African CFA franc",
        XPF: "CFP franc",
        YER: "Yemeni rial",
        ZAR: "South African rand",
        ZMW: "Zambian kwacha",
        ZWL: "Zimbabwean dollar",
      },
      currentExchange: false,
      isPostsLoading: true,
      isSelectLoading: true,
      convertNum: 0,
      convert: "",
      amount: "1",
      to: "RUB - Russian Ruble",
      from: "USD - United States Dollar",
      requestOptions: {
        method: "GET",
        redirect: "follow",
        headers: {
          "X-RapidAPI-Key":
            "81b2de6304mshe561875616e62adp10f56djsn6a23772b0ad8",
          "X-RapidAPI-Host": "currency-converter5.p.rapidapi.com",
        },
      },
    };
  },
  methods: {
    currentExchanges() {
      return `${this.amount} ${this.from
        .split("")
        .slice(0, 3)
        .join("")} ${this.convertNum.toFixed(2)} ${this.to
        .split("")
        .slice(0, 3)
        .join("")}`;
    },
    async fetchConverter() {
      this.isPostsLoading = false;
      try {
        const amountNumber = this.amount;
        const toCurrency = this.to.split("").slice(0, 3).join("");
        const fromCurrency = this.from.split("").slice(0, 3).join("");
        const response = await axios(
          `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amountNumber}`
        );
        this.convertNum = await response.data.result;
        this.convert = (await response.data.result) + " " + toCurrency;
      } catch (e) {
        console.log("Error", e);
      } finally {
        this.currentExchange = true;
        this.isPostsLoading = true;
      }
    },
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
  /* display: flex;
  justify-content: flex-end;
  width: 75%; */
  float: right;
}

.current-exchange {
  float: left;
}

.add-convert {
  /* display: flex; */
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
</style>
