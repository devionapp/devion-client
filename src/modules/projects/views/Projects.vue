<template>
  <section class="Projects">
    <h1>Projetos</h1>

    <v-card class="mt-2">
      <v-container>
        <h4>Sistema para clinica veterinária</h4>
        <p>
          Projeto voltado para a criação de um sistema para clinicas
          veterinarias.
        </p>
        <p><strong>URL Base: </strong>https://clinicavet.com/api/</p>
        <h4>Requisitos:</h4>
        <v-card>
          <v-container>
            <p>
              1. Cadastro de veterinario
            </p>
            <p>
              <strong>
                Recurso:
              </strong>
              /veterinario
            </p>
            <p>
              <strong>
                Verbos aceitos:
              </strong>
              POST, PUT, GET, DELETE
            </p>
            <p>
              <strong>
                Campos:
              </strong>
            </p>
            <table>
              <thead>
                <th>Campo</th>
                <th>Tipo</th>
                <th>Obrigatorio</th>
                <th>Formato</th>
              </thead>
              <tbody>
                <tr>
                  <td>Nome</td>
                  <td>String</td>
                  <td>Sim</td>
                  <td>Livre</td>
                </tr>
                <tr>
                  <td>Sobrenome</td>
                  <td>String</td>
                  <td>Sim</td>
                  <td>Livre</td>
                </tr>
                <tr>
                  <td>Nascimento</td>
                  <td>String</td>
                  <td>Não</td>
                  <td>dd/mm/aaaa</td>
                </tr>
              </tbody>
            </table>
          </v-container>
        </v-card>
      </v-container>
    </v-card>
    <v-card class="mt-5">
      <v-container>
        <h4>Sistema para cartórios</h4>
        <p>
          Projeto voltado para a criação de um sistema para cartórios
        </p>
        <p><strong>URL Base: </strong>https://cartorio.com/api/</p>
      </v-container>
    </v-card>
  </section>
</template>

<script>
export default {
  name: "Projects",
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped></style>
