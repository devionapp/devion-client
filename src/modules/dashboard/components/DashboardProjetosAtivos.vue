<template>
  <section class="DashboardProjetosAtivos">
    <v-card style="height:400px;">
      <v-card-text>
        <p>
          Resumo dos projetos ativos
        </p>
      </v-card-text>
      <table class="DashboardProjetosAtivos__table">
        <thead>
          <th>
            Projeto
          </th>
          <th>
            Horas Estimadas
          </th>
          <th>
            Horas Trabalhadas
          </th>
          <th>
            % Requisitos Finalizados
          </th>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>
              {{ project.name }}
            </td>
            <td>
              {{ project.horasEstimadas }}
            </td>
            <td>
              {{ project.horasRealizadas }}
            </td>
            <td>
              <v-progress-linear color="success" v-model="conclusao" />
              <p class="text-center">
                {{ project.tarefasFinalizadas }}/2 - 50%
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <v-card-text class="">
        <div class="DashboardProjetosAtivos__project">
          teste
        </div>
      </v-card-text> -->
    </v-card>
  </section>
</template>

<script>
import Dashboard from "../models/Dashboard";
export default {
  name: "DashboardProjetosAtivos",
  data() {
    return {
      model: new Dashboard(),
      projects: [],
      conclusao: 50
    };
  },
  async created() {
    this.projects = (await this.model.getActiveProjects()).data;
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.DashboardProjetosAtivos {
  &__table {
    width: 100%;
    table-layout: fixed;
    vertical-align: middle;
    font-size: 12px;
    max-width: 100%;
    background-color: transparent;

    th {
      padding-left: 16px;
      padding: 0px 8px;
      height: 37px;
      font-weight: 600;
      text-align: left;
    }

    td {
      padding: 8px 8px;
      border-top: 1px solid #e7eff6;
    }
  }
}
</style>
