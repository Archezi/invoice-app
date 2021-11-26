import { createStore } from 'vuex'
import db from '../firebase/firebaseInit'
export default createStore({
  state: {
    invoiceData: [],
    invoicesLoaded: null,
    invoiceModalForm: null,
    confirmationModal: null
  },
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      state.invoiceModalForm = !state.invoiceModalForm
    },
    TOGGLE_CONFIRMATION_MODAL(state) {
      state.confirmationModal = !state.confirmationModal
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload)
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true
    }
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const getData = db.collection('invoices')
      const results = await getData.get()
      results.forEach((doc) => {
        if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerPostCode: doc.data().billerPostCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientPostCode: doc.data().clientPostCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid
          }
          commit('SET_INVOICE_DATA', data)
        }
      })
      commit('INVOICES_LOADED')
    }
  },
  modules: {}
})
