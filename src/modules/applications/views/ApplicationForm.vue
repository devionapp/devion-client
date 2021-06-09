<template>
  <section class="ApplicationsForm">
    <Subheader title="Aplicações" />

    <DVForm
      ref="form"
      v-model="application"
      :model="model"
      :validations="$v"
      card
    >
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
                v-model="application.name"
                :v="$v.application.name"
              />
            </v-col>
            <v-col cols="5">
              <TextField
                label="Linguagem/Framework"
                v-model="application.language"
                :v="$v.application.language"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <TextField
                label="Repositório"
                v-model="application.repository"
                :v="$v.application.repository"
              />
            </v-col>
            <v-col cols="6">
              <TextField
                label="Padrão (Design Pattern)"
                v-model="application.designPattern"
                :v="$v.application.designPattern"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <TextArea
                label="Descrição"
                v-model="application.description"
                :v="$v.application.description"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="6">
          <v-row>
            <v-col cols="12" lg="3" align="center">
              <Select
                label="Tipo"
                :items="appTypes"
                v-model="application.type"
                :v="$v.application.type"
              />
            </v-col>
            <v-col cols="12" lg="6" v-if="application.isApi">
              <TextField
                label="URL Base"
                v-model="application.baseUrl"
                :v="$v.application.baseUrl"
              />
            </v-col>
            <v-col cols="12" lg="4" v-if="application.isApi">
              <Select
                label="Tipo de Autenticação"
                :items="authTypes"
                v-model="application.authenticationType"
                :v="$v.application.authenticationType"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import Application from "../models/Application";
export default {
  name: "ApplicationsForm",
  components: {
    DVForm
  },
  data() {
    return {
      model: new Application(),
      appTypes: [
        {
          id: 1,
          description: "Back-End/API"
        },
        {
          id: 2,
          description: "Front-End"
        },
        {
          id: 3,
          description: "Mobile"
        },
        {
          id: 4,
          description: "Outro"
        }
      ],
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
      application: {
        name: null,
        description: null,
        type: null
      }
    };
  },
  created() {},
  methods: {},
  computed: {},
  validations: {
    application: {
      name: { required },
      description: { required },
      type: { required }
    }
  }
};
</script>
