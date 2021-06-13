<template>
  <h2
    id="textHeader"
    :class="['mr-5', { small: small }, { primaryColor: primary }]"
  >
    {{ text }}
  </h2>
</template>

<script>
export default {
  name: "Subheader",
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin-bottom: 2rem;
  width: 100%;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0;
    bottom: -5px;
    background-color: var(--v-secondary-base);
    border-radius: 8px;
  }

  &.small:after {
    width: 50%;
  }

  &.primaryColor:after {
    background-color: var(--v-primary-base);
  }
}
</style>
