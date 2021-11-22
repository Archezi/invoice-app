<template>
  <div class="home  mx-auto  ">
    <invoice-item></invoice-item>
  </div>
</template>

<script>
// import InvoiceItem from '@/components/invoiceItem.vue'
import InvoiceItem from '../components/UI/InvoiceItem.vue'
export default {
  name: 'Home',
  components: { InvoiceItem }
}
</script>

<style InvoiceItem lang="scss" scoped>
.home {
  max-width: 52.5rem;
  padding: 1.25rem;
}
</style>
