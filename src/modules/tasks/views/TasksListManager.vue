<template>
  <section class="TasksList">
    <Subheader title="Minhas atividades" />

    <v-row>
      <v-col>
        <v-card shaped>
          <v-card-title> Cadastro de usuários </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                Status: Aguardando Execução
                <v-icon color="success">mdi-check-circle-outline</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-stepper alt-labels shaped value="3">
                  <v-stepper-header>
                    <v-stepper-step step="1" complete color="success">
                      Análise Técnica
                      <small>Finalizado</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2" complete color="success">
                      Back-End
                      <small>Finalizado</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3" color="blue">
                      Front-End
                      <small>Sua etapa!</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4">
                      Testes
                      <small>Aguardando</small>
                    </v-stepper-step>
                  </v-stepper-header>
                </v-stepper>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card shaped>
          <v-card-title> Postagem de Fotos </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                Status: Bloqueada
                <v-icon color="error">mdi-cancel</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-stepper alt-labels shaped value="2">
                  <v-stepper-header>
                    <v-stepper-step step="1" complete color="success">
                      Análise Técnica
                      <small>Finalizado</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="2" color="blue">
                      Back-End
                      <small>Em andamento</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                      Front-End
                      <small>Sua etapa!</small>
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="4">
                      Testes
                      <small>Aguardando</small>
                    </v-stepper-step>
                  </v-stepper-header>
                </v-stepper>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import Task from "../models/Task";
export default {
  name: "TasksList",
  data() {
    return {
      model: new Task(),
      tasks: []
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
