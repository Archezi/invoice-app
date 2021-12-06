<template>
  <div
    @click="confirmationModalCheck"
    ref="invoiceWrapper"
    class="invoice__form-wrapper"
  >
    <form @submit.prevent="submitForm" class="invoice__content">
      <base-loading v-show="loading" />
      <!-- <base-close-button class="close-button" /> -->
      <h1 v-if="!editInvoice" class="text-4xl mb-8">New Invoice</h1>
      <h1 v-else class="text-4xl mb-8">Edit Invoice</h1>

      <!-- Bill from -->
      <div class="bill_from mb-8">
        <h4 class="text-purple text-xl mb-4">Bill From</h4>
        <div class="input  ">
          <label for="billerStreetAddress">Street Address</label>
          <input
            class="bg-ligherPurple"
            type="text"
            required
            id="billerStreetAddress"
            v-model="billerStreetAddress"
          />
        </div>
        <div class="location-details flex">
          <div class="input">
            <label for="billerCity">City</label>
            <input type="text" required id="billerCity" v-model="billerCity" />
          </div>
          <div class="input">
            <label for="billerPostCode">Post Code</label>
            <input
              type="text"
              required
              id="billerPostCode"
              v-model="billerPostCode"
            />
          </div>
          <div class="input">
            <label for="billerCountry">Country</label>
            <input
              type="text"
              required
              id="billerCountry"
              v-model="billerCountry"
            />
          </div>
        </div>
      </div>

      <!-- Bill to -->
      <div class="bill-to">
        <h4 class=" text-purple  text-xl mb-4">Bill To</h4>
        <div class="input">
          <label for="clientName">Client Name</label>
          <input type="text" required id="clientName" v-model="clientName" />
        </div>
        <div class="input">
          <label for="clientEmail">Client's Email</label>
          <input type="text" required id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input">
          <label for="clientSteetAddress">Street Address</label>
          <input
            type="text"
            required
            id="clientStreetAddress"
            v-model="clientStreetAddress"
          />
        </div>
        <div class="client-location flex">
          <div class="client-city">
            <label for="clientCity">City</label>
            <input type="text" required id="clientCity" v-model="clientCity" />
          </div>
          <div class="client-post-code">
            <label for="clientPostCode">Post Code </label>
            <input
              type="text"
              name=""
              id="clientPostCode"
              v-model="clientPostCode"
            />
          </div>
          <div class="client-country">
            <label for="clientCountry">Country</label>
            <input
              type="text"
              name=""
              id="clientCountry"
              v-model="clientCountry"
            />
          </div>
        </div>

        <!-- Invoice Work Details -->
      </div>
      <div class="invoice-work  ">
        <div class="payment flex">
          <div class="input flex flex-col">
            <label for="invoiceDate">Invoice Date</label>
            <input
              disabled
              type="text"
              id="invoiceDate"
              v-model="invoiceDate"
            />
          </div>
          <div class="input flex flex-col">
            <label for="paymentDueDate">Payment Due</label>
            <input
              disabled
              type="text"
              id="paymentDueDate"
              v-model="paymentDueDate"
            />
          </div>
        </div>
        <div class="input flex flex-col">
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
        </div>
        <div class="input flex flex-col">
          <label for="productDescription">Product Description</label>
          <input
            required
            type="text"
            id="productDescription"
            v-model="productDescription"
          />
        </div>
        <div class="work-details-items">
          <h3 class="text-xl my-4 text-purple">Work item list</h3>
          <table class="item-list ">
            <tr class="table-heading mb-4 flex">
              <th class="item-name">Item Name</th>
              <th class="item-qty">Qty</th>
              <th class="item-price">Price</th>
              <th class="item-total">Total</th>
            </tr>
            <tr
              class="table-items flex"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <input type="text" v-model="item.itemName" />
              </td>
              <td class="item-qty">
                <input type="text" v-model="item.qty" />
              </td>
              <td class="item-price">
                <input type="text" v-model="item.price" />
              </td>
              <td class="item-total">
                &euro;{{ (item.total = item.qty * item.price) }}
              </td>
              <img
                @click="deleteInvoiceItem(item.id)"
                src="@/assets/icon-delete.svg"
                alt=""
              />
            </tr>
          </table>

          <div
            @click="addNewInvoiceItem"
            class="flex mt-8 add-item-button justify-center cursor-pointer transition-all duration-500 border border-transparent hover:border-orange  bg-input rounded-full p-2 text-white"
          >
            <button type="button" class="flex items-center gap-1 ">
              <img src="@/assets/icon-plus.svg" alt="plus icon" /> Add New Item
            </button>
          </div>
        </div>
      </div>

      <!-- Call to action buttons -->
      <div class="call-to-action mt-8 flex gap-4 justify-between">
        <div class="left">
          <base-button v-if="!editInvoice" mode="save-draft"
            >Save draft</base-button
          >
          <base-button v-else @click="cancelInvoice" mode="cancel"
            >Cancel</base-button
          >
        </div>
        <div class="right flex gap-4">
          <base-button v-if="!editInvoice" @click="cancelInvoice" mode="cancel"
            >Cancel</base-button
          >
          <base-button
            v-if="!editInvoice"
            type="submit"
            @click="publishInvoice"
            mode="save"
            >Save Changes</base-button
          >
          <base-button v-else type="submit" mode="save"
            >Update Invoice</base-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import db from '../firebase/firebaseInit'

