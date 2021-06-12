<template>
  <v-textarea
    @click:append="$emit('clickAppend')"
    background-color="#fff"
    v-model="input"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :label="label"
    :color="color"
    v-bind="$attrs"
    :disabled="disabled"
    :error-messages="errors"
    outlined
  />
</template>

<script>
import { has } from "lodash";

export default {
  name: "TextArea",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    v: {
      type: Object,
      default() {
        return {
          $error: false
        };
      }
    },
    color: { required: false, default: "secondary", type: String },
    label: { required: false, default: "", type: String },
    prependInnerIcon: { required: false, default: "", type: String },
    appendIcon: { required: false, default: "", type: String },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    errors() {
      const errors = [];

      if (this.v.$error && has(this.v, "required") && !this.v.required) {
        errors.push("Campo Obrigatório");
      }

      if (this.v.$error && has(this.v, "email") && !this.v.email) {
        errors.push("Formato de E-mail Inválido");
      }

      if (this.v.$error && has(this.v, "minLength") && !this.v.minLength) {
        errors.push(
          `Este campo deve ter no minímo ${this.v.$params.minLength.min} caracteres`
        );
      }

      return errors;
    }
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
  data() {
    return {
      input: ""
    };
  }
};
</script>
