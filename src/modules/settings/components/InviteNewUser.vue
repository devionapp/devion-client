<template>
  <section class="InviteNewUser">
    <h3 class="mb-2">Convidar colaborador</h3>
    <v-row>
      <v-col cols="12" lg="4">
        <TextField label="Nome" hint="Nome completo do novo usuário" />
      </v-col>
      <v-col cols="12" lg="4">
        <TextField
          label="E-mail"
          hint="Será enviado um e-mail para finalizar o cadastro"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="3">
        <v-select
          outlined
          label="Função"
          :items="funcoes"
          v-model="funcao"
        ></v-select>
      </v-col>
      <v-col cols="12" lg="2">
        <v-select
          outlined
          label="Nivel"
          item-text="name"
          :items="niveis"
          v-model="nivel"
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
        <v-select
          color="secondary"
          outlined
          label="Perfil"
          :items="perfis"
          v-model="perfil"
          item-text="name"
        >
          <template v-slot:item="data" @click="data.select">
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
        </v-select>
      </v-col>
      <v-col cols="12" lg="3">
        <Button secondary text="Convidar" x-large />
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  name: "InviteNewUser",
  data() {
    return {
      perfil: null,
      funcao: null,
      nivel: null,
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
          name: "Gestor",
          text: "Pode fazer todas as ações com projetos e tarefas",
          icon: "mdi-account-star"
        },
        {
          name: "Colaborador",
          text: "Pode concluir e mover tarefas",
          icon: "mdi-account-settings"
        },
        {
          name: "Consultor",
          text: "Pode visualizar",
          icon: "mdi-account-search"
        }
      ]
    };
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
