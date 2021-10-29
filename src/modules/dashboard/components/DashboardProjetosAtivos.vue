<template>
  <section class="DashboardProjetosAtivos">
    <v-card style="height:400px;">
      <v-card-text class="d-flex align-center w-100 justify-between">
        <p class="mb-0">
          Projetos
        </p>
        <download-excel
          :data="projectsRelatorio"
          worksheet="Projetos Ativos"
          name="projetosAtivos.xls"
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
              <v-progress-linear
                color="success"
                v-model="project.porcentagemTarefasFinalizadas"
              />
              <p class="text-center">
                {{ project.tarefasFinalizadas }}/{{ project.totalTarefas }} -
                {{ project.porcentagemTarefasFinalizadas }}%
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
export default {
  name: "DashboardProjetosAtivos",
  data() {
    return {
      model: new Dashboard(),
      projects: [],
      json_data: [
        {
          name: "Tony Peña",
          city: "New York",
          country: "United States",
          birthdate: "1978-03-15",
          phone: {
            mobile: "1-541-754-3010",
            landline: "(541) 754-3010"
          }
        },
        {
          name: "Thessaloniki",
          city: "Athens",
          country: "Greece",
          birthdate: "1987-11-23",
          phone: {
            mobile: "+1 855 275 5071",
            landline: "(2741) 2621-244"
          }
        }
      ]
    };
  },
  async created() {
    this.projects = (await this.model.getActiveProjects()).data;
  },
  methods: {},
  computed: {
    projectsRelatorio() {
      return this.projects.map(p => {
        return {
          Projeto: p.name,
          "Horas Estimadas": p.horasEstimadas,
          "Horas Realizadas": p.horasRealizadas,
          "% Requisitos Finalizados": p.porcentagemTarefasFinalizadas
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
