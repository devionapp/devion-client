<template>
  <section id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar color="#E0E0E0">
            {{ user.firstName.substr(0, 1) }}{{ user.lastName.substr(0, 1) }}
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

      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            :content="unreadNotifications"
            :value="unreadNotifications > 0"
            color="red"
            overlap
          >
            <v-btn icon v-bind="attrs" v-on="on" @click="clearMessages">
              <v-icon>mdi-bell</v-icon>
            </v-btn>
          </v-badge>
        </template>

        <v-list left-bottom>
          <template v-if="notifications.length">
            <v-list-item
              v-for="(notification, index) in notifications"
              :key="index"
            >
              <v-list-item-icon>
                <v-icon>mdi-bell</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  v-html="notification.message"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-html="moment(notification.date).format('L')"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item v-else>
            Nenhuma notificação.
          </v-list-item>
        </v-list>
      </v-menu>

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
import Notification from "@/modules/notifications/models/Notification";
import moment from "moment";

export default {
  name: "Home",
  data: () => ({
    drawer: true,
    notificationModel: new Notification(),
    notifications: [],
    moment: moment
  }),
  async mounted() {
    await this.getNotifications();
  },
  computed: {
    ...mapGetters("User", {
      user: "getUser"
    }),
    unreadNotifications() {
      return (this.notifications?.filter(n => !n.read)).length;
    },
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
          title: "Atividades",
          icon: "mdi-calendar-check",
          route: "atividades",
          permission: "VIEW_TASKS"
        },
        {
          title: "Fluxos",
          icon: "mdi-sitemap",
          route: "flows",
          permission: "VIEW_FLOWS"
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
        },
        {
          title: "Cronograma",
          icon: "mdi-calendar-check",
          route: "schedule",
          permission: "VIEW_SCHEDULE"
        }
      ];

      return items.filter(i => !i.permission || hasPermission(i.permission));
    }
  },

  methods: {
    ...mapMutations("User", {
      setUser: "SET_USER"
    }),
    async getNotifications() {
      this.notifications = await this.notificationModel.loadCollection();
    },
    async clearMessages() {
      await Promise.all(
        this.notifications.map(async n => {
          await this.notificationModel.updateRecord(n.id, { ...n, read: true });
        })
      );

      await this.getNotifications();
    },
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
