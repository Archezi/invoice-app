import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModalForm: null
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      state.invoiceModalForm = !state.invoiceModalForm
    }
  },
  actions: {},
  modules: {}
})
