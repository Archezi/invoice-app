<template>
  <div class="modal flex">
    <div class="modal-content ">
      <p class="p-8">Are you sure you want to exit? Your changes will not be saved?</p>
      <div class="actions flex gap-4 bg-transparent ">
        <button @click="closeModal" class="purple p-2 rounded-full">Return</button>
        <button @click="closeInvoice" class="red p-2 rounded-full">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "modal",
  methods: {
    ...mapMutations(["TOGGLE_CONFIRMATION_MODAL", "TOGGLE_INVOICE_MODAL"]),

    closeModal() {
      this.TOGGLE_CONFIRMATION_MODAL();
    },

    closeInvoice() {
      this.TOGGLE_CONFIRMATION_MODAL();
      this.TOGGLE_INVOICE_MODAL();
      
    },
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 5rem;
  transform: translateX(-5rem);
  height: 100vh;
  width: 100%;

  .modal-content {
    border-radius: 20px;
    padding: 48px 32px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;

    p {
      text-align: center;
      background-color: #252945;
    }

    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>
