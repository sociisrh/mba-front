<template>
  <div>
    <!-- app drawer -->
    <v-card>
      <v-card-title> Gestão de usuários </v-card-title>
      <v-divider class="mt-4"></v-divider>

      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="search"
          placeholder="Pesquisar"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-spacer></v-spacer>
        <!-- Opções -->
        <div class="d-flex align-center flex-wrap">
          <v-btn color="primary" class="mb-4 me-3" @click.stop="insert()">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Novo usuario</span>
          </v-btn>

          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="secondary"
                outlined
                v-bind="attrs"
                v-on="on"
                class="mb-4"
              >
                <v-icon size="17" class="me-1">
                  {{ icons.mdiExportVariant }}
                </v-icon>
                <span>Exportar</span>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiFilePdfBox }}
                  </v-icon>
                  <span>PDF</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiFileExcel }}
                  </v-icon>
                  <span>Excel</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-card-text>

      <!-- table -->
      <v-data-table
        :headers="tableColumns"
        :items="itemsListTable"
        :loading="loading"
        :search="search"
        show-select
      >
        <!-- Role -->
        <template #[`item.role`]="{ item }">
          <div class="d-flex align-center">
            <v-avatar
              size="30"
              :color="resolveUserRoleVariant(item.role)"
              :class="`v-avatar-light-bg ${resolveUserRoleVariant(
                item.role
              )}--text me-3`"
            >
              <v-icon size="18" :color="resolveUserRoleVariant(item.role)">
                {{ resolveUserRoleIcon(item.role) }}
              </v-icon>
            </v-avatar>
            <span class="text-capitalize">{{
              item.role === false ? "Sem papel" : item.role
            }}</span>
          </div>
        </template>
        <!-- status -->
        <template #[`item.status`]="{ item }">
          <v-chip
            small
            :color="resolveStatusVariant(item.status)"
            :class="`${resolveStatusVariant(item.status)}--text`"
            class="v-chip-light-bg font-weight-semibold text-capitalize"
          >
            {{ resolveNameStatusVariant(item.status) }}
          </v-chip>
        </template>
        <!-- created_at -->
        <template #[`item.created_at`]="{ item }">
          <span>{{ item.created_at | dateTimeFormatBr() }}</span>
        </template>
        <!-- updated_at -->
        <template #[`item.updated_at`]="{ item }">
          <span>{{ item.created_at | dateTimeFormatBr() }}</span>
        </template>
        <!-- actions -->
        <template #[`item.actions`]="{ item }">
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <!-- <v-list-item @click="show(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiEyeOutline }}
                  </v-icon>
                  <span>visualizar</span>
                </v-list-item-title>
              </v-list-item> -->

              <v-list-item @click.stop="edit(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiPencilOutline }}
                  </v-icon>
                  <span>Editar</span>
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click.stop="resetPassword(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiPencilOutline }}
                  </v-icon>
                  <span>Reiniciar senha</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click="remover(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiDeleteOutline }}
                  </v-icon>
                  <span>Delete</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal lateral -->
    <v-navigation-drawer
      :value="isAddItem"
      temporary
      touchless
      :right="!$vuetify.rtl"
      :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
      app
    >
      <v-card height="100%">
        <div class="drawer-header d-flex align-center mb-4">
          <span class="font-weight-semibold text-base text--primary"
            >{{
              !indexEdicao ? `Cadastrar ${formTitle}` : `Editar ${formTitle}`
            }}
          </span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="closeModal()">
            <v-icon size="22">
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
        </div>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
          <v-card-text>
            <div class="row">
              <div class="col-12">
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
              </div>
              <div class="col-12">
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
              </div>
              <div class="col-12">
                <v-select
                  v-model="item.role"
                  :items="roles"
                  :rules="[resolvedRequired]"
                  item-text="name"
                  item-value="id"
                  label="Papel"
                  outlined
                  hide-details="auto"
                  dense
                  id="id"
                  name="name"
                >
                </v-select>
              </div>
              <div class="col-12">
                <v-autocomplete
                  v-model="item.id_empresa"
                  :items="empresas"
                  :rules="[resolvedRequired]"
                  item-text="name"
                  item-value="id"
                  label="Empresas"
                  outlined
                  hide-details="auto"
                  dense
                  id="id"
                  name="name"
                >
                </v-autocomplete>
              </div>
              <div class="col-12">
                <v-autocomplete
                  v-model="item.empreendimentos"
                  :items="empreendimentos"
                  item-text="name"
                  item-value="id"
                  label="Empreendimentos"
                  outlined
                  hide-details="auto"
                  dense
                  id="id"
                  name="name"
                  multiple
                >
                </v-autocomplete>
              </div>
              <div class="col-12">
                <v-file-input
                  v-model="item.avatar"
                  label="Foto"
                  accept=".png, .jpg, .jpeg"
                  outlined
                  dense
                ></v-file-input>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" class="me-3" type="submit">
              Adicionar
            </v-btn>
            <v-btn
              color="secondary"
              outlined
              type="reset"
              @click="closeModal()"
            >
              Fechar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-navigation-drawer>
    <!-- Modal central -->
    <v-row justify="center">
      <v-dialog v-model="dialogRemove" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Deseja realmente remover este item ?
          </v-card-title>
          <v-card-text
            >Todas informações serão removidas da base de dados.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" @click="closeModalRemover()">
              Fechar
            </v-btn>
            <v-btn color="error" @click="removerItem()"> Apagar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import store from "@/store";
import {
  mdiSquareEditOutline,
  mdiDotsVertical,
  mdiPlus,
  mdiFileDocumentOutline,
  mdiDeleteOutline,
  mdiExportVariant,
  mdiAccountOutline,
  mdiPencilOutline,
  mdiEyeOutline,
  mdiFilePdfBox,
  mdiFileExcel,
  mdiClose,
  mdiCloseBoxOutline,
  mdiMinusBoxOutline,
  mdiCheckboxBlankOutline,
  mdiFoodAppleOutline,
} from "@mdi/js";
import {
  onUnmounted,
  ref,
  reactive,
  computed,
  nextTick,
  watch,
  onUpdated,
} from "@vue/composition-api";
import storeModule from "./storeModule";
import useUsuariosList from "./useUsuariosList";
import { required, emailValidator } from "@core/utils/validation";

export default {
  name: "Gestao-usuarios",
  setup() {
    const USUARIOS_APP_STORE_MODULE_NAME = "app-usuarios";
    // Register module
    if (!store.hasModule(USUARIOS_APP_STORE_MODULE_NAME))
      store.registerModule(USUARIOS_APP_STORE_MODULE_NAME, storeModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USUARIOS_APP_STORE_MODULE_NAME))
        store.unregisterModule(USUARIOS_APP_STORE_MODULE_NAME);
    });
    const roles = computed(() => store.getters["app-usuarios/getRolesList"]);
    const empreendimentos = computed(
      () => store.getters["app-usuarios/getEmpreendimentosList"]
    );
    const empresas = computed(
      () => store.getters["app-usuarios/getEmpresasList"]
    );

    const indexEdicao = ref(false);
    const itemData = reactive({});
    const valid = ref(false);
    const form = ref(null);
    const search = ref("");
    const item = ref({
      name: "",
      email: "",
      avatar: [],
      id_empresa: "",
      empreendimentos: [],
      role: "",
    });

    const dialogRemove = ref(false);

    const isAddItem = ref(false);
    const {
      itemsListTable,
      tableColumns,
      totalItemsListTable,
      loading,
      options,
      selectedRows,
      fetchItems,
      resolveStatusVariant,
      resolveNameStatusVariant,
      resolveUserRoleVariant,
      resolvedRequired,
      resolveUserRoleIcon,
    } = useUsuariosList();
    const formTitle = computed(() => {
      if (indexEdicao.value === false) return "usuario";
      if (indexEdicao.value === true) return "usuario";
    });

    function insert() {
      this.indexEdicao = false;
      this.isAddItem = !this.isAddItem;
    }
    function edit(item) {
      this.itemData = item;
      this.indexEdicao = !this.indexEdicao;
      this.item = item;
      this.isAddItem = !this.isAddItem;
    }
    function remover(item) {
      this.itemData = item;
      this.dialogRemove = true;
    }
    function removerItem() {
      store.dispatch("app-usuarios/removeItem", this.itemData.id).then(() => {
        this.dialogRemove = false;
        fetchItems();
        store.dispatch("module/openSnackBar", {
          color: "success",
          timeout: 10000,
          text: "Item removido com sucesso.",
        });
      });
    }
    function closeModalRemover() {
      this.itemData = [];
      this.dialogRemove = false;
    }
    function closeModal() {
      item.value = [];
      store.commit("app-usuarios/setIndexEdicao", false);
      isAddItem.value = false;
    }
    function resetPassword(item) {}
    const validate = () => {
      form.value.validate();
    };
    const onSubmit = () => {
      if (valid.value) {
        const formData = new FormData();

        formData.append('name', item.value.name);
        formData.append('email', item.value.email);
        formData.append('status', item.value.status);
        formData.append('avatar', item.value.avatar);
        formData.append('id_empresa', item.value.id_empresa);
        formData.append('empreendimentos', item.value.empreendimentos);
        formData.append('role', item.value.role);

        if (!indexEdicao.value) {
          store.dispatch("app-usuarios/addItem", formData).then(() => {
            store.dispatch("module/openSnackBar", {
              color: "success",
              timeout: 10000,
              text: "Item salvo com sucesso.",
            });
            fetchItems();
          });
        } else {
          store
            .dispatch("app-usuarios/editItem", {
              id: item.value.id,
              dados: item.value,
            })
            .then(() => {
              store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 10000,
                text: "Item atualizado com sucesso.",
              });
            });
        }
        closeModal();
      } else {
        validate();
      }
    };
    return {
      itemsListTable,
      tableColumns,
      roles,
      empresas,
      empreendimentos,
      search,
      totalItemsListTable,
      loading,
      options,
      isAddItem,
      selectedRows,
      formTitle,
      itemData,
      indexEdicao,
      fetchItems,
      edit,
      insert,
      remover,
      removerItem,
      resetPassword,
      closeModalRemover,
      closeModal,
      valid,
      validate,
      form,
      onSubmit,
      dialogRemove,
      item,
      valid,
      validate,
      indexEdicao,
      resolveStatusVariant,
      resolveNameStatusVariant,
      resolvedRequired,
      resolveUserRoleVariant,
      resolveUserRoleIcon,

      validators: { required, emailValidator },

      icons: {
        mdiSquareEditOutline,
        mdiFileDocumentOutline,
        mdiDotsVertical,
        mdiDeleteOutline,
        mdiPlus,
        mdiExportVariant,
        mdiAccountOutline,
        mdiPencilOutline,
        mdiEyeOutline,
        mdiFilePdfBox,
        mdiFileExcel,
        mdiClose,
        mdiCloseBoxOutline,
        mdiMinusBoxOutline,
        mdiCheckboxBlankOutline,
        mdiFoodAppleOutline,
      },
    };
  },
};
</script>

<style>
</style>