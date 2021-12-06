<template>
  :
  <router-link
    :to="{ name: 'Invoice', params: { invoiceId: invoice.invoiceId } }"
  >
    <base-card>
      <div class="invoice__list-wrapper grid  text-white bg-darkPurple">
        <div class="invoice__id bg-none ">{{ invoice.invoiceId }}</div>
        <div class="invoice__date">{{ invoice.invoiceDate }}</div>
        <div class="invoice__title">{{ invoice.clientName }}</div>
        <div class="invoice__amount">&euro;{{ invoice.invoiceTotal }}</div>
        <div class="invoice__status">
          <base-button class="status-button" :mode="invoiceStatus">{{
            invoiceStatus
          }}</base-button>
          <div class="invoice__arrow-right sm:hidden">></div>
        </div>
      </div>
    </base-card>
  </router-link>
</template>

<script>
export default {
  name: 'invoice',
  props: ['invoice'],
  computed: {
    invoiceStatus() {
      if (this.invoice.invoicePending) {
        return 'pending'
      } else if (this.invoice.invoiceDraft) {
        return 'draft'
      } else if (this.invoice.invoicePaid) {
        return 'paid'
      } else {
        return 'different status'
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.invoice__list-wrapper {
  align-items: center;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(50px, auto);
  grid-template-areas: 'id date date date title title title amount amount status status status';
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(20px, auto);

    grid-template-areas:
      'id title'
      '. . '
      'date status'
      'amount status';
  }
}
.invoice__id {
  grid-area: id;
}
.invoice__date {
  grid-area: date;
}
.invoice__title {
  grid-area: title;
}
.invoice__amount {
  grid-area: amount;
}
.invoice__status {
  grid-area: status;
}
.invoice__id,
.invoice__date,
.invoice__title,
.invoice__amount,
.invoice__status,
.invoice__arrow-right {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  @media (max-width: 700px) {
    justify-content: start;
  }
}
.invoice__status,
.invoice__title {
  @media (max-width: 700px) {
    justify-content: end;
  }
}
.status-button {
  @media (max-width: 700px) {
    margin: 0;
  }
}
.invoice__arrow-right {
  @media (max-width: 700px) {
    display: none;
  }
}
</style>
