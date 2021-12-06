<template>
  <div class="rounded-lg w-full bg-darkPurple card  ">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.card {
  padding: 2rem;
  @media (max-width: 700px) {
    padding: 1rem;
  }
}
</style>
