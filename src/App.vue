<template>
  <div
    class="main-wrapper bg-mainBackground min-h-screen "
    v-if="invoicesLoaded"
  >
    <navigation class="navigation-bar" />
    <base-confirmation-modal v-if="confirmationModal" />
    <transition name="modal">
      <invoice-form-modal
        v-if="invoiceModalForm"
        class="invoice-modal"
      ></invoice-form-modal>
    </transition>
    <div class="main-container mx-auto">
      <router-view />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import InvoiceFormModal from './components/InvoiceFormModal.vue'
import Navigation from './components/Navigation.vue'

export default {
  components: { Navigation, InvoiceFormModal },
  computed: {
    ...mapState(['invoiceModalForm', 'confirmationModal', 'invoicesLoaded'])
  },
  methods: {
    ...mapActions(['GET_INVOICES'])
  },
  created() {
    this.GET_INVOICES()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  // background-color: #141625;
}
.main-container {
  position: relative;
  max-width: 52.5rem;
  padding: 1.25rem;
}
.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}
.main-wrapper {
  padding-top: 5rem;
  @media (min-width: 900px) {
    padding-top: 5rem;
  }
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: 0.8s ease all;
}

.modal-enter-from,
.modal-leave-to {
  transform: translateX(-700px);
}
// Status Button Styling
</style>
