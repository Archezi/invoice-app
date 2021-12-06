<template>
  <base-card class="pricing-wrapper p-8 flex flex-col gap-8   relative">
    <div class="pricing-header flex justify-items-end text-formText text-xl ">
      <p class="item-name flex justify-self-start">Item Name</p>
      <p class="item-qty">QTY</p>
      <p class="item-price">Price</p>
      <p class="item-total">Total</p>
    </div>
    <div
      v-for="(item, index) in currentInvoice.invoiceItemList"
      :key="index"
      class="item-details flex justify-items-end text-white"
    >
      <p class="item-name flex justify-self-start">{{ item.itemName }}</p>
      <p class="item-qty">{{ item.qty }}</p>
      <p class="item-price">&euro;{{ item.price }}</p>
      <p class="item-total">&euro;{{ item.total }}</p>
    </div>

    <div
      class="price-total rounded-b-lg p-8 flex justify-between text-white items-center"
    >
      <p>Amount Due</p>
      <h3>&euro;{{ currentInvoice.invoiceTotal }}</h3>
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
.pricing-wrapper {
  padding-bottom: 7rem;
}
.pricing-header,
.item-details {
  display: grid;
  grid-template-columns: repeat(6, 1fr);

  .item-name {
    grid-column: 1 / 4;
  }
}
.price-total {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background: black;
}
</style>
