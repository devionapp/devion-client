<template>
  <section class="Dashboard">
    <v-row>
      <v-col cols="12" md="6" xl="3">
        <v-card hover link to="projetos">
          <v-card-text>
            <div>Informativo</div>
            <p class="text-h4">
              Seus Projetos
            </p>
            <span class="text-h2 text--primary">
              {{ projects }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" xl="3">
        <v-card hover link to="atividades">
          <v-card-text>
            <div>Informativo</div>
            <p class="text-h4">
              Suas tarefas
            </p>
            <span class="text-h2 text--primary">
              {{ tasks }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" xl="3">
        <v-card hover link to="atividades">
          <v-card-text>
            <div>Informativo</div>
            <p class="text-h4">
              Seus bugs
            </p>
            <span class="text-h2 text--primary">
              {{ bugs }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" xl="3">
        <v-card hover link to="atividades">
          <v-card-text>
            <div>Últimos 7 dias</div>
            <p class="text-h4">
              Tarefas Finalizadas
            </p>
            <span class="text-h2 text--primary">
              {{ finishedTasks }}
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="6">
        <DashboardProjetosAtivos />
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="6">
        <v-card class=" text-center" color="secondary" dark>
          <v-card-text>
            <v-sheet color="secondary">
              <v-sparkline
                fill
                :value="value"
                :labels="labels"
                color="rgba(255, 255, 255, .7)"
                show-labels
                smooth
              >
                <template v-slot:label="item"> {{ item.value }} </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Seu índice de assertividade mensal
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="text-center" color="primary" dark>
          <v-card-text>
            <v-sheet color="primary">
              <v-sparkline
                fill
                :value="value"
                :labels="labels"
                color="rgba(255, 255, 255, .7)"
                show-labels
                smooth
              >
                <template v-slot:label="item"> {{ item.value }} </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-card-text>
            <div class="text-h4 font-weight-thin">
              Índice de qualidade (requisito x bug)
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row> -->
  </section>
</template>

<script>
import Project from "./models/Project";
import Task from "./models/Task";
import DashboardProjetosAtivos from "./components/DashboardProjetosAtivos.vue";
export default {
  name: "Dashboard",
  components: { DashboardProjetosAtivos },
  data() {
    return {
      labels: [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ"
      ],
      value: [50, 83, 58, 100, 75, 36, 54, 97, 50, 100, 18],
      projects: 0,
      tasks: 0,
      bugs: 0,
      finishedTasks: 0
    };
  },
  async created() {
    this.projects = await new Project().countProjects();
    this.tasks = await new Task().countTasks();
    this.bugs = await new Task().countBugs();
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
// .Dashboard {
//   &__Card {
//     position: relative;
//     height: 200px;

//     h2 {
//       font-size: 30px;
//     }

//     span {
//       position: absolute;
//       color: var(--v-text-base);
//       opacity: 0.8;
//       bottom: 0;
//       right: 0;
//       font-size: 160px;
//       align-items: baseline;
//       vertical-align: text-bottom;
//       line-height: 120px;
//     }

//     &:hover {
//       span {
//         opacity: 1;
//       }
//     }
//   }
// }
</style>
