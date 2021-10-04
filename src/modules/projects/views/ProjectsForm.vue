<template>
  <section class="ProjectsForm">
    <Subheader title="Projetos" />

    <ModalCreateTask
      :show="modalCreateTask"
      @close="modalCreateTask = false"
      :requirement="selectedRequirementTasks"
      :projectId="project.id"
    />

    <ModalCreateBug
      :show="modalCreateBug"
      @close="modalCreateBug = false"
      :requirement="selectedRequirementBugs"
      :projectId="project.id"
    />

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
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        icon
                        @click.stop="createTasks(index)"
                        class="mr-5"
                      >
                        <v-icon color="success">
                          mdi-file-tree
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Gerar atividades</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        icon
                        @click.stop="createBug(index)"
                        class="mr-5"
                      >
                        <v-icon color="primary">
                          mdi-bug
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Criar BUG</span>
                  </v-tooltip>

                  <v-btn
                    text
                    icon
                    @click="removeRequirement(index)"
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
                  <v-col cols="12" lg="6">
                    <v-row>
                      <v-col cols="12">
                        <Textheader text="Dados básicos" small primary />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
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
                          rows="5"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <v-row>
                          <v-col cols="12">
                            <Textheader
                              text="Dicionário de Dados"
                              small
                              primary
                            />
                          </v-col>
                        </v-row>
                        <RequirementFields
                          v-model="requirement.fields"
                          :businessRules="requirement.businessRules"
                          :requirementId="requirement.id"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12" lg="6">
                    <v-row>
                      <v-col cols="12">
                        <Textheader text="Regras de Negócio" small primary />
                      </v-col>
                    </v-row>
                    <RequirementBusinessRules
                      v-model="requirement.businessRules"
                      :requirementId="requirement.id"
                    />
                  </v-col>
                </v-row>
                <v-row cols="12">
                  <v-col cols="12" class="d-flex justify-end">
                    <Button
                      label="Salvar"
                      color="success"
                      @click="updateRequirement(index)"
                    />
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
import RequirementFields from "../components/RequirementFields";
import RequirementBusinessRules from "../components/RequirementBusinessRules";
import ModalCreateTask from "../components/ModalCreateTask";
import ModalCreateBug from "../components/ModalCreateBug";
import Project from "../models/Project";
import ProjectRequirement from "../models/ProjectRequirement";
import Application from "../models/Application";
import Flow from "../models/Flow";

export default {
  name: "ProjectsForm",
  components: {
    DVForm,
    RequirementFields,
    RequirementBusinessRules,
    ModalCreateTask,
    ModalCreateBug
  },
  data() {
    return {
      project: {
        name: null,
        description: null,
        requirements: [],
        apps: []
      },
      model: new Project(),
      applicationModel: new Application(),
      flowModel: new Flow(),
      selectedRequirementTasks: {},
      selectedRequirementBugs: {},
      openedPanels: [],
      modalCreateTask: false,
      modalCreateBug: false,
      flows: [],
      apps: []
    };
  },
  async mounted() {
    this.apps = await this.applicationModel.loadCollection();
    this.flows = await this.flowModel.loadCollection();
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

      const { id } = await new ProjectRequirement(this.project.id).insertRecord(
        this.project.requirements[index]
      );

      this.project.requirements[index].id = id;
    },
    async updateRequirement(index) {
      await new ProjectRequirement(this.project.id).updateRecordPatch(
        this.project.requirements[index].id,
        this.project.requirements[index]
      );

      await this.openedPanels.splice(index, 1);
    },
    async removeRequirement(index) {
      await new ProjectRequirement(this.project.id).deleteRecord(
        this.project.requirements[index].id
      );
      this.project.requirements.splice(index, 1);
    },
    createTasks(index) {
      this.selectedRequirementTasks = this.project.requirements[index];
      this.modalCreateTask = true;
    },
    createBug(index) {
      this.selectedRequirementBugs = this.project.requirements[index];
      this.modalCreateBug = true;
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
