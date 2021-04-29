<template>
  <div @keydown.enter="onConfirm">
    <v-card v-if="card">
      <v-container>
        <DVFormContent
          :buttonSize="buttonSize"
          :labelCancel="labelCancel"
          :labelConfirm="labelConfirm"
          :hideCancel="hideCancel"
          :hideFooter="hideFooter"
        >
          <slot />
        </DVFormContent>
      </v-container>
    </v-card>

    <DVFormContent
      v-else
      :buttonSize="buttonSize"
      :labelCancel="labelCancel"
      :labelConfirm="labelConfirm"
      :hideCancel="hideCancel"
      :hideFooter="hideFooter"
    >
      <slot />
    </DVFormContent>
  </div>
</template>

<script>
import { isFunction } from "lodash";
import DVFormContent from "./DVFormContent";
import checkRouteState from "@/router/utils/checkRouteState";
export default {
  name: "DVForm",
  components: { DVFormContent },
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
    model: {
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
    card: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return { valid: false, routeState: checkRouteState(this.$route) };
  },
  async created() {
    if (this.routeState === "EDIT") {
      const response = await this.model.loadRecord(this.$route.params.id);
      this.$emit("input", response);
    }
  },
  methods: {
    onCancel() {
      this.$router.go(-1);
    },

    async insertRecord(record) {
      try {
        if (isFunction(this.$parent.beforeSave)) {
          record = await this.$parent.beforeSave(record);
        }

        if (isFunction(this.$parent.beforeInsert)) {
          record = await this.$parent.beforeInsert(record);
        }

        if (isFunction(this.$parent.insertRecord)) {
          await this.$parent.insertRecord(record);
        } else {
          const responseRecord = await this.model.insertRecord(record);

          if (isFunction(this.$parent.afterSave)) {
            await this.$parent.afterSave(responseRecord);
          } else {
            this.$router.go(-1);
          }
        }

        return Promise.resolve();
      } catch (error) {
        // if (error.attributes) {
        //   this.record.dtAlteracao = error.attributes.dtAlteracao;
        //   this.record.id = error.attributes.id;

        //   if (this.record.id > 0) {
        //     this.state = "EDIT";
        //   }
        // }

        return Promise.reject(error);
      }
    },

    async updateRecord(record) {
      try {
        if (isFunction(this.$parent.beforeSave)) {
          record = await this.$parent.beforeSave(record);
        }

        if (isFunction(this.$parent.beforeUpdate)) {
          record = await this.$parent.beforeUpdate(record);
        }

        if (isFunction(this.$parent.updateRecord)) {
          await this.$parent.updateRecord(record);
        } else {
          const responseRecord = await this.model.updateRecord(
            record.id,
            record
          );

          if (isFunction(this.$parent.afterSave)) {
            await this.$parent.afterSave(responseRecord);
          } else {
            this.$router.go(-1);
          }
        }

        return Promise.resolve();
      } catch (error) {
        // if (error.attributes) {
        //   this.record.dtAlteracao = error.attributes.dtAlteracao;
        //   this.record.id = error.attributes.id;
        // }

        return Promise.reject(error);
      }
    },

    async onConfirm() {
      await this.validateForm();

      if (!this.valid) {
        return;
      }

      if (!this.routeState || this.routeState === "VIEW") {
        return this.$emit("onConfirm");
      }

      if (this.routeState === "EDIT") {
        await this.updateRecord(this.value);
      }
      if (this.routeState === "INSERT") {
        await this.insertRecord(this.value);
      }
    },

    async validateForm() {
      await this.validations.$touch();
      this.valid = !this.validations.$invalid;
    }
  }
};
</script>
