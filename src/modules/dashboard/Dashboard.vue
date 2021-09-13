<template>
  <section class="Dashboard">
    <v-row>
      <v-col cols="2">
        <v-card class="mt-5" hover link to="projetos">
          <v-container>
            <div class="Dashboard__Card">
              <h2>Seus Projetos</h2>
              <span>{{ projects }}</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="mt-5" hover link to="tarefas">
          <v-container>
            <div class="Dashboard__Card">
              <h2>Suas Tarefas</h2>
              <span>{{ tasks }}</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="mt-5" hover>
          <v-container>
            <div class="Dashboard__Card">
              <h2>Seus Bugs</h2>
              <span>{{ bugs }}</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="mt-5" hover>
          <v-container>
            <div class="Dashboard__Card">
              <h2>Tarefas Finalizadas</h2>
              <p>Últimos 7 dias</p>
              <span>{{ finishedTasks }}</span>
            </div>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
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

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <!-- <v-btn block text>
              Go to Report
            </v-btn> -->
          </v-card-actions>
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

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <!-- <v-btn block text>
              Go to Report
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import Project from "./models/Project";
import Task from "./models/Task";

export default {
  name: "Dashboard",
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
.Dashboard {
  &__Card {
    position: relative;
    height: 200px;

    h2 {
      font-size: 30px;
    }

    span {
      position: absolute;
      color: var(--v-text-base);
      opacity: 0.8;
      bottom: 0;
      right: 0;
      font-size: 160px;
      align-items: baseline;
      vertical-align: text-bottom;
      line-height: 120px;
    }

    &:hover {
      span {
        opacity: 1;
      }
    }
  }
}
</style>
