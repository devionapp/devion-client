<template>
  <section class="DashboardProjetosAtivos">
    <v-card style="height:400px;">
      <v-card-text class="d-flex align-center w-100 justify-between">
        <p class="mb-0">
          Lista de horas registradas por usuário
        </p>
        <download-excel
          :data="usersRelatorio"
          worksheet="Horas por usuario"
          name="horasUsuario.xls"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text icon color="primary" v-bind="attrs" v-on="on">
                <v-icon>
                  mdi-file-export
                </v-icon>
              </v-btn>
            </template>
            <span>Gerar relatório</span>
          </v-tooltip>
        </download-excel>
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
  },
  computed: {
    usersRelatorio() {
      return this.users.map(u => {
        return {
          Nome: u.name,
          "Total horas registradas": u.total,
          "% Atividade": u.percentTasks,
          "% Bug": u.percentBugs
        };
      });
    }
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
