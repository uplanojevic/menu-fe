import Currency from '@/models/Currency'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currencies: [] as Currency[]
  },
  mutations: {
    setCurrency (state, payload: { currency: Currency}): void {
      (state.currencies as Currency[]).push(payload.currency)
    },
    removeCurrency (state, payload: { currencies: Currency[], currency: Currency }): void {
      const index = payload.currencies.indexOf(payload.currency, 0)

      if (index > -1) {
        state.currencies = payload.currencies.splice(index, 1)
      }
    },
    modifyCurrency (state, payload: { currencies: Currency[], currency: Currency }): void {
      payload.currencies.forEach((c: Currency) => {
        if (c.id === payload.currency.id) {
          c = payload.currency
        }
      })
      state.currencies = payload.currencies
    }
  },
  actions: {
    addCurrency (context, payload: { currency: Currency[]}): void {
      context.commit('setCurrency', { currency: payload.currency })
    },
    deleteCurrency (context, payload: { currencies: Currency[], currency: Currency }): void {
      context.commit('removeCurrency', { currencies: payload.currencies, currency: payload.currency })
    },
    editCurrency (context, payload: { currencies: Currency[], currency: Currency }): void {
      context.commit('modifyCurrency', { currencies: payload.currencies, currency: payload.currency })
    }
  },
  modules: {
  }
})
