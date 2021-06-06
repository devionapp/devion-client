<template>
  <v-form class="Form">
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
    <v-row v-if="!hideFooter">
      <v-col cols="12" lg="6" v-if="!hideCancel">
        <Button
          width="100%"
          color="error"
          :x-large="buttonSize === 'x-large'"
          buttonSize
          :label="labelCancel"
          @click="onCancel"
        />
      </v-col>
      <v-col cols="12" :lg="hideCancel ? '12' : '6'">
        <Button
          width="100%"
          :x-large="buttonSize === 'x-large'"
          :label="labelConfirm"
          @click="onConfirm"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { isFunction } from "lodash";
export default {
  name: "DVForm",
  props: {
    buttonSize: {
      required: false,
      type: String,
      default: "medium"
    },
    labelCancel: {
      required: false,
      type: String,
      default: "Cancelar"
    },
    labelConfirm: {
      required: false,
      type: String,
      default: "Salvar"
    },
    hideCancel: {
      required: false,
      type: Boolean,
      default: false
    },
    hideFooter: {
      required: false,
      type: Boolean,
      default: false
    },
    valid: {
      required: false,
      type: Boolean,
      default: false
    }
  },

  methods: {
    onCancel() {
      console.log(this.$parent);
      if (isFunction(this.$parent.onCancel)) {
        return this.$parent.onCancel();
      }

      if (isFunction(this.$parent.$parent.onCancel)) {
        return this.$parent.$parent.onCancel();
      }
    },

    onConfirm() {
      if (isFunction(this.$parent.onConfirm)) {
        return this.$parent.onConfirm();
      }

      if (isFunction(this.$parent.$parent.onConfirm)) {
        return this.$parent.$parent.onConfirm();
      }
    }
  }
};
</script>
