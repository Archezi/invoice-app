<template>
  <div class="home  mx-auto  ">
    <invoice-top-bar class="mb-8" />
    <invoice-item></invoice-item>
    <transition name="modal">
      <invoice-form-modal
        v-if="invoiceModalForm"
        class="invoice-modal"
      ></invoice-form-modal>
    </transition>
  </div>
</template>

<script>
import InvoiceFormModal from '../components/InvoiceFormModal.vue'
import InvoiceItem from '../components/InvoiceItem.vue'
import InvoiceTopBar from '../components/InvoiceTopBar.vue'

import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { InvoiceItem, InvoiceTopBar, InvoiceFormModal },
  computed: {
    ...mapState(['invoiceModalForm'])
  }
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 52.5rem;
  padding: 1.25rem;

  // transition for invoice modal

  .modal-enter-active,
  .modal-leave-active {
    transition: 0.8s ease all;
  }

  .modal-enter-from,
  .modal-leave-to {
    transform: translateX(-700px);
  }
}
</style>
