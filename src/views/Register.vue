<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="appLogo"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              {{ appName }}
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            A aventura começa aqui 🚀
          </p>
          <p class="mb-2">
            Torne o gerenciamento do seu empreendimento fácil e divertido!
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-text-field
            v-model="username"
            id="username"
            name="username"
            type="text"
            outlined
            label="Nome e sobrenome"
            placeholder="John Doe"
            hide-details
            class="mb-3"
            :hint="errors.first('username')"
            :error="errors.collect('username').length ? true : false"
            v-validate="{ required: true }"
            data-vv-validate-on="change|blur|input"
            data-vv-as="nome"
            persistent-hint
          ></v-text-field>
             
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
            :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
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

          <v-checkbox
            hide-details
            class="mt-1"
          >
            <template #label>
              <div class="d-flex align-center flex-wrap">
                <span class="me-2">Eu concordo com as </span><a href="javascript:void(0)">política de privacidade e termos</a>
              </div>
            </template>
          </v-checkbox>

          <v-btn
            block
            color="primary"
            type="submit"
            class="mt-6"
            @click="cadastrar()"
          >
            Cadastrar
          </v-btn>
        </v-card-text>

        <!-- create new account  -->
        <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            Já tem uma conta?
          </span>
          <router-link :to="{name:'auth-login-v1'}">
            Faça login
          </router-link>
        </v-card-text>

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">or</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social link -->
        <v-card-actions class="d-flex justify-center">
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            icon
            class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark:link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions>

        <v-snackbar
          v-model="isSnackbarVisible"
          :light="$vuetify.theme.dark"
          right
          top
        >
          {{ message }}
        </v-snackbar>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

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
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline, mdiArrowTopRight } from '@mdi/js'
import store from '@/store'
import themeConfig from '@themeConfig'

export default {
  name: "Register",
  components: {},
  data: () => ({
    socialLink: [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ],
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
    },
    isPasswordVisible: false,
    username: '',
    email: '',
    password: '',
    message: '',
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo
  }),
  computed: {},
  methods: {
    cadastrar()
    {
      this.$validator.validateAll()
      .then((result) => {
        if(result === true)
        {          
          const data = {
            name: username.value,
            email: email.value,
            password: password.value,
            password_confirmation: password.value
          }
          store.dispatch('auth/register', data)
          .then(response => {
            if (response.data.data) {
              this.$store.dispatch('module/openSnackBar', { color: 'success', timeout: 10000, text: 'Cadatro realizado com sucesso!' });
              this.$router.push('/login');
            }
          })
          .catch( erro => {
            this.$store.dispatch('module/openSnackBar', { color: 'error', timeout: 10000, text: 'Oops, dados invalidos.' })
          })
        }
        else {
          this.$store.dispatch('module/openSnackBar', { color: 'error', timeout: 10000, text: 'Oops, falta informações no formulário.' })
        }
      })
    }
  }  
}
</script>

<style lang="scss">
  @import '@core/preset/preset/pages/auth.scss';
</style>
