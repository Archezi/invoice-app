<template>
  <header class="header">
    <div class="header__left">
      <h1 class="text-4xl">Invoices</h1>
      <span>There are {{ invoiceData.length }} total invoices</span>
    </div>
    <div class="header__right">
      <div @click="filterMenuToggle" class="filter flex ">
        <span
          >Filter by status {{}}
          <span v-if="customFilter"
            >: <span>{{ customFilter }}</span></span
          >
        </span>
        <img src="@/assets/icon-arrow-down.svg" alt="arrow down" />
        <ul v-show="filterMenu" class="filter-menu">
          <li @click="filteredInvoices">Draft</li>
          <li @click="filteredInvoices">Pending</li>
          <li @click="filteredInvoices">Paid</li>
          <li @click="filteredInvoices">Clear Filter</li>
        </ul>
      </div>
      <div class="add-button">
        <base-button
          @click="newInvoice"
          mode="add-new"
          class="flex add-invoice-button"
        >
          <div class="circle rounded-full bg-white">
            <img src="@/assets/icon-plus.svg" alt="new invoice button" />
          </div>
          New Invoice
        </base-button>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: [''],
  data() {
    return {
      filterMenu: false,
      customFilter: null
    }
  },
  computed: {
    ...mapState(['editInvoice', 'invoiceData'])
  },
  methods: {
    ...mapMutations(['TOGGLE_INVOICE_MODAL', 'TOGGLE_EDIT_INVOICE']),

    filterMenuToggle() {
      this.filterMenu = !this.filterMenu
    },

    newInvoice() {
      this.TOGGLE_INVOICE_MODAL()
      if (this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE()
      }
    },
    filteredInvoices(e) {
      this.customFilter = e.target.innerText
      if (this.customFilter === 'Clear Filter') {
        this.customFilter = null
        this.$emit('emited-filtered-invoices', this.customFilter)
        return
      }
      this.$emit('emited-filtered-invoices', this.customFilter)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  color: white;
  &__left,
  &__right {
    flex: 1;
  }
  &__right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.filter {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 2rem;

  img {
    margin-left: 0.75rem;
    width: 9px;
    height: 5px;
  }
}
.filter-menu {
  position: absolute;
  width: 120px;
  top: 25px;
  list-style: none;
  background-color: #1e2139;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  li {
    cursor: pointer;
    font-size: 0.75rem;
    padding: 10px 20px;
    &:hover {
      background-color: white;
      color: #1e2139;
    }
  }
}
.add-invoice-button {
  display: flex;
  justify-content: space-evenly;
  &::before {
    content: '';
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
  }
  padding: 5px;
}
.circle {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;

  img {
    background: none;
  }
}
</style>
