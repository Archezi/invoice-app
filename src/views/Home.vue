<template>
  <div class="home  mx-auto  ">
    <invoice-top-bar
      class="mb-8"
      @emited-filtered-invoices="filteredInvoices"
    />
    <invoice-item
      v-for="(invoice, index) in filteredData"
      :invoice="invoice"
      :key="index"
    />
  </div>
</template>

<script>
// import InvoiceFormModal from '../components/InvoiceFormModal.vue'
import InvoiceItem from '../components/InvoiceItem.vue'
import InvoiceTopBar from '../components/InvoiceTopBar.vue'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      currentInvoiceData: null,
      filteredInvoice: null
    }
  },
  components: { InvoiceItem, InvoiceTopBar },
  computed: {
    ...mapState(['invoiceModalForm', 'confirmationModal', 'invoiceData']),

    filteredData() {
      return this.invoiceData.filter((invoice) => {
        if (this.filteredInvoice === 'Draft') {
          return invoice.invoiceDraft === true
        }
        if (this.filteredInvoice === 'Pending') {
          return invoice.invoicePending === true
        }
        if (this.filteredInvoice === 'Paid') {
          return invoice.invoicePaid === true
        }
        return invoice
      })
    }
  },
  created() {
    this.currentInvoiceData = this.invoiceData
  },
  watch: {
    invoiceData() {
      this.currentInvoiceData = this.invoiceData
    },
    filteredInvoice() {
      console.log(this.filteredInvoice)
    }
  },
  methods: {
    filteredInvoices(customFilter) {
      this.filteredInvoice = customFilter
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  max-width: 52.5rem;
  padding: 1.25rem;

  // transition for invoice modal

  // .modal-enter-active,
  // .modal-leave-active {
  //   transition: 0.8s ease all;
  // }

  // .modal-enter-from,
  // .modal-leave-to {
  //   transform: translateX(-700px);
  // }
}
</style>
