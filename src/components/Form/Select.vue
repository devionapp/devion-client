<template>
  <v-select
    v-model="input"
    :prepend-inner-icon="prependInnerIcon"
    :append-icon="appendIcon"
    :label="label"
    :color="color"
    :disabled="disabled"
    :error-messages="errors"
    :items="items"
    :item-text="itemText"
    :item-value="itemValue"
    v-bind="$attrs"
    :chips="multiple"
    :multiple="multiple"
    outlined
  >
    <template v-slot:item="data" @click="data.select" v-if="hasItemSlot">
      <slot ref="itemSlot" name="itemSlot" v-bind:item="data.item"></slot>
    </template>
  </v-select>
</template>

<script>
import { has } from "lodash";
export default {
  name: "Select",
  props: {
    value: {
      type: [String, Number, Object, Array],
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
    items: {
      required: false,
      default() {
        return [];
      },
      type: Array
    },
    itemText: { required: false, default: "description", type: String },
    itemValue: { required: false, default: "id", type: String },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasItemSlot() {
      return !!this.$scopedSlots.itemSlot;
    },
    errors() {
      const errors = [];

      if (this.v.$error && has(this.v, "required") && !this.v.required) {
        errors.push("Campo Obrigatório");
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
