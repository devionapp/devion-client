<template>
  <section class="FlowForm">
    <Subheader title="Fluxos" />

    <DVForm ref="form" v-model="flow" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6">
          <TextField label="Nome" v-model="flow.name" :v="$v.flow.name" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Textheader text="Etapas" />
        </v-col>
      </v-row>
      <v-row v-for="(step, index) in flow.steps" :key="index">
        <v-col cols="1" class="d-flex justify-center align-center pb-5">
          <h3 class="text-center mb-5">{{ step.index }}.</h3>
        </v-col>
        <v-col cols="12" lg="4">
          <TextField
            :label="`Nome da etapa ${step.index}`"
            v-model="step.name"
          />
        </v-col>

        <v-col cols="12" lg="2">
          <Button icon color="error" class="mt-2" @click="removeStep(index)">
            <v-icon>mdi-delete</v-icon>
          </Button>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <Button @click="addStep" color="primary" text>
            <v-icon class="mr-2">mdi-plus</v-icon>
            Nova Etapa
          </Button>
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
        name: null,
        steps: []
      }
    };
  },
  created() {},
  methods: {
    addStep() {
      if (!this.flow.steps) {
        this.flow.steps = [];
      }

      this.flow.steps.push({
        index: this.flow.steps.length + 1,
        name: null
      });

      this.$forceUpdate();
    },
    removeStep(index) {
      this.flow.steps.splice(index, 1);
      this.$forceUpdate();
    }
  },
  computed: {},
  validations: {
    flow: {
      name: { required }
    }
  }
};
</script>
