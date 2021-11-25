<template>
  <base-card>
    <div class="invoice__list-wrapper grid  text-white bg-darkPurple">
      <div class="invoice__id bg-none ">#555</div>
      <div class="invoice__date">25.12.2021</div>
      <div class="invoice__title">Alex Grim</div>
      <div class="invoice__amount">555</div>
      <div class="invoice__status">
        <base-button class="status-button" mode="pending">Pending</base-button>
        <div class="invoice__arrow-right sm:hidden">></div>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {}
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
