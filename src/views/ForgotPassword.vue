<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
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

        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
           Esqueceu a senha? 🔒
          </p>
          <p class="mb-2">
            Digite seu e-mail e enviaremos instruções para redefinir sua senha
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
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

            <v-btn
              block
              color="primary"
              @click="recuperSenha()"
            >
              Enviar link de redefinição
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="d-flex justify-center align-center">
          <router-link
            :to="{name:'auth-login-v1'}"
            class="d-flex align-center text-sm"
          >
            <v-icon
              size="24"
              color="primary"
            >
              {{ icons.mdiChevronLeft }}
            </v-icon>
            <span>Volte ao login</span>
          </router-link>
        </v-card-actions>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="190"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
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

import { mdiChevronLeft, mdiEyeOffOutline } from '@mdi/js'
import store from '@/store'
import themeConfig from '@themeConfig'

export default {
  name: "ForgotPassword",
  components: {},
  data: () => ({
    icons: {
   
      mdiEyeOffOutline,
      mdiChevronLeft  
    },
    email: '',
    message: '',
    isSnackbarVisible: false,
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo
  }),
  computed: {},
  methods: {
    recuperSenha()
    {
      this.$validator.validateAll()
      .then((result) => {
        if(result === true)
        {
          const data = {
            'email': email.value
          }
          store.dispatch('auth/recuperarSenha', data)
          .then(response => {
            console.log(response)
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
