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
            Total de horas registradas
          </th>
          <th>
            % Atividade
          </th>
          <th>
            % Bug
          </th>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.total }}h</td>
            <td>{{ user.percentTasks }}%</td>
            <td>{{ user.percentBugs }}%</td>
          </tr>
        </tbody>
      </table>
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
      users: []
    };
  },
  async created() {
    this.users = (await this.model.getUsersActivity()).data;
  }
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
