<template>
  <section class="DashboardProjetosAtivos">
    <v-card style="height:400px;">
      <v-card-text>
        <p>
          Lista de horas registradas por usuário (mês atual)
        </p>
      </v-card-text>
      <table class="DashboardProjetosAtivos__table">
        <thead>
          <th>
            Usuário
          </th>
          <th>
            Horas Registradas
          </th>
          <th>
            % Atividade
          </th>
          <th>
            % Bug
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              Fulano
            </td>
            <td>
              <v-progress-linear color="secondary" v-model="horas" />
              14h12 de 40h/mês
            </td>
            <td>
              40%
            </td>
            <td>
              60%
            </td>
          </tr>
          <tr>
            <td>
              Ciclano
            </td>
            <td>
              <v-progress-linear color="secondary" v-model="horas2" />
              16h00 de 40h/mês
            </td>
            <td>
              100%
            </td>
            <td>
              0%
            </td>
          </tr>
          <!-- <tr v-for="(project, index) in projects" :key="index">
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
              {{ project.tarefasFinalizadas }}
            </td>
          </tr> -->
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
      horas: 10,
      horas2: 15
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
