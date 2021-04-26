<template>
  <div @keydown.enter="onConfirm">
    <v-form class="Form" v-model="valid">
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
            :text="labelCancel"
            @click="onCancel"
          />
        </v-col>
        <v-col cols="12" :lg="hideCancel ? '12' : '6'">
          <Button
            width="100%"
            :x-large="buttonSize === 'x-large'"
            :text="labelConfirm"
            @click="onConfirm"
          />
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "EZForm",
  props: {
    validations: {
      required: false,
      type: Object,
      default() {
        return {};
      }
    },
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
    }
  },
  data() {
    return { valid: false };
  },
  created() {},
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },

    async onConfirm() {
      await this.validateForm();

      if (!this.valid) {
        return;
      }

      this.$emit("onConfirm");
    },

    async validateForm() {
      await this.validations.$touch();
      this.valid = !this.validations.$invalid;
    }
  }
};
</script>
