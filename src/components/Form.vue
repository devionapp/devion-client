<template>
  <v-form class="Form" v-model="valid">
    <slot />
  </v-form>
</template>

<script>
import { validationMixin } from "vuelidate";

export default {
  mixins: [validationMixin],
  name: "Form",
  props: {
    validations: {
      required: false,
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      valid: false,
    };
  },
  validations: {
    ...this.validations,
  },
  created: {},
  methods: {
    async validateForm() {
      await this.$v.$touch();
      this.valid = !this.$v.$invalid;
      return !this.$v.$invalid;
    },
  },
};
</script>
