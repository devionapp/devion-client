<template>
  <section class="Subheader d-flex align-center justify-between w-100">
    <div class="Subheader__Title">
      <label for="subheaderTitle">{{ computedSubtitle }}</label>
      <h1 id="subheaderTitle" class="mr-5">{{ title }}</h1>
      <span
        class="Subheader__Backlink"
        v-if="routeState !== 'VIEW' && showGoBack"
        @click="$router.go(-1)"
      >
        <v-icon color="primary" small>
          mdi-chevron-left
        </v-icon>

        Voltar
      </span>
    </div>

    <Button
      v-if="
        createPermission && checkHasPermission(createPermission) && createButton
      "
      @click="$router.push({ name: `${$route.name}.create` })"
      color="primary"
    >
      <v-icon class="mr-2">mdi-plus</v-icon>
      Novo
    </Button>
  </section>
</template>

<script>
import hasPermission from "@/helpers/hasPermission";
import checkRouteState from "@/router/utils/checkRouteState";

export default {
  name: "Subheader",
  props: {
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    createButton: {
      type: Boolean,
      default: true
    },
    createPermission: {
      type: String,
      default: null
    },
    showGoBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      routeState: checkRouteState(this.$route)
    };
  },
  created() {},
  methods: {
    checkHasPermission(permission) {
      return hasPermission(permission);
    }
  },
  computed: {
    computedSubtitle() {
      if (this.subtitle) {
        return this.subtitle;
      }

      switch (this.routeState) {
        case "INSERT":
          return "Cadastrar";
        case "EDIT":
          return "Editar";
        case "VIEW":
          return "Visualizar";
        case "SETTING":
          return "Configurações";
        default:
          return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.Subheader {
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  &__Title {
    position: relative;
    label {
      position: relative;
      font-size: 14px;
      top: 10px;
    }

    h1 {
      position: relative;

      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 4px;
        left: 0;
        bottom: 0;
        background-color: var(--v-secondary-base);
        border-radius: 8px;
      }
    }
  }

  &__Backlink {
    cursor: pointer;
    cursor: pointer;
    font-size: 14px;
    color: var(--v-primary-base);
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
}
</style>
