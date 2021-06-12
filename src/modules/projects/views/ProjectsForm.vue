<template>
  <section class="ProjectsForm">
    <Subheader title="Projetos" />

    <DVForm ref="form" v-model="project" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-row>
            <v-col cols="12">
              <TextField
                label="Nome"
                v-model="project.name"
                :v="$v.project.name"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <Select
                multiple
                label="Aplicações"
                v-model="project.apps"
                return-object
                :items="apps"
                item-text="name"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8">
          <TextArea
            label="Descrição"
            v-model="project.description"
            :v="$v.project.description"
            rows="6"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Textheader text="Requisitos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-expansion-panels multiple v-model="openedPanels">
            <v-expansion-panel
              v-for="(requirement, index) in project.requirements"
              :key="index"
              class="panel"
            >
              <v-expansion-panel-header ripple disable-icon-rotate>
                <span class="text-color-primary">
                  <b> {{ index + 1 }}.{{ requirement.name }} </b>
                </span>

                <template v-slot:actions>
                  <v-btn
                    text
                    icon
                    @click="removeRequirement(index)"
                    v-bind="attrs"
                    v-on="on"
                    class="mr-5"
                  >
                    <v-icon color="error">
                      mdi-delete
                    </v-icon>
                  </v-btn>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="mt-5">
                  <v-col cols="7">
                    <v-row>
                      <v-col cols="6">
                        <TextField
                          autofocus
                          :class="`panel-textfield-${index}`"
                          label="Nome"
                          v-model="requirement.name"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <TextArea
                          label="Descrição"
                          v-model="requirement.description"
                          rows="4"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <Button @click="addRequirement" color="primary" text>
            <v-icon class="mr-2">mdi-plus</v-icon>
            Novo Requisito
          </Button>
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Project from "../models/Project";
import Application from "../models/Application";

export default {
  name: "ProjectsForm",
  components: {
    DVForm
  },
  data() {
    return {
      model: new Project(),
      applicationModel: new Application(),
      openedPanels: [],
      apps: [],
      project: {
        name: null,
        description: null,
        requirements: [],
        apps: []
      }
    };
  },
  async mounted() {
    this.apps = await this.applicationModel.loadCollection();
  },
  methods: {
    async addRequirement() {
      this.project.requirements.push({
        name: "Novo requisito",
        description: ""
      });

      await this.$nextTick();

      const index = this.project.requirements.length - 1;

      await this.openedPanels.push(index);

      setTimeout(() => {
        this.$vuetify.goTo(`.panel-textfield-${index}`);
      }, 200);
    },
    async removeRequirement(index) {
      this.project.requirements.splice(index, 1);
    }
  },
  computed: {},
  validations: {
    project: {
      name: { required },
      description: { required }
    }
  }
};
</script>
<style lang="scss" scoped>
.panel {
  background: #f1f1f1 !important;
}
</style>
