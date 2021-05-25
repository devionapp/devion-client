<template>
  <section class="Settings">
    <Subheader title="Configurações" />

    <DVForm
      ref="form"
      v-model="settings"
      :validations="$v"
      card
      @onConfirm="insertRecord"
    >
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados da Empresa" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="4">
          <TextField
            label="Razão Social"
            v-model="settings.company.razaoSocial"
            :disabled="user.roleId !== 1"
          />
        </v-col>
        <v-col cols="12" lg="4">
          <TextField
            label="Nome Fantasia"
            v-model="settings.company.name"
            :v="$v.settings.company.name"
            :disabled="user.roleId !== 1"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <TextField
            label="CNPJ"
            type="number"
            v-model="settings.company.cnpj"
            :disabled="user.roleId !== 1"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Textheader text="Dados da Conta" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <TextField
            autofocus
            prependInnerIcon="mdi-account"
            label="Nome"
            v-model="settings.user.firstName"
            :v="$v.settings.user.firstName"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <TextField
            label="Sobrenome"
            v-model="settings.user.lastName"
            :v="$v.settings.user.lastName"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <DatePicker
            id="birthday"
            prependInnerIcon="mdi-calendar"
            label="Data de Nascimento"
            type="date"
            v-model="settings.user.birthday"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <TextField
            prependInnerIcon="mdi-key"
            label="Senha"
            v-model="settings.user.password"
            @clickAppend="showPassword = !showPassword"
            :type="showPassword ? 'text' : 'password'"
            :appendIcon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :v="$v.settings.user.password"
          />
        </v-col>
      </v-row>
    </DVForm>
  </section>
</template>

<script>
import DVForm from "@/components/Form/DVForm";
import Tenant from "../models/Tenant";
import User from "../models/User";
import { mapGetters } from "vuex";
import { required, requiredIf, minLength } from "vuelidate/lib/validators";

export default {
  name: "Settings",
  components: { DVForm },
  data() {
    return {
      showPassword: false,
      settings: {
        company: {
          name: null,
          razaoSocial: null,
          cnpj: null
        },
        user: {
          firstName: null,
          lastName: null,
          birthday: null
        }
      },
      tenantModel: new Tenant(),
      userModel: new User()
    };
  },
  validations: {
    settings: {
      company: {
        name: {
          required: requiredIf(function() {
            return this.user.roleId === 1;
          })
        }
      },
      user: {
        firstName: { required },
        lastName: { required },
        password: { minLength: minLength(8) }
      }
    }
  },
  async created() {
    this.settings.company = await this.tenantModel.loadRecord(
      this.user.tenantId
    );
    this.settings.user = await this.userModel.loadRecord(this.user.id);
  },
  methods: {
    async insertRecord() {
      await this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      this.updateTenant();
      this.updateUser();
    },

    async updateTenant() {
      if (this.user.roleId !== 1) {
        return;
      }

      await this.tenantModel.updateRecordPatch(
        this.user.tenantId,
        this.settings.company
      );
    },
    async updateUser() {
      await this.userModel.updateRecordPatch(this.user.id, this.settings.user);
    }
  },
  computed: {
    ...mapGetters("User", {
      user: "getUser"
    })
  }
};
</script>
