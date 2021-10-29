<template>
  <section class="DashboardProjetosHorasRegistradas">
    <v-card style="height:400px; position:relative;">
      <v-card-text>
        <v-row
          class="d-flex align-center justify-start"
          style="width:100%;height:100%;margin:0;"
        >
          <p>
            Horas registradas em projetos (últimos 7 dias)
          </p>

          <v-col cols="7" class="d-flex justify-end">
            <v-select
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

            <Button dense @click="getProjectsTimeRegistered" color="primary">
              Filtrar
            </Button>
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  async mounted() {
    await Promise.all([
      this.getProjects(),
      this.getProjectsTimeRegistered(),
      this.fillData()
    ]);
  },
  methods: {
    async getProjects() {
      this.projects = await this.projectModel.loadCollection();
    },
    async getProjectsTimeRegistered() {
      await this.model.getProjectsTimeRegistered(this.project);
    },
    fillData() {
      this.datacollection = {
        labels: [
          "27/09",
          "28/09",
          "29/09",
          "30/09",
          "01/10",
          "02/10",
          "03/10",
          "04/10"
        ],
        datasets: [
          {
            label: "Requisito",
            backgroundColor: "#183059",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Bug",
            backgroundColor: "#8C183E",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };

      this.loaded = true;
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
