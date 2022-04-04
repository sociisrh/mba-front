<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="appLogo"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              {{ appName }}
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Bem-vindo! 👋🏻
          </p>
          <p class="mb-2">Comece agora organizar seu empreendimento</p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-text-field
            v-model="email"
            outlined
            label="E-mail"
            placeholder="john@example.com"
            hide-details
            class="mb-3"
            id="email"
            name="email"
            type="email"
            :hint="errors.first('email')"
            :error="errors.collect('email').length ? true : false"
            v-validate="{ required: true }"
            data-vv-validate-on="change|blur|input"
            data-vv-as="e-mail"
            persistent-hint
          ></v-text-field>

          <v-text-field
            v-model="password"
            outlined
            :type="isPasswordVisible ? 'text' : 'password'"
            label="Senha"
            placeholder="············"
            :append-icon="
              isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
            "
            hide-details
            @click:append="isPasswordVisible = !isPasswordVisible"
            id="password"
            name="password"
            :hint="errors.first('password')"
            :error="errors.collect('password').length ? true : false"
            v-validate="{ required: true }"
            data-vv-validate-on="change|blur|input"
            data-vv-as="password"
            persistent-hint
          ></v-text-field>

          <div class="d-flex align-center justify-space-between flex-wrap">
            <v-checkbox hide-details label="Remember Me" class="mt-0">
            </v-checkbox>

            <!-- forget link -->
            <router-link :to="{ name: 'auth-forgot-password' }" class="ms-3">
              Forgot Password?
            </router-link>
          </div>

          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-6"
            @click="login()"
          >
            Login
          </v-btn>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2"> Novo na plataforma, registre-se </span>
          <router-link :to="{ name: 'auth-register' }">
            Criar conta
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">ou</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <v-card-actions class="d-flex justify-center">
          <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1" @click="validAction(link.action)">
            <v-icon
              :color="$vuetify.theme.dark ? link.colorInDark : link.color"
            >
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light' }.png`)"/>

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiFacebook,
  mdiGithub,
  mdiGoogle,
  mdiEyeOutline,
  mdiEyeOffOutline,
} from "@mdi/js";
import themeConfig from "@themeConfig";
import store from "@/store";

export default {
  name: "Login",
  components: {},
  data: () => ({
    socialLink: [
      {
        icon: mdiFacebook,
        color: "#4267b2",
        colorInDark: "#4267b2",
        action: 'facebook'
      },
      {
        icon: mdiGithub,
        color: "#272727",
        colorInDark: "#fff",
        action: 'github'
      },
      {
        icon: mdiGoogle,
        color: "#db4437",
        colorInDark: "#db4437",
        action: 'google'
      },
    ],
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
    isPasswordVisible: false,
    email: "",
    password: "",
    message: "",
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo,
  }),
  computed: {
    erroMessage: {
      get() {
        return store.getters["auth/getErrorMessage"];
      },
      set(value) {
        store.dispatch("auth/setErrorMessage", value);
      },
    },
  },
  methods: {
    async login() {
      this.$validator.validateAll().then((result) => {
        if (result === true) {
          const data = {
            email: email.value,
            password: password.value,
          };
          store
            .dispatch("auth/login", data)
            .then((resp) => {
              if (resp === true) {
                const userData = JSON.stringify(localStorage.getItem("user"));
                const userToken = localStorage.getItem("accessToken");
                if (userData !== undefined && userToken !== undefined) {
                  store.dispatch("auth/dadosUsuario");
                }
              }
            })
            .catch((erro) => {
              this.$store.dispatch("module/openSnackBar", {
                color: "error",
                timeout: 10000,
                text: "Oops, dados invalidos.",
              });
            });
        } else {
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 10000,
            text: "Oops, falta informações no formulário.",
          });
        }
      });
    },
    async loginGithub() {
      store.dispatch("auth/loginGithub").then((resp) => {
        if (resp.data.data) {
          window.location.href = resp.data.data
        }
      });
    },
    validAction(item)
    {
      switch (item) {
        case 'github':
          this.loginGithub();
          break;
        case 'facebook':
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 3000,
            text: "Oops, tivemos um problema por aqui, tente com o GitHub, por favor.",
          });
          break;
        case 'google':
            this.$store.dispatch("module/openSnackBar", {
              color: "error",
              timeout: 3000,
              text: "Oops, tivemos um problema por aqui, tente com o GitHub, por favor.",
            });
          
          break;     
      }
    }
  },
  created() {
    if (this.erroMessage !== "") {
      this.$store.dispatch("module/openSnackBar", {
        color: "error",
        timeout: 10000,
        text: this.erroMessage,
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@core/preset/preset/pages/auth.scss";
</style>
