<template>
  <EZForm
    ref="form"
    :validations="$v"
    buttonSize="x-large"
    labelConfirm="Enviar"
    @onCancel="$router.push({ name: 'login' })"
    @onConfirm="$router.push({ name: 'login' })"
  >
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Recuperar Senha</h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <TextField
            autofocus
            prependInnerIcon="mdi-email"
            label="Digite seu e-mail"
            hint="Será enviado um link para geração de nova senha"
            v-model="email"
            :v="$v.email"
          />
        </v-col>
      </v-row>
    </v-container>
  </EZForm>
</template>

<script>
import EZForm from "@/components/Form/EZForm";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "RegisterForm",
  components: { EZForm },
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: { required, email }
  },
  methods: {}
};
</script>
