<template>
  <section id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/1.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Mikael Gallucci</v-list-item-title>
            <!-- <v-list-item-subtitle>Empresa XXX </v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list shaped>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app height="72" color="secondary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title color="secondary">Devion</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link to="/configuracoes">
            <v-list-item-icon>
              <v-icon>mdi-cog-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Configurações
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon color="error">mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <span class="text-red">
                Sair
              </span>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </section>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "dashboard" },
      { title: "Projetos", icon: "mdi-apps-box", route: "projetos" },
      { title: "Tarefas", icon: "mdi-calendar-check", route: "tarefas" }
    ]
  }),
  methods: {
    logout() {
      localStorage.removeItem("devionToken");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
