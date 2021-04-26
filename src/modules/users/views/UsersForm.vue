<template>
  <section>
    <h1 class="mb-5">Cadastrar usuário</h1>

    <EZForm ref="form" :validations="$v" hideFooter @onConfirm="createNewUser">
      <v-row>
        <v-col cols="12" lg="2">
          <TextField
            autofocus
            prependInnerIcon="mdi-account"
            label="Nome"
            v-model="user.firstName"
            :v="$v.user.firstName"
          />
        </v-col>
        <v-col cols="12" lg="2">
          <TextField
            label="Sobrenome"
            v-model="user.lastName"
            :v="$v.user.lastName"
          />
        </v-col>
        <v-col cols="12" lg="2">
          <TextField
            prependInnerIcon="mdi-email"
            label="E-mail"
            type="email"
            v-model="user.email"
            :v="$v.user.email"
            hint="Será utilizado para o login."
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="2">
          <TextField
            prependInnerIcon="mdi-key"
            label="Senha"
            v-model="user.password"
            @clickAppend="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :appendIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :v="$v.user.password"
            hint="O usuário poderá alterar a senha depois."
          />
        </v-col>
        <v-col cols="12" lg="2">
          <Select
            :items="perfis"
            label="Perfil"
            :v="$v.user.roleId"
            v-model="user.roleId"
            itemText="name"
          >
            <template #itemSlot="data" @click="data.select">
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>{{ data.item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </Select>
        </v-col>
        <v-col cols="12" lg="2">
          <v-select
            outlined
            label="Papel"
            :items="funcoes"
            v-model="user.skill"
          ></v-select>
        </v-col>
        <v-col cols="12" lg="2">
          <v-select
            outlined
            label="Nivel"
            item-text="name"
            :items="niveis"
            v-model="user.skillLevel"
          >
            <template v-slot:item="data" @click="data.select">
              <v-list dense>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>{{ data.item.name }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-subtitle
                      v-html="data.item.text"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" lg="3">
          <Button
            secondary
            text="Convidar"
            x-large
            @click="$refs.form.onConfirm()"
          />
        </v-col>
      </v-row>
    </EZForm>
  </section>
</template>

<script>
import { mapActions } from "vuex";
import { required, email } from "vuelidate/lib/validators";
import EZForm from "@/components/Form/EZForm";

export default {
  name: "UsersForm",
  components: { EZForm },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        roleId: null,
        skill: null
      },
      loading: false,
      showPassword: false,
      niveis: [
        {
          name: 1,
          text: "Nivel Iniciante"
        },
        {
          name: 2,
          text: "Nivel Básico/Júnior"
        },
        {
          name: 3,
          text: "Nivel Intermediário/Pleno"
        },
        {
          name: 4,
          text: "Nivel Avançado/Sênior"
        }
      ],
      funcoes: [
        {
          text: "Desenvolvedor Front-End"
        },
        {
          text: "Desenvolvedor Back-End"
        },
        {
          text: "Analista"
        },
        {
          text: "QA (Test)"
        }
      ],
      perfis: [
        {
          id: 2,
          name: "Gestor",
          text: "Pode fazer todas as ações com projetos e tarefas",
          icon: "mdi-account-star"
        },
        {
          id: 3,
          name: "Colaborador",
          text: "Pode concluir e mover tarefas",
          icon: "mdi-account-settings"
        },
        {
          id: 4,
          name: "Consultor",
          text: "Pode visualizar",
          icon: "mdi-account-search"
        }
      ]
    };
  },
  validations: {
    user: {
      email: { required, email },
      firstName: { required },
      lastName: { required },
      password: { required },
      roleId: { required }
    }
  },
  created() {},
  methods: {
    ...mapActions("User", {
      create: "create"
    }),
    async createNewUser() {
      await this.create(this.user);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped></style>
