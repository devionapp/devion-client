<template>
  <v-btn
    :color="color"
    @click="$emit('click')"
    v-bind="$attrs"
    :loading="loading"
  >
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else></slot>
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    color: { required: false, default: "secondary", type: String },
    text: { required: false, default: null, type: String },
    loading: { required: false, default: false, type: Boolean }
  }
};
</script>
