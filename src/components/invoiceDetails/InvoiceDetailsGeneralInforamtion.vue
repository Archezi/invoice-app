<template>
  <base-card>
    <div class="invoice-details-wrapper flex flex-col gap-8">
      <!-- Invoice details top section -->
      <div class="invoice-details-top ">
        <div class="invoice-details flex flex-col gap-4">
          <div class="invoice-id text-white">
            <span class="text-formText">#</span>
            {{ currentInvoice.invoiceId }}
          </div>
          <h2 class="invoice-title text-white">
            {{ currentInvoice.productDescription }}
          </h2>
        </div>
        <div class="client-address text-white text-sm">
          <p>{{ currentInvoice.billerStreetAddress }}</p>
          <p>{{ currentInvoice.billerCity }}</p>
          <p>{{ currentInvoice.billerPostCode }}</p>
          <p>{{ currentInvoice.billerCountry }}</p>
        </div>
      </div>
      <!-- Invoice details middle section -->
      <div class="invoice-details-middle">
        <div class="invoice-payment flex flex-col gap-4">
          <div class="invoice-date flex flex-col gap-4">
            <p class="text-sm text-formText">Invoice Date</p>
            <p class="text-white">{{ currentInvoice.invoiceDate }}</p>
          </div>
          <div class="invoice-payment-date flex flex-col gap-4">
            <p class="text-sm text-formText">Payment date</p>
            <p class="text-sm text-white">
              {{ currentInvoice.paymentDueDate }}
            </p>
          </div>
        </div>
        <div class="invoice-bill-to flex flex-col gap-4">
          <p class="text-sm text-formText">Bill to</p>
          <h3 class="client-name text-white ">
            {{ currentInvoice.clientName }}
          </h3>
          <div class="client-address flex flex-col text-sm text-white">
            <p class="client-street">{{ currentInvoice.clientSteetAddress }}</p>
            <p class="client-city">{{ currentInvoice.clientCity }}</p>
            <p class="client-post-code">{{ currentInvoice.clientPostCode }}</p>
            <p class="client-country">{{ currentInvoice.clientCountry }}</p>
          </div>
        </div>
        <div class="invoice-sent-to flex flex-col gap-4">
          <p class="text-sm text-formText">Sent To</p>
          <p class="client-email text-white">
            {{ currentInvoice.clientEmail }}
          </p>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue'

export default {
  props: ['currentInvoice'],
  components: { BaseCard }
}
</script>

<style lang="scss" scoped>
.invoice-details-wrapper {
}
.invoice-details-top {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .client-address {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
  }
}
.invoice-details-middle {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
