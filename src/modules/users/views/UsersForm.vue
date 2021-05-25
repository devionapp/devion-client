<template>
  <section class="UsersForm">
    <Subheader title="Usuários" />

    <DVForm ref="form" v-model="user" :model="model" :validations="$v" card>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados básicos" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <TextField
            autofocus
            prependInnerIcon="mdi-account"
            label="Nome"
            v-model="user.firstName"
            :v="$v.user.firstName"
            :disabled="user.roleId === 1"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <TextField
            label="Sobrenome"
            v-model="user.lastName"
            :v="$v.user.lastName"
            :disabled="user.roleId === 1"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <DatePicker
            id="birthday"
            prependInnerIcon="mdi-calendar"
            label="Data de Nascimento"
            type="date"
            v-model="user.birthday"
            :disabled="user.roleId === 1"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados da conta" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <TextField
            prependInnerIcon="mdi-email"
            label="E-mail"
            type="email"
            v-model="user.email"
            :v="$v.user.email"
            hint="Será utilizado para o login."
            :disabled="user.roleId === 1"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <Select
            :items="perfis"
            label="Perfil"
            :v="$v.user.roleId"
            v-model="user.roleId"
            itemText="name"
            :disabled="user.roleId === 1"
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
        <v-col cols="12" lg="3">
          <TextField
            prependInnerIcon="mdi-key"
            label="Senha"
            :disabled="
              currentUser.roleId === 1 ? false : routeState !== 'INSERT'
            "
            v-model="user.password"
            @clickAppend="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :appendIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :v="$v.user.password"
            :hint="
              routeState === 'INSERT'
                ? `O usuário poderá alterar a senha depois.`
                : null
            "
          />
        </v-col>
        <!-- <v-col cols="12" lg="3">
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
        </v-col> -->
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import {
  required,
  requiredIf,
  email,
  minLength
} from "vuelidate/lib/validators";
import DVForm from "@/components/Form/DVForm";
import checkRouteState from "@/router/utils/checkRouteState";
import User from "../models/User";
import { mapGetters } from "vuex";
export default {
  name: "UsersForm",
  components: { DVForm },
  data() {
    return {
      model: new User(),
      user: {
        firstName: null,
        lastName: null,
        email: null,
        roleId: null,
        skill: null
      },
      routeState: checkRouteState(this.$route),
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
          id: 1,
          name: "Administrador",
          text: "Tem todas as permissoes do sistema",
          icon: "mdi-account-star",
          disabled: true
        },
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
      password: {
        required: requiredIf(function() {
          return this.routeState === "INSERT";
        }),
        minLength: minLength(8)
      },
      roleId: { required }
    }
  },
  computed: {
    ...mapGetters("User", {
      currentUser: "getUser"
    })
  }
};
</script>
