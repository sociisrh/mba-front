<template>
  <div> 
    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar
            size="40px"
            v-bind="attrs"
            color="primary"
            class="v-avatar-light-bg primary--text"
            v-on="on"
          >
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
      </template>
      <v-list>
        <div class="pb-3 pt-2">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="12"
            offset-y="12"
            class="ms-4"
            dot
          >
            <v-avatar
              size="40px"
              color="primary"
              class="v-avatar-light-bg primary--text"
            >
              <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
            </v-avatar>
          </v-badge>
          <div
            class="d-inline-flex flex-column justify-center ms-3"
            style="vertical-align: middle"
          >
            <span class="text--primary font-weight-semibold mb-n1">
              {{ userData.name }}
            </span>
            <small class="text--disabled text-capitalize">{{
              userData.role
            }}</small>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Profile -->
        <v-list-item @click="profile()">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiAccountOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Chat -->
        <!--<v-list-item href="#">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiChatOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-badge
              inline
              color="error"
              content="2"
            >
            </v-badge>
          </v-list-item-action>
        </v-list-item> -->

        <v-divider class="my-2"></v-divider>

        <!-- Settings -->
        <!-- <v-list-item href="#">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiCogOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- Pricing -->
        <!--<v-list-item href="#">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiCurrencyUsd }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pricing</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

        <!-- FAQ -->
        <!-- <v-list-item href="#">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiHelpCircleOutline }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item> 
        <v-divider class="my-2"></v-divider>
        
        -->

        <!-- Logout -->
        <v-list-item @click="logoutUser">
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiLogoutVariant }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="dialogModal"
      :persistent="true"
      max-width="800px"
    >
      <v-card class="user-edit-info pa-sm-10 pa-3">
        <v-card-title class="justify-center flex-column">
          <v-avatar
            :color="userData.avatar ? '' : 'primary'"
            :class="userData.avatar ? '' : 'v-avatar-light-bg primary--text'"
            size="120"
            rounded
            class="mb-4"
          >
            <v-img
              v-if="userData.avatar"
              :src="userData.avatar"
            ></v-img>
            <span
              v-else
              class="font-weight-semibold text-5xl"
            >{{ avatarText(userData.name) }}</span>
          </v-avatar>

          <span class="mb-2">{{ userData.name }}</span>

          <v-chip
            label
            small
            :color="resolveUserRoleVariant(userData.role)"
            :class="`v-chip-light-bg text-sm font-weight-semibold ${resolveUserRoleVariant(userData.role)}--text text-capitalize`"
          >
            {{ userData.role }}
          </v-chip>
        </v-card-title>

        <v-card-text>
          <h2 class="text-xl font-weight-semibold mb-2">
            Detalhes
          </h2>

          <v-divider></v-divider>

          <v-list>
            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">Nome:</span>
              <span class="text--secondary">{{ userData.name }}</span>
            </v-list-item>

            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium text-no-wrap me-2">E-mail:</span>
              <span class="text--secondary">{{ userData.email }}</span>
            </v-list-item>

            <v-list-item
              dense
              class="px-0 mb-n2"
            >
              <span class="font-weight-medium me-2">Status:</span>
              <span class="text--secondary">
                <v-chip
                  small
                  label
                  :color="resolveUserStatusVariant(userData.status)"
                  :class="`v-chip-light-bg ${resolveUserStatusVariant(userData.status)}--text font-weight-medium text-capitalize`"
                >
                  {{ (userData.status == "A") ? "ATIVO" : "INATIVO" }}
                </v-chip>
              </span>
            </v-list-item>




          </v-list>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions class="pt-0 p-0 mt-2 column-reverse-xs justify-end">
          <v-row>
            <v-col
                cols="12"
                class="d-flex justify-center mt-3"
              >
                <v-btn
                  color="primary"
                  class="block-xs full-width-xs mr-4"
                  large
                  depressed
                  @click="abrirModalEdicao()"
                >
                  editar
                </v-btn>

                <v-btn
                  outlined
                  color="secondary"
                  class="mr-2"
                  large
                  depressed
                  @click="fechar()"
                >
                  Fechar
                </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogModalEdicao"
      :persistent="true"
      max-width="800px"
    >
      <v-card class="user-edit-info pa-sm-10 pa-3">
        <v-card-title class="justify-center flex-column">Editar
        </v-card-title>        
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="salvarModalEdicao()" >
              <v-row>
                <v-col cols="12">
                    <v-text-field
                      v-model="item.name"
                      :rules="[validators.required]"
                      outlined
                      dense
                      label="Nome"
                      hide-details="auto"
                      class=""
                      data-vv-as="Nome"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                      v-model="item.email"
                      :rules="[validators.required, validators.emailValidator]"
                      outlined
                      type="email"
                      dense
                      label="E-mail"
                      hide-details="auto"
                      class=""
                      data-vv-as="E-mail"
                    ></v-text-field>              
                </v-col>
                <v-col cols="12">
                    <v-text-field
                      v-model="item.password"
                      outlined
                      type="password"
                      dense
                      label="Senha"
                      hide-details="auto"
                      class=""
                      data-vv-as="Senha"
                    ></v-text-field>              
                </v-col>            
                <v-col cols="12">
                    <v-file-input
                      v-model="item.avatar"
                      label="Foto"
                      accept=".png, .jpg, .jpeg"
                      outlined
                      dense
                    ></v-file-input>              
                </v-col>
              </v-row>
              <v-row>
                <v-divider></v-divider>
                <v-col
                    cols="12"
                    class="d-flex justify-center mt-3"
                  >
                    <v-btn
                      color="primary"
                      class="block-xs full-width-xs mr-4"
                      large
                      depressed
                      type="submit"
                    >
                      salvar
                    </v-btn>

                    <v-btn
                      outlined
                      color="secondary"
                      class="mr-2"
                      large
                      depressed
                      @click="fecharModalEdicao()"
                    >
                      Fechar
                    </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>         
      </v-card>
    </v-dialog>
  </div> 
