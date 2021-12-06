<template>
  <base-card class="card p-8 ">
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
        <base-button
          class="button-edit"
          type="button"
          @click="toggleEditModal"
          mode="save-draft"
          >Edit</base-button
        >
        <base-button
          class="button-delete"
          @click="deleteInvoice"
          mode="cancel-active"
          >Delete</base-button
        >
        <base-button
          class="button-paid"
          v-if="currentInvoice.invoicePending"
          @click="markAsPaid"
          mode="save"
          >Mark as Paid</base-button
        >
        <base-button
          class="button-pending"
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
.card {
  padding: 2rem;
  @media (max-width: 700px) {
    padding: 1rem;
  }
}
.status-bar-wrapper {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: 'status status actions actions actions actions';
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);

    row-gap: 2rem;
    grid-template-areas:
      'status status status'
      'actions actions actions';
  }
  .left {
    grid-area: status;
  }
  .right {
    display: grid;
    grid-area: actions;
    width: 100%;
    gap: 0.5rem;
    justify-self: end;
    grid-template-areas: 'edit delete paid';
    .button-paid {
      grid-area: paid;
    }
    .button-pending {
      grid-area: paid;
    }
    .button-edit {
      grid-area: edit;
    }
    .button-delete {
      grid-area: delete;
    }

    @media (max-width: 700px) {
      grid-template-areas:
        'paid paid paid'
        'edit edit delete';
    }
  }
}
</style>
