<template>
  <div class=" flex flex-col gap-4">
    <router-link :to="{ name: 'Home' }">
      <div class="flex items-center gap-4 text-white cursor-pointer ">
        <span><img src="@/assets/icon-arrow-left.svg" alt="" /> </span>GO BACK
      </div>
    </router-link>

    <invoice-details-status-bar
      :current-invoice="currentInvoice"
      :current-invoice-status="currentInvoiceStatus"
      @delete-invoice="deleteInvoice(currentInvoice.docId)"
      @mark-as-paid="updateStatusToPaid(currentInvoice.docId)"
      @mark-as-pending="updateStatusToPending(currentInvoice.docId)"
    />
    <ivocie-details-general-information :currentInvoice="currentInvoice" />
    <invoice-details-price-table :currentInvoice="currentInvoice" />
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import InvoiceDetailsStatusBar from '../components/invoiceDetails/InvoiceDetailsStatusBar.vue'
import IvocieDetailsGeneralInformation from '../components/invoiceDetails/InvoiceDetailsGeneralInforamtion.vue'
import InvoiceDetailsPriceTable from '../components/invoiceDetails/InvoiceDetailsPriceTable.vue'
export default {
  name: 'invoiceDetails',
  components: {
    InvoiceDetailsStatusBar,
    IvocieDetailsGeneralInformation,
    InvoiceDetailsPriceTable
  },
  data() {
    return {
      currentInvoice: null,
      currentInvoiceStatus: 'Draft'
    }
  },
  created() {
    this.getCurrentInvoice()
  },
  methods: {
    ...mapMutations(['SET_CURRENT_INVOICE']),
    ...mapActions([
      'UPDATE_STATUS_TO_PENDING',
      'UPDATE_STATUS_TO_PAID',
      'DELETE_INVOICE'
    ]),

    getCurrentInvoice() {
      this.SET_CURRENT_INVOICE(this.$route.params.invoiceId)
      this.currentInvoice = this.currentInvoiceArray[0]
    },
    async deleteInvoice(docId) {
      await this.DELETE_INVOICE(docId)
      this.$router.push({ name: 'Home' })
    },
    updateStatusToPaid(docId) {
      this.UPDATE_STATUS_TO_PAID(docId)
    },
    updateStatusToPending(docId) {
      this.UPDATE_STATUS_TO_PENDING(docId)
    }
  },
  computed: {
    ...mapState(['currentInvoiceArray', 'editInvoice'])
  },
  watch: {
    editInvoice() {
      if (!this.editInvoice) {
        this.currentInvoice = this.currentInvoiceArray[0]
      }
    }
  }
}
</script>

<style></style>
