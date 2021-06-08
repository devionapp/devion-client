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
              <Select label="Aplicações" v-model="project.applications" />
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
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Project from "../models/Project";
export default {
  name: "ProjectsForm",
  components: {
    DVForm
  },
  data() {
    return {
      model: new Project(),
      project: {
        name: null,
        description: null,
        applications: []
      }
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {
    project: {
      name: { required },
      description: { required }
    }
  }
};
</script>
