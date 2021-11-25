<template>
  <navigation class="navigation-bar" />
  <div class="main-wrapper ">
    <router-view />
  </div>
</template>
<script>
import Navigation from './components/Navigation.vue'
export default {
  components: { Navigation }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  background-color: #141625;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}
.main-wrapper {
  margin-top: 5rem;
  @media (min-width: 900px) {
    margin-top: 5rem;
  }
}
.container {
  width: 100%;
  padding: 40px 10px;
  max-width: 850px;
  margin: 0 auto;

  @media (min-width: 900px) {
    padding-top: 72px;
  }
}

.nav-link {
  text-decoration: none;
  color: initial;
}
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
}
// Status Button Styling
</style>
