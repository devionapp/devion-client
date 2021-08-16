<template>
  <DVForm
    ref="form"
    :validations="$v"
    buttonSize="x-large"
    labelConfirm="Cadastrar"
    @onCancel="$router.push({ name: 'login' })"
    @onConfirm="handleCreateNewAccount"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Cadastrar nova organização</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            autofocus
            prependInnerIcon="mdi-domain"
            label="Nome da sua organização"
            v-model="newAccount.companyName"
            :v="$v.newAccount.companyName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="6">
          <TextField
            prependInnerIcon="mdi-account"
            label="Nome do responsável"
            v-model="newAccount.firstName"
            :v="$v.newAccount.firstName"
          />
        </v-col>
        <v-col cols="12" lg="6">
          <TextField
            label="Sobrenome"
            v-model="newAccount.lastName"
            :v="$v.newAccount.lastName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            hint="Este e-mail será utilizado para o login"
            prependInnerIcon="mdi-email"
            label="E-mail do responsável"
            v-model="newAccount.userEmail"
            :v="$v.newAccount.userEmail"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            prependInnerIcon="mdi-key"
            label="Senha"
            type="password"
            v-model="newAccount.userPassword"
            :v="$v.newAccount.userPassword"
          />
        </v-col>
      </v-row>
    </v-container>
  </DVForm>
</template>

<script>
import Auth from "@/modules/auth/models/Auth";
import DVForm from "@/components/Form/DVForm";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "RegisterForm",
  components: { DVForm },
  data() {
    return {
      model: new Auth(),
      loading: false,
      newAccount: {
        companyName: null,
        firstName: null,
        lastName: null,
        userEmail: null,
        userPassword: null
      }
    };
  },
  validations: {
    newAccount: {
      companyName: { required },
      firstName: { required },
      lastName: { required },
      userEmail: { required, email },
      userPassword: { required }
    }
  },
  methods: {
    async handleCreateNewAccount() {
      this.loading = true;
      await this.model.createNewAccount(this.newAccount);
      this.loading = false;
    }
  }
};
</script>
