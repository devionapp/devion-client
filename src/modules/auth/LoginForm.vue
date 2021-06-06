<template>
  <DVForm ref="form" :validations="$v" @onConfirm="handleLogin" hideFooter>
    <v-container>
      <v-row>
        <v-col cols="12">
          <TextField
            autofocus
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
            v-model="user.password"
            @clickAppend="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :appendIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :v="$v.user.password"
          />
        </v-col>
        <v-col cols="12" lg="4">
          <Button
            width="100%"
            x-large
            label="Entrar"
            :loading="loading"
            @click="$refs.form.onConfirm()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="d-flex align-lg-center justify-lg-center">
          <p style="margin-bottom:0">
            Não tem uma conta?
            <router-link :to="{ name: 'cadastro' }">Cadastre-se!</router-link>
          </p>
        </v-col>
        <!-- <v-col cols="12" lg="6" class="d-flex align-lg-center justify-lg-end">
          <router-link :to="{ name: 'recuperar-senha' }"
            >Esqueceu sua senha?</router-link
          >
        </v-col> -->
      </v-row>
    </v-container>
  </DVForm>
</template>

<script>
import Auth from "@/modules/auth/models/Auth";
import DVForm from "@/components/Form/DVForm";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  components: { DVForm },
  data() {
    return {
      model: new Auth(),
      user: {
        email: null,
        password: null
      },
      loading: false,
      showPassword: false
    };
  },
  validations: {
    user: {
      email: { required, email },
      password: { required }
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      await this.model.login(this.user);
      this.loading = false;
    }
  }
};
</script>
