<template>
  <v-btn
    :color="color"
    @click="$emit('click')"
    v-bind="$attrs"
    :loading="loading"
  >
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    color: { required: false, default: "secondary", type: String },
    text: { required: false, default: "", type: String },
    loading: { required: false, default: false, type: Boolean }
  }
};
</script>