import { mapMutations, mapActions, mapState } from 'vuex'
import { uid } from 'uid'
import BaseLoading from './UI/BaseLoading.vue'
export default {
  components: { BaseLoading },
  data() {
    return {
      dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerPostCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientPostCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0
    }
  },
  created() {
    if (!this.editInvoice) {
      this.invoiceDateUnix = Date.now()
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString(
        'en-us',
        this.dateOptions
      )
    }
    if (this.editInvoice) {
      const currentInvoice = this.currentInvoiceArray[0]
      this.docId = currentInvoice.docId
      this.billerStreetAddress = currentInvoice.billerStreetAddress
      this.billerCity = currentInvoice.billerCity
      this.billerPostCode = currentInvoice.billerPostCode
      this.billerCountry = currentInvoice.billerCountry
      this.clientName = currentInvoice.clientName
      this.clientEmail = currentInvoice.clientEmail
      this.clientStreetAddress = currentInvoice.clientStreetAddress
      this.clientCity = currentInvoice.clientCity
      this.clientPostCode = currentInvoice.clientPostCode
      this.clientCountry = currentInvoice.clientCountry
      this.invoiceDateUnix = currentInvoice.invoiceDateUnix
      this.invoiceDate = currentInvoice.invoiceDate
      this.paymentTerms = currentInvoice.paymentTerms
      this.paymentDueDateUnix = currentInvoice.paymentDueDateUnix
      this.paymentDueDate = currentInvoice.paymentDueDate
      this.productDescription = currentInvoice.productDescription
      this.invoicePending = currentInvoice.invoicePending
      this.invoiceDraft = currentInvoice.invoiceDraft
      this.invoiceItemList = currentInvoice.invoiceItemList
      this.invoiceTotal = currentInvoice.invoiceTotal
    }
  },
  computed: {
    ...mapState(['editInvoice', 'currentInvoiceArray'])
  },
  methods: {
    ...mapMutations([
      'TOGGLE_INVOICE_MODAL',
      'TOGGLE_CONFIRMATION_MODAL',
      'TOGGLE_EDIT_INVOICE'
    ]),

    ...mapActions(['UPDATE_INVOICE', 'GET_INVOICES']),

    cancelInvoice() {
      this.TOGGLE_INVOICE_MODAL()
      if (!this.editInvoice) {
        this.TOGGLE_EDIT_INVOICE()
      }
    },

    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: '',
        qty: '',
        price: 0,
        total: 0
      })
      console.log(this.invoiceItemList)
    },

    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(
        (item) => item.id !== id
      )
    },

    calcInvoiceTotal() {
      this.invoiceTotal = 0
      this.invoiceItemList.forEach((item) => {
        this.invoiceTotal += item.total
      })
    },

    publishInvoice() {
      this.invoicePending = true
    },

    saveDraft() {
      this.invoiceDraft = true
    },

    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!')
        return
      }

      this.loading = true

      this.calcInvoiceTotal()

      const dataBase = db.collection('invoices').doc()

      await dataBase.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerPostCode: this.billerPostCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientPostCode: this.clientPostCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        invoicePaid: null
      })

      this.loading = false

      this.TOGGLE_INVOICE_MODAL()

      this.GET_INVOICES()
    },
    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert('Please ensure you filled out work items!')
        return
      }

      this.loading = true

      this.calcInvoiceTotal()

      const dataBase = db.collection('invoices').doc(this.docId)

      await dataBase.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerPostCode: this.billerPostCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientPostCode: this.clientPostCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal
      })

      this.loading = false

      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId
      }

      this.UPDATE_INVOICE(data)

      // this.GET_INVOICES();
    },
    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice()
        return
      }
      this.uploadInvoice()
    },
    confirmationModalCheck(e) {
      if (e.target === this.$refs.invoiceWrapper) {
        this.TOGGLE_CONFIRMATION_MODAL()
      }
    }
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date()
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + parseInt(this.paymentTerms)
      )
      this.paymentDueDate = new Date(
        this.paymentDueDateUnix
      ).toLocaleDateString('en-us', this.dateOptions)
    }
  }
}
</script>

<style scoped lang="scss">
.invoice__form-wrapper {
  position: fixed;
  top: 0;
  left: 0rem;
  padding-top: 5rem;
  width: 100%;
  height: 100vh;
  color: #636476;
  z-index: 10;
  background-color: rgba(20, 22, 37, 0.5);
  background-color: transparent;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 900px) {
    left: 5rem;
    top: 0;
  }
}
.invoice__content {
  position: relative;
  // border-top: 1px solid #636476;
  // border-right: 1px solid #636476;
  // border-bottom: 1px solid #636476;
  max-width: 40rem;
  background: #141625;
  padding: 3.5rem;

  .location-details,
  .client-location {
    gap: 16px;
    div {
      flex: 1;
    }
  }
}
input,
select {
  width: 100%;
  background-color: #1e2139;
  color: #fff;
  border-radius: 4px;
  padding: 12px 12px;
  margin: 4px 0;
  border: none;

  &:focus {
    outline: none;
  }
}
.close-button {
  position: absolute;
  top: -25px;
  right: -25px;
}
.invoice-work {
  .payment {
    gap: 24px;
    div {
      flex: 1;
    }
  }
}
.work-details-items {
  .item-list {
    width: 100%;

    // Table
    .table-heading,
    .table-items {
      gap: 1rem;
      font: 0.75rem;

      .item-name {
        flex-basis: 50%;
      }

      .item-qty {
        flex-basis: 10%;
      }

      .item-price {
        flex-basis: 20%;
      }

      .item-total {
        flex-basis: 20%;
        align-self: center;
      }
    }
    .table-heading {
      margin-bottom: 16px;

      th {
        text-align: left;
      }
    }
    .table-items {
      position: relative;
      img {
        position: absolute;
        top: 15px;
        right: 0;
        width: 12px;
        height: 16px;
      }
    }
  }
}
.add-item-button {
  width: 100%;
}
</style>
