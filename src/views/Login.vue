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

        <v-card-text>
          <v-alert text color="primary">
            <small class="d-block mb-1">
              Admin e-mail: <strong>admin@manutencao.com</strong> / Senha:
              <strong>admin</strong>
            </small>
            <small>
              Construtora e-mail: <strong>construtora@manutencao.com</strong> /
              Senha: <strong>devomudar</strong>
            </small>
          </v-alert>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form ref="loginForm" @submit.prevent="handleFormSubmit">
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
              :error-messages="errorMessages.email"
              :rules="[validators.required, validators.emailValidator]"
              data-vv-as="e-mail"
              persistent-hint
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Senha"
              :error-messages="errorMessages.password"
              placeholder="Password"
              :append-icon="
                isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline
              "
              :rules="[validators.required]"
              hide-details="auto"
              class="mb-2"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox hide-details label="Lembre se mim" class="mt-0">
              </v-checkbox>

              <!-- forget link -->
              <router-link :to="{ name: 'auth-forgot-password' }" class="ms-3">
                Esqueceu a senha?
              </router-link>
            </div>

            <v-btn
              block
              color="primary"
              type="submit"
              class="mt-6"
              :loading="loadingBtnLogin"
            >
              Login
            </v-btn>
          </v-form>
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
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            icon
            class="ms-1"
            @click="validAction(link.action)"
          >
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
      :src="
        require(`@/assets/images/misc/mask-${
          $vuetify.theme.dark ? 'dark' : 'light'
        }.png`)
      "
    />

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
  mdiTwitter,
  mdiGithub,
  mdiGoogle,
  mdiEyeOutline,
  mdiEyeOffOutline,
} from "@mdi/js";
import { ref, getCurrentInstance } from "@vue/composition-api";
import { required, emailValidator } from "@core/utils/validation";
import axios from "@axios";
import { useRouter } from "@core/utils";
import themeConfig from "@themeConfig";
import store from "@/store";

export default {
  setup() {
    // Template Ref
    const loginForm = ref(null);

    const vm = getCurrentInstance().proxy;
    const { router } = useRouter();
    const auth_success = ref(false);
    const isPasswordVisible = ref(false);
    const loadingBtnLogin = ref(false);
    const email = ref("admin@materio.com");
    const password = ref("admin");
    const errorMessages = ref([]);
    const socialLink = [
      {
        icon: mdiFacebook,
        color: "#4267b2",
        colorInDark: "#4267b2",
      },
      {
        icon: mdiTwitter,
        color: "#1da1f2",
        colorInDark: "#1da1f2",
      },
      {
        icon: mdiGithub,
        color: "#272727",
        colorInDark: "#fff",
      },
      {
        icon: mdiGoogle,
        color: "#db4437",
        colorInDark: "#db4437",
      },
    ];

    const handleFormSubmit = () => {
      loadingBtnLogin.value = true;
      const isFormValid = loginForm.value.validate();

      if (!isFormValid) return;

      store
        .dispatch("auth/login", {
          email: email.value,
          password: password.value,
        })
        .then((response) => {
          const dados = response.data.data
          if (dados.status) {
            const token = dados.access_token;
            localStorage.setItem("accessToken", token);
            auth_success.value = true;
            return response;

          } else {
            auth_success.value = false;
            store.dispatch("module/openSnackBar", {
              color: "error",
              timeout: 3000,
              text: "Oops, e-mail e senhas informados não encontrados."
            });
            return response;
          }
          /**/
        })
        .then(() => {
          if (auth_success.value) {
              store.dispatch("auth/dadosUsuario").then((result) => {
                if (result.data.data.user) {
                  const user = result.data.data.user;

                  const { ability: userAbility } = user;

                  // Set user ability
                  // ? https://casl.js.org/v5/en/guide/intro#update-rules
                  vm.$ability.update(userAbility);

                  // Set user's ability in localStorage for Access Control
                  localStorage.setItem(
                    "userAbility",
                    JSON.stringify(userAbility)
                  );

                  // We will store `userAbility` in localStorage separate from userData
                  // Hence, we are just removing it from user object
                  delete user.ability;

                  // Set user's data in localStorage for UI/Other purpose
                  localStorage.setItem("userData", JSON.stringify(user));
                  localStorage.setItem("user", JSON.stringify(user));
                  localStorage.setItem("role", user.role);

                  store.commit("auth/setUser", user);
                  store.commit("auth/setUsuario", user);
                  store.commit("auth/auth_status", "LOGADO");
                  store.commit("auth/setRole", user.role);
                  

                  router.push("/");
                }
              });
          } 
        })
        .catch((error) => {
          // TODO: Next Update - Show notification
          console.error("Oops, Unable to login!");
          console.log("error :>> ", error.response);
          errorMessages.value = error.response.data.error;
        })
        .finally(() => {
          loadingBtnLogin.value = false;
        });
    };

    return {
      handleFormSubmit,

      isPasswordVisible,
      loadingBtnLogin,
      email,
      password,
      errorMessages,
      socialLink,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      validators: {
        required,
        emailValidator,
      },

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,

      // Template Refs
      loginForm,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@core/preset/preset/pages/auth.scss";
</style>
