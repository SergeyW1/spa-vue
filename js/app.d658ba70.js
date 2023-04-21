(function(){"use strict";var t={320:function(t,e,n){var r=n(963),s=n(252),a=n(577);const o=t=>((0,s.dD)("data-v-25716404"),t=t(),(0,s.Cn)(),t),c={class:"spa-conteiner"},i=o((()=>(0,s._)("div",{class:"spa-conteiner__title"},[(0,s._)("h1",null,"Currency Converter")],-1))),u={class:"spa-conteiner__inputs"},l={class:"entry-field"},d=o((()=>(0,s._)("h4",null,"Amount",-1))),p={class:"entry-field__name"},h={class:"currency-fields"},f={class:"select-wrapper"},v=o((()=>(0,s._)("h4",null,"Tos",-1))),m=["value"],_={class:"select-wrapper"},y=o((()=>(0,s._)("h4",null,"From",-1))),g=["value"],w={class:"add-convert"};function b(t,e,n,o,b,C){const U=(0,s.up)("current-exchange"),D=(0,s.up)("my-buttons");return(0,s.wg)(),(0,s.iD)("div",{class:"spa-list",onSubmit:e[3]||(e[3]=(0,r.iM)((()=>{}),["prevent"]))},[(0,s._)("div",c,[i,(0,s._)("div",u,[(0,s._)("div",l,[(0,s._)("div",null,[d,(0,s.wy)((0,s._)("input",{class:"input",type:"text","onUpdate:modelValue":e[0]||(e[0]=t=>b.amount=t)},null,512),[[r.nr,b.amount,void 0,{number:!0}]])]),(0,s._)("div",{class:(0,a.C_)(b.isPostsLoading?"entry-field__title":"entry-field__no-active")},[(0,s._)("p",p,(0,a.zw)(""!==b.result?b.description:""),1),(0,s._)("span",null,(0,a.zw)(b.amount)+" "+(0,a.zw)(b.fromCurrency)+" = "+(0,a.zw)(b.result.toFixed(4))+" "+(0,a.zw)(b.toCurrency),1)],2)]),(0,s._)("div",h,[(0,s._)("div",f,[v,(0,s.wy)((0,s._)("select",{class:"select","onUpdate:modelValue":e[1]||(e[1]=t=>b.toCurrency=t)},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(b.currencies,(t=>((0,s.wg)(),(0,s.iD)("option",{value:t.code,key:t},(0,a.zw)(t.code)+" - "+(0,a.zw)(t.description),9,m)))),128))],512),[[r.bM,b.toCurrency]])]),(0,s._)("div",_,[y,(0,s.wy)((0,s._)("select",{class:"select","onUpdate:modelValue":e[2]||(e[2]=t=>b.fromCurrency=t)},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(b.currencies,(t=>((0,s.wg)(),(0,s.iD)("option",{value:t.code,key:t},(0,a.zw)(t.code)+" - "+(0,a.zw)(t.description),9,g)))),128))],512),[[r.bM,b.fromCurrency]])])])]),(0,s._)("div",w,[(0,s.Wm)(U,{isPostsLoading:b.isPostsLoading,amount:b.amount,resultEUR:b.resultEUR,resultUSD:b.resultUSD},null,8,["isPostsLoading","amount","resultEUR","resultUSD"]),(0,s._)("div",{class:(0,a.C_)(b.currentExchange?"btn-addFetch":"btn-addFetch__active")},[(0,s.Wm)(D,{onClick:C.fetchConverted},{default:(0,s.w5)((()=>[(0,s.Uk)("Converted")])),_:1},8,["onClick"])],2)])])],32)}var C=n(945);const U={class:"btn"};function D(t,e){return(0,s.wg)(),(0,s.iD)("button",U,[(0,s.WI)(t.$slots,"default",{},void 0,!0)])}var x=n(744);const E={},R=(0,x.Z)(E,[["render",D],["__scopeId","data-v-187ee46c"]]);var S=R;const z=t=>((0,s.dD)("data-v-4b6bc0db"),t=t(),(0,s.Cn)(),t),L={class:"current-exchange__item"},O=z((()=>(0,s._)("h3",null,"Курсы валют национальных банков!",-1))),k={class:"current-currencies"};function P(t,e,n,r,o,c){return(0,s.wg)(),(0,s.iD)("div",{class:(0,a.C_)(n.isPostsLoading?"current-exchange__active":"current-exchange")},[(0,s._)("div",L,[O,(0,s._)("div",k,[(0,s._)("span",null,(0,a.zw)(n.amount)+" USD = "+(0,a.zw)(n.resultUSD.toFixed(4))+" RUB",1),(0,s._)("span",null,(0,a.zw)(n.amount)+" EUR = "+(0,a.zw)(n.resultEUR.toFixed(4))+" RUB",1)])])],2)}var B={name:"current-exchange",props:{amount:Number,isPostsLoading:Boolean,resultEUR:Number,resultUSD:Number}};const F=(0,x.Z)(B,[["render",P],["__scopeId","data-v-4b6bc0db"]]);var Z=F,j={components:{MyButtons:S,CurrentExchange:Z},data(){return{fromEUR:"EUR",fromUSD:"USD",resultEUR:0,resultUSD:0,currencies:[],currentExchange:!1,isPostsLoading:!1,isSelectLoading:!0,amount:1,toCurrency:"RUB",fromCurrency:"USD",result:0,description:""}},methods:{async fetchConverted(){const{formValid:t,fromCurrency:e,amount:n,toCurrency:r}=this;if(t)try{const t=await C.Z.get(`https://api.exchangerate.host/latest?base=${e}`),s=await t.data.rates;this.result=n*s[r]}catch(s){alert("Converted Error",s)}finally{this.description=this.currencies[this.toCurrency].description,this.isPostsLoading=!0,this.currentExchange=!0,this.fetchCurrencyDefault()}},async fetchCurrencyList(){try{const t=await C.Z.get("https://api.exchangerate.host/symbols");this.currencies=await t.data.symbols}catch(t){alert("List Error",t)}},async fetchCurrencyDefault(){const t=await C.Z.get(`https://api.exchangerate.host/latest?base=${this.fromEUR}`),e=await C.Z.get(`https://api.exchangerate.host/latest?base=${this.fromUSD}`),n=t.data.rates,r=e.data.rates;this.resultEUR=this.amount*n.RUB,this.resultUSD=this.amount*r.RUB}},mounted(){this.fetchCurrencyList()},computed:{formValid(){const{amount:t,toCurrency:e,fromCurrency:n}=this;return+t>0&&e&&n}}};const V=(0,x.Z)(j,[["render",b],["__scopeId","data-v-25716404"]]);var I=V;const M={class:"app"};var W={__name:"App",setup(t){return(t,e)=>((0,s.wg)(),(0,s.iD)("div",M,[(0,s.Wm)(I)]))}};const $=W;var N=$;(0,r.ri)(N).mount("#app")}},e={};function n(r){var s=e[r];if(void 0!==s)return s.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,r,s,a){if(!r){var o=1/0;for(l=0;l<t.length;l++){r=t[l][0],s=t[l][1],a=t[l][2];for(var c=!0,i=0;i<r.length;i++)(!1&a||o>=a)&&Object.keys(n.O).every((function(t){return n.O[t](r[i])}))?r.splice(i--,1):(c=!1,a<o&&(o=a));if(c){t.splice(l--,1);var u=s();void 0!==u&&(e=u)}}return e}a=a||0;for(var l=t.length;l>0&&t[l-1][2]>a;l--)t[l]=t[l-1];t[l]=[r,s,a]}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var s,a,o=r[0],c=r[1],i=r[2],u=0;if(o.some((function(e){return 0!==t[e]}))){for(s in c)n.o(c,s)&&(n.m[s]=c[s]);if(i)var l=i(n)}for(e&&e(r);u<o.length;u++)a=o[u],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(l)},r=self["webpackChunkspa_vue"]=self["webpackChunkspa_vue"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(320)}));r=n.O(r)})();
//# sourceMappingURL=app.d658ba70.js.map