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
import checkRouteState from "@/router/utils/checkRouteState";
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
    value: {
      type: Object,
      required: false
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
    },
    putFunction: {
      type: Function,
      required: false,
      default: null
    },
    getFunction: {
      type: Function,
      required: false,
      default: null
    },
    insertFunction: {
      type: Function,
      required: false,
      default: null
    }
  },
  data() {
    return { valid: false, routeState: checkRouteState(this.$route) };
  },
  async created() {
    if (this.routeState === "EDIT") {
      const response = await this.getFunction(this.$route.params.id);
      this.$emit("input", response);
    }
  },
  methods: {
    onCancel() {
      this.$emit("onCancel");
    },

    async onConfirm() {
      await this.validateForm();

      if (!this.valid) {
        return;
      }

      console.log(this.routeState);
      if (!this.routeState || this.routeState === "VIEW") {
        return this.$emit("onConfirm");
      }

      if (this.routeState === "EDIT") {
        await this.putFunction(this.value);
      }
      if (this.routeState === "INSERT") {
        await this.insertFunction(this.value);
      }
    },

    async validateForm() {
      await this.validations.$touch();
      this.valid = !this.validations.$invalid;
    }
  }
};
</script>
