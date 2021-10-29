<template>
  <section class="DashboardProjetosHorasRegistradas">
    <v-card style="height:400px; position:relative;">
      <v-card-text>
        <v-row
          class="d-flex align-center justify-start align-center"
          style="width:100%;height:100%;margin:0;"
        >
          <p>
            Horas registradas em projetos (últimos 7 dias)
          </p>

          <v-col cols="5" class="d-flex justify-end align-center">
            <v-select
              x-small
              class="mx-4"
              flat
              :items="projects"
              v-model="project"
              hide-details
              label="Projeto"
              item-text="name"
              item-value="id"
              prepend-inner-icon="mdi-magnify"
              solo-inverted
              clearable
              dense
            />

            <Button @click="getProjectsTimeRegistered" color="primary" x-small>
              Filtrar
            </Button>
          </v-col>

          <v-col cols="2">
            <download-excel
              :data="horasRegistradasRelatorio"
              :worksheet="`Horas do projeto ${projectName}`"
              :name="`horasProjeto-${projectName}.xls`"
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
          </v-col>
        </v-row>

        <BarChart
          v-if="loaded"
          :chartdata="datacollection"
          :options="chartOptions"
          :styles="styles"
        />
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
import Dashboard from "../models/Dashboard";
import Project from "../models/Project";
import BarChart from "@/components/Charts/BarChart";

export default {
  name: "DashboardProjetosHorasRegistradas",
  components: { BarChart },
  data() {
    return {
      model: new Dashboard(),
      projectModel: new Project(),
      project: null,
      datacollection: null,
      styles: {
        height: "320px"
      },
      projects: [],
      loaded: false,
      horasRegistradas: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    horasRegistradasRelatorio() {
      return this.horasRegistradas.map(h => {
        return {
          Data: h.date,
          Atividades: h.tasks,
          Bugs: h.bugs
        };
      });
    },
    projectName() {
      return this.project?.name;
    }
  },
  async mounted() {
    await this.getProjects();
    await Promise.all([this.getProjectsTimeRegistered(), this.fillData()]);
  },
  methods: {
    async getProjects() {
      this.projects = await this.projectModel.loadCollection();
    },
    async getProjectsTimeRegistered() {
      this.loaded = false;

      if (!this.project) {
        this.project = this.projects[0];
      }

      this.horasRegistradas = (
        await this.model.getProjectsTimeRegistered(this.project.id)
      ).data;

      this.fillData(this.horasRegistradas);
      this.loaded = true;
    },
    fillData(data) {
      if (!data) {
        return;
      }
      this.datacollection = {
        labels: data.map(d => d.date),
        datasets: [
          {
            label: "Requisito",
            backgroundColor: "#183059",
            data: data.map(d => d.tasks)
          },
          {
            label: "Bug",
            backgroundColor: "#8C183E",
            data: data.map(d => d.bugs)
          }
        ]
      };

      this.loaded = true;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
