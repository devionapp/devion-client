<template>
  <v-text-field
    v-model="value"
    :label="label"
    :color="color"
    v-bind="$attrs"
    outlined
  ></v-text-field>
</template>

<script>
export default {
  name: "TextField",
  data() {
    return {
      value: null,
    };
  },
  props: {
    color: { required: false, default: "secondary", type: String },
    label: { required: false, default: "", type: String },
  },
};
</script>
