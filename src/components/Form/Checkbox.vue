<template>
  <v-checkbox
    v-model="input"
    :label="label"
    v-bind="$attrs"
    :hide-details="hideDetails"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      input: this.value
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(v) {
        this.input = v;
      }
    },
    input: {
      immediate: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
