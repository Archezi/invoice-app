<template>
  <nav class="navigation flex bg-darkPurple">
    <div class="branding bg-purple ">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 5rem;
  z-index: 999;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;

  @media (min-width: 900px) {
    flex-direction: row;
    width: 5rem;
    height: 100vh;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}
.branding {
  width: 5rem;
  height: 5rem;
  position: relative;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  cursor: pointer;
  @media (max-width: 900px) {
    border-top-right-radius: 0;
    border-bottom-left-radius: 1rem;
  }
  img {
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    background: transparent;
    transform: translate(-50%, -50%);
  }
}
</style>
