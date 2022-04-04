
<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
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

        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Login via Github! 👋🏻
          </p>
          <p class="mb-2">Aguarde um momento.</p>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
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
import themeConfig from "@themeConfig";
import store from "@/store";

export default {
  name: "LoginGithub",
  components: {},
  data: () => ({
    payload: "",
    isPasswordVisible: false,
    email: "",
    password: "",
    message: "",
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo,
  }),

  methods: {
    async loginUser() {
      store
        .dispatch("auth/loginUserCallback", { code: this.payload })
        .then((resp) => {
          if (resp.data.data.access_token) {
            const userData = JSON.stringify(localStorage.getItem("user"));
            const userToken = localStorage.getItem("accessToken");
            if (userData !== undefined && userToken !== undefined) {
              store.dispatch("auth/dadosUsuario");
            }
          }
          else if (resp.data.data.codigo = 10) {
            this.$store.dispatch("module/openSnackBar", {
              color: "primary",
              timeout: 10000,
              text: resp.data.data.menssagem,
            });
            setTimeout(() => {
              this.$router.push('/login')
            }, 3000);
          }
        })
        .catch(() => {
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 10000,
            text: "Oops, dados vencidos, você será redirecionado para tela login.",
          });
          setTimeout(() => {
            this.$router.push('/login')
          }, 3000);
        });
    },
  },
  created() {
    this.payload = this.$route.query.code;
    this.loginUser();
  },
};
</script>

<style lang="scss" scoped>
@import "@core/preset/preset/pages/auth.scss";
</style>
