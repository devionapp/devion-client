<template>
  <section id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar color="#E0E0E0">
            {{ user.firstName.substr(0, 1) }}{{ user.lastName.substr(0, 1) }}
            <!-- <img src="https://randomuser.me/api/portraits/men/1.jpg" /> -->
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ user.firstName }} {{ user.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.tenant.name }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list shaped>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="{ name: item.route }"
          >
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

      <v-toolbar-title
        color="secondary"
        @click="$router.push({ name: 'dashboard' })"
      >
        Devion
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- FAZER IGUAL ESSE -->
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
      <!-- ------- -->
    </v-app-bar>

    <v-main>
      <v-container>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-main>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import hasPermission from "@/helpers/hasPermission";
export default {
  name: "Home",
  data: () => ({
    drawer: false
  }),
  computed: {
    ...mapGetters("User", {
      user: "getUser"
    }),
    items() {
      let items = [
        { title: "Dashboard", icon: "mdi-view-dashboard", route: "dashboard" },
        {
          title: "Projetos",
          icon: "mdi-apps-box",
          route: "projetos",
          permission: "VIEW_PROJECTS"
        },
        {
          title: "Aplicações",
          icon: "mdi-application",
          route: "aplicacoes",
          permission: "VIEW_APPLICATIONS"
        },
        {
          title: "Skills",
          icon: "mdi-brain",
          route: "skills",
          permission: "VIEW_SKILLS"
        },
        {
          title: "Usuários",
          icon: "mdi-account-group",
          route: "usuarios",
          permission: "VIEW_USERS"
        }
      ];

      items.forEach((i, index) => {
        if (i.permission && !hasPermission(i.permission)) {
          items.splice(index, 1);
        }
      });

      return items;
    }
  },

  methods: {
    ...mapMutations("User", {
      setUser: "SET_USER"
    }),
    logout() {
      localStorage.removeItem("devionToken");
      this.setUser(null);
      this.$router.push({ name: "login" });
    }
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
