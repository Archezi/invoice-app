<template>
  <base-card class="p-8">
    <div class="status-bar-wrapper    ">
      <div class="left bg-darkPurple">
        <span class="mr-4">Status</span>
        <base-button
          :mode="{
            paid: currentInvoice.invoicePaid,
            draft: currentInvoice.invoiceDraft,
            pending: currentInvoice.invoicePending
          }"
        >
          <span v-if="currentInvoice.invoicePaid">Paid</span>
          <span v-if="currentInvoice.invoiceDraft">Draft</span>
          <span v-if="currentInvoice.invoicePending">Pending</span>
        </base-button>
      </div>
      <div class="right bg-darkPurple gap-2">
        <base-button type="button" @click="toggleEditModal" mode="save-draft"
          >Edit</base-button
        >
        <base-button @click="deleteInvoice" mode="cancel-active"
          >Delete</base-button
        >
        <base-button
          v-if="currentInvoice.invoicePending"
          @click="markAsPaid"
          mode="save"
          >Mark as Paid</base-button
        >
        <base-button
          v-if="currentInvoice.invoiceDraft || currentInvoice.invoicePaid"
          @click="markAsPending"
          mode="save"
          >Mark as Pending</base-button
        >
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  props: ['currentInvoice', 'currentInvoiceStatus'],
  created() {},
  methods: {
    ...mapMutations(['TOGGLE_INVOICE_MODAL', 'TOGGLE_EDIT_INVOICE']),
    ...mapActions(['DELETE_INVOICE']),
    toggleEditModal() {
      this.TOGGLE_EDIT_INVOICE()
      this.TOGGLE_INVOICE_MODAL()
    },
    deleteInvoice() {
      this.$emit('delete-invoice')
    },
    markAsPaid() {
      this.$emit('mark-as-paid')
    },
    markAsPending() {
      this.$emit('mark-as-pending')
    }
  },
  computed: {
    ...mapState(['currentInvoiceArray', 'editInvoice', 'invoiceData'])
  }
}
</script>

<style lang="scss" scoped>
.status-bar-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  .left {
    grid-column: 1 / 3;
  }
  .right {
    display: flex;

    grid-column: 3 / 7;
    grid-row: 1;
    gap: 0.5rem;
    justify-self: end;
  }
}
</style>
