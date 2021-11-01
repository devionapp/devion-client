<template>
  <section class="DashboardEmployeeActivity">
    <v-card style="height:500px;">
      <v-card-text>
        <p>
          Últimas atividades registradas
        </p>
      </v-card-text>
      <table class="DashboardEmployeeActivity__table">
        <thead>
          <th>
            Usuário
          </th>
          <th>
            Data
          </th>
          <th>
            Tempo
          </th>
          <th>
            Requisito
          </th>
        </thead>
        <tbody>
          <template v-if="activities.length">
            <tr v-for="(activity, index) in activities" :key="index">
              <td>{{ activity.userName }}</td>
              <td>{{ moment(activity.date).format("L") }}</td>
              <td>{{ activity.time }}</td>
              <td class="d-flex">
                {{ activity.card.requirement.name }}
                <v-chip
                  class="ml-1"
                  :color="getChipColor(activity.card.type)"
                  x-small
                >
                  {{ getTaskType(activity.card.type) }}
                </v-chip>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="4">
              <p>
                Nenhuma atividade registrada
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </section>
</template>

<script>
import Dashboard from "../models/Dashboard";
import moment from "moment";
export default {
  name: "DashboardEmployeeActivity",
  data() {
    return {
      model: new Dashboard(),
      moment: moment,
      activities: []
    };
  },
  async created() {
    this.activities = (await this.model.getEmployeeActivity()).data;
  },
  methods: {
    getTaskType(type) {
      if (type === "task") {
        return "Requisito";
      }
      if (type === "bug") {
        return "Bug";
      }
    },
    getChipColor(type) {
      if (type === "task") {
        return "secondary";
      }
      if (type === "bug") {
        return "error";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.DashboardEmployeeActivity {
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
