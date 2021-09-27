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
      <template v-if="flow.steps && flow.steps.length">
        <v-row v-for="(step, index) in flow.steps" :key="index">
          <template v-if="!step.isFinish">
            <v-col cols="1" class="d-flex justify-center align-center pb-5">
              <h3 class="text-center mb-5">{{ step.index }}.</h3>
            </v-col>
            <v-col cols="12" lg="4">
              <TextField
                :label="`Nome da etapa ${step.index}`"
                v-model="step.name"
              />
            </v-col>
            <v-col cols="12" lg="3">
              <Select
                label="Skill necessária"
                v-model="step.skillId"
                itemValue="id"
                :items="skills"
              />
            </v-col>

            <v-col cols="12" lg="2">
              <Button
                icon
                color="error"
                class="mt-2"
                @click="removeStep(index)"
              >
                <v-icon>mdi-delete</v-icon>
              </Button>
            </v-col>
          </template>
        </v-row>
        <v-row>
          <v-col cols="1" class="d-flex justify-center align-center pb-5">
            <h3 class="text-center mb-5">{{ flow.steps.length }}.</h3>
          </v-col>
          <v-col cols="12" lg="4">
            <TextField :label="`Etapa final`" v-model="finishText" disabled />
          </v-col>
        </v-row>
      </template>
      <p v-else>Nenhuma etapa cadastrada</p>
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
import Skill from "../models/Skill";

export default {
  name: "FlowForm",
  components: {
    DVForm
  },
  data() {
    return {
      model: new Flow(),
      skillModel: new Skill(),
      skills: [],
      finishText: "Finalizado",
      flow: {
        name: null,
        steps: []
      }
    };
  },
  async created() {
    this.skills = await this.skillModel.loadCollection();
  },
  methods: {
    addStep() {
      if (!this.flow.steps) {
        this.flow.steps = [];
      }

      this.flow.steps.push({
        index: this.flow.steps.length,
        name: null,
        isFinish: false
      });

      this.$forceUpdate();
    },
    removeStep(index) {
      this.flow.steps.splice(index, 1);
      this.$forceUpdate();
    }
  },
  validations: {
    flow: {
      name: { required }
    }
  }
};
</script>