</template>

<script>
import {
  mdiAccountOutline,
  mdiEmailOutline,
  mdiCheckboxMarkedOutline,
  mdiChatOutline,
  mdiCogOutline,
  mdiCurrencyUsd,
  mdiHelpCircleOutline,
  mdiLogoutVariant,
} from "@mdi/js";
import store from "@/store";
import themeConfig from "@themeConfig";
import { required, emailValidator } from "@core/utils/validation";
export default {
  name: "Login",
  data: () => ({
    loadingSalvar: false,
    dialogModal: false,
    dialogModalEdicao: false,
    validators: { required, emailValidator },
    valid: "",
    item: [],
    icons: {
      mdiAccountOutline,
      mdiEmailOutline,
      mdiCheckboxMarkedOutline,
      mdiChatOutline,
      mdiCogOutline,
      mdiCurrencyUsd,
      mdiHelpCircleOutline,
      mdiLogoutVariant,
    },
    userData: {},
    // themeConfig
    appName: themeConfig.app.name,
    appLogo: themeConfig.app.logo,
  }),
  created() {},
  mounted() {
    this.userData = JSON.parse(localStorage.getItem('userData'));
  },
  methods: {
    logoutUser() {
      // Remove userData from localStorage
      // ? We just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem("accessToken");

      // Remove userData & Ability from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("userAbility");

      store.commit("auth/setUser", []);
      store.commit("auth/setToken", false);

      // Reset ability
      //vm.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push("/login");
    },
    profile() {      
      this.dialogModal = true;
    },
    abrirModalEdicao() {
      this.item = this.userData;
      this.dialogModalEdicao = !this.dialogModalEdicao;
    },
    fecharModalEdicao()
    {
      this.dialogModalEdicao = false;
    },
    salvarModalEdicao() {
      if (this.valid) {
        let formData = new FormData();

        formData.append('name', this.item.name);
        formData.append('email', this.item.email);
        formData.append('avatar', this.item.avatar); 
        formData.append('password', this.item.password); 
        
        store
        .dispatch("users/editItem", {
          id: this.item.id,
          dados: formData
        })
        .then(() => {
          store.dispatch("module/openSnackBar", {
            color: "success",
            timeout: 10000,
            text: "Item atualizado com sucesso.",
          });
        });     
      }
    },
    avatarText(value) {
      if (!value) return ''
      const nameArray = value.split(' ')
      return nameArray.map(word => word.charAt(0).toUpperCase()).join('')
    },
    resolveUserStatusVariant(status) {
      if (status === 'p') return 'warning'
      if (status === 'a') return 'success'
      if (status === 'i') return 'secondary'

      return 'primary'
    },
    resolveUserRoleVariant(role) {
      if (role === 'subscriber') return 'primary'
      if (role === 'author') return 'warning'
      if (role === 'maintainer') return 'success'
      if (role === 'editor') return 'info'
      if (role === 'Administrador') return 'error'

      return 'primary'
    },
    kFormatter() {},
    salvar() {},
    fechar() {
      this.dialogModal = false;
    },
    resetFields() {},
  },
};
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
