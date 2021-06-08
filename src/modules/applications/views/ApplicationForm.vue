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
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="7">
              <TextField
                label="Nome"
                v-model="project.name"
                :v="$v.project.name"
              />
            </v-col>
            <v-col cols="5">
              <TextField
                label="Linguagem/Framework"
                v-model="project.language"
                :v="$v.project.language"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <TextField
                label="Repositório"
                v-model="project.repository"
                :v="$v.project.repository"
              />
            </v-col>
            <v-col cols="6">
              <TextField
                label="Padrão (Design Pattern)"
                v-model="project.designPattern"
                :v="$v.project.designPattern"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <TextArea
                label="Descrição"
                v-model="project.description"
                :v="$v.project.description"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12" lg="2" align="center">
              <Checkbox label="É uma API" v-model="project.isApi" hideDetails />
            </v-col>
            <v-col cols="12" lg="6" v-if="project.isApi">
              <TextField
                label="URL Base"
                v-model="project.baseUrl"
                :v="$v.project.baseUrl"
              />
            </v-col>
            <v-col cols="12" lg="4" v-if="project.isApi">
              <Select
                label="Tipo de Autenticação"
                :items="authTypes"
                v-model="project.authenticationType"
                :v="$v.project.authenticationType"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Textheader text="Requisitos" />
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
      authTypes: [
        {
          id: 1,
          description: "API Keys"
        },
        {
          id: 2,
          description: "HTTP Basic Authentication"
        },
        {
          id: 3,
          description: "OAuth"
        },
        {
          id: 4,
          description: "JWT"
        },
        {
          id: 5,
          description: "Outro"
        }
      ],
      project: {
        description: null
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
