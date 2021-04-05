<template>
  <EZForm
    ref="form"
    :validations="$v"
    @onConfirm="login"
    buttonSize="x-large"
    labelConfirm="Entrar"
    hideCancel
  >
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">
          EzSight
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextField
          label="E-mail"
          type="email"
          v-model="user.email"
          :v="$v.user.email"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TextField
          label="Senha"
          type="password"
          v-model="user.password"
          :v="$v.user.password"
        />
      </v-col>
    </v-row>
  </EZForm>
</template>

<script>
import { mapMutations } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import EZForm from "@/components/EZForm";

export default {
  name: "LoginForm",
  components: { EZForm },
  data() {
    return { user: { email: null, password: null } };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    ...mapMutations("User", {
      setIsLoggedIn: "SET_IS_LOGGED_IN"
    }),
    async login() {
      await this.axios.post("/users", {
        email: `mikagallucci@hotmail.com`,
        password: `123456`
      });
      // this.setIsLoggedIn(true);
      // this.$router.push({ name: "Dashboard" });
    }
  }
};
</script>
<style lang="scss" scoped>
.LoginForm {
}
</style>
