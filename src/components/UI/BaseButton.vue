<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
}
</script>

<style scoped lang="scss">
button,
a {
  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }
  font-size: 12px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

a:hover,
a:active,
button:hover,
button:active {
  border: 1px solid rgba(192, 192, 192, 0.5);
}

.paid {
  color: #33d69f;
  margin-right: 30px;

  background-color: rgba(51, 214, 160, 0.1);
  border: 0.05rem solid rgba(51, 214, 160, 0.2);
}

.pending {
  color: #ff8f00;
  margin-right: 30px;

  background-color: rgba(255, 145, 0, 0.1);
  border: 0.05rem solid rgba(255, 145, 0, 0.2);
}

.draft {
  color: #dfe3fa;
  margin-right: 30px;
  background-color: rgba(223, 227, 250, 0.1);
  border: 0.05rem solid rgba(223, 227, 250, 0.2);
}
.add-new {
  color: #dfe3fa;
  margin: 0;
  padding: 5px;
  border-radius: 30px;
  background-color: #7c5dfa;
  border: 0.05rem solid #7c5dfa4f;
}
.save {
  border-radius: 30px;
  color: #dfe3fa;
  background-color: rgba(124, 93, 250, 0.8);
  border: 0.05rem solid #7c5dfa4f;
  &:hover {
    background-color: rgba(124, 93, 250, 1);
  }
}
.save-draft {
  border-radius: 30px;
  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
  border: 0.05rem solid rgba(223, 227, 250, 0.2);
  &:hover {
    background-color: #7c5dfa;
    border: 0.05rem solid #7c5dfa4f;
  }
}
.cancel {
  border-radius: 30px;
  background-color: rgba(223, 227, 250, 0.1);
  border: 0.05rem solid rgba(223, 227, 250, 0.2);
  color: #dfe3fa;
  &:hover {
    background-color: #ec5757;
  }
}
.accept {
  background-color: #33d69f;
  color: #dfe3fa;
}
</style>
