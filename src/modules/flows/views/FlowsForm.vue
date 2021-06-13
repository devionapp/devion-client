<template>
  <section class="FlowForm">
    <Subheader title="Flows" />

    <DVForm ref="form" v-model="flow" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <TextField
            label="Descrição"
            v-model="flow.description"
            :v="$v.flow.description"
          />
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Flow from "../models/Flow";
export default {
  name: "FlowForm",
  components: {
    DVForm
  },

  data() {
    return {
      model: new Flow(),
      flow: {
        description: null
      }
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {
    flow: {
      description: { required }
    }
  }
};
</script>

<style lang="scoped"></style>
