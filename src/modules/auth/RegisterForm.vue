<template>
  <EZForm
    ref="form"
    :validations="$v"
    buttonSize="x-large"
    labelConfirm="Cadastrar"
    @onCancel="$router.push({ name: 'login' })"
    @onConfirm="$router.push({ name: 'login' })"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Cadastrar nova conta</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            autofocus
            prependInnerIcon="mdi-domain"
            label="Nome da sua empresa"
            v-model="newAccount.companyName"
            :v="$v.newAccount.companyName"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            prependInnerIcon="mdi-account"
            label="Nome do responsável"
            v-model="newAccount.userName"
            :v="$v.newAccount.userName"
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
            v-model="newAccount.userPassword"
            :v="$v.newAccount.userPassword"
          />
        </v-col>
      </v-row>
    </v-container>
  </EZForm>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import EZForm from "@/components/Form/EZForm";

export default {
  name: "RegisterForm",
  components: { EZForm },
  data() {
    return {
      newAccount: {
        companyName: null,
        userName: null,
        userEmail: null,
        userPassword: null
      }
    };
  },
  validations: {
    newAccount: {
      companyName: { required },
      userName: { required },
      userEmail: { required, email },
      userPassword: { required }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.RegisterForm {
}
</style>
