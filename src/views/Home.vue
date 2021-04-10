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
            <v-list-item-subtitle>Empresa XXX </v-list-item-subtitle>
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

      <v-toolbar-title color="secondary">EzSight</v-toolbar-title>
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
    drawer: null,

    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", route: "dashboard" },
      { title: "Projetos", icon: "mdi-apps-box", route: "projetos" },
      { title: "Tarefas", icon: "mdi-calendar-check", route: "tarefas" },
      { title: "Configurações", icon: "mdi-cog", route: "configuracoes" }
    ]
  })
};
</script>
