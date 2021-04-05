<template>
  <EZForm
    ref="form"
    :validations="$v"
    @onConfirm="login"
    buttonSize="x-large"
    labelConfirm="Entrar"
    hideCancel
    hideFooter
  >
    <v-container> </v-container>
    <v-row>
      <v-col cols="12">
        <TextField
          prependInnerIcon="mdi-email"
          label="E-mail"
          type="email"
          v-model="user.email"
          :v="$v.user.email"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="8">
        <TextField
          prependInnerIcon="mdi-key"
          label="Senha"
          type="password"
          v-model="user.password"
          :v="$v.user.password"
        />
      </v-col>
      <v-col cols="12" lg="4">
        <Button
          width="100%"
          x-large
          text="Entrar"
          @click="$refs.form.onConfirm()"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" lg="6">
        <v-checkbox
          v-model="user.keepalive"
          label="Manter conectado"
        ></v-checkbox>
      </v-col>
      <v-col cols="12" lg="6" class="d-flex align-lg-center justify-lg-end">
        <router-link to="/recuperar-senha">Esqueceu sua senha?</router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <p>
          Não tem uma conta?
          <router-link to="/cadastro">Cadastre-se!</router-link>
        </p>
      </v-col>
    </v-row>
  </EZForm>
</template>

<script>
import { mapMutations } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import EZForm from "@/components/Form/EZForm";

export default {
  name: "LoginForm",
  components: { EZForm },
  data() {
    return {
      user: { email: null, password: null, keepalive: false }
    };
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
