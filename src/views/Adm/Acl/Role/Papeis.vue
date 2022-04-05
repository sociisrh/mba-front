<template>
  <div>
    <!-- app drawer -->
    <v-card>
      <v-card-title> Gestão de papeis </v-card-title>
      <v-divider class="mt-4"></v-divider>

      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field
          v-model="searchQuery"
          placeholder="Pesquisar"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
        >
        </v-text-field>

        <v-spacer></v-spacer>

        <div class="d-flex align-center flex-wrap">
          <v-btn color="primary" class="mb-4 me-3" @click.stop="insert()">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Novo papel</span>
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
        v-model="selectedRows"
        :headers="tableColumns"
        :items="rolesListTable"
        :server-items-length="totalRoleListTable"
        :loading="loading"
        show-select
      >
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
              <v-list-item @click="show(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiEyeOutline }}
                  </v-icon>
                  <span>visualizar</span>
                </v-list-item-title>
              </v-list-item>

              <v-list-item @click.stop="edit(item)">
                <v-list-item-title>
                  <v-icon size="20" class="me-2">
                    {{ icons.mdiPencilOutline }}
                  </v-icon>
                  <span>Editar</span>
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
    <v-navigation-drawer
      :value="isAddPapel"
      temporary
      touchless
      :right="!$vuetify.rtl"
      :width="$vuetify.breakpoint.smAndUp ? 350 : '100%'"
      app

    >
      <v-card height="100%">
        <div class="drawer-header d-flex align-center mb-4">
          <span class="font-weight-semibold text-base text--primary"
            >{{ !indexEdicao ? `Cadastrar ${formTitle}` : `Editar ${formTitle}` }}
          </span>
          <v-spacer></v-spacer>
          <v-btn icon small @click="closeModal()">
            <v-icon size="22">
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
        </div>

        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
            <div class="row">
              <div class="col-12">
                <v-text-field
                  v-model="role.name"
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
                <v-autocomplete
                  v-model="selectedPermission"
                  :rules="[validators.required]"
                  :items="permissions"
                  item-text="name"
                  item-value="name"
                  label="Permissões"
                  outlined
                  hide-details="auto"
                  class=""
                  data-vv-as="Permissões"
                  multiple
                  chips
                  small-chips
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span>{{ item.name }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption"
                      >(+{{
                        selectedPermission && selectedPermission.length - 1
                      }}
                      outros)</span
                    >
                  </template>
                  <template #prepend-item>
                    <v-list-item ripple @click="toggle">
                      <v-list-item-action>
                        <v-icon
                          :color="
                            selectedPermission.length > 0 ? 'primary' : ''"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                          Selecionar todos
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                  </template>
                </v-autocomplete>
              </div>
              <div class="col-6">
                <v-btn color="primary" class="me-3" type="submit">
                  Adicionar
                </v-btn>
              </div>
              <div class="col-6">
                <v-btn
                  color="secondary"
                  outlined
                  type="reset"
                  @click="closeModal()"
                >
                  Fechar
                </v-btn>
              </div>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-row justify="center">
    <v-dialog
      v-model="dialogRemove"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Deseja realmente remover este item ?
        </v-card-title>
        <v-card-text>Todas informações serão removidas da base de dados.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary"            
            @click="closeModalRemover()"
          >
            Fechar
          </v-btn>
          <v-btn
            color="error"
            @click="removerItem()"
          >
            Apagar
          </v-btn>
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
  mdiClose, mdiCloseBoxOutline, mdiMinusBoxOutline, mdiCheckboxBlankOutline, mdiFoodAppleOutline 
} from "@mdi/js";
import { onUnmounted, ref, reactive, computed, nextTick, watch, onUpdated } from "@vue/composition-api";
import roleStoreModule from "./roleStoreModule";
import useRolesList from "./useRolesList";
import { required } from "@core/utils/validation";

export default {
  name: "Gestao-papeis",
  components: {
    
  },
  setup() {
    const ROLE_APP_STORE_MODULE_NAME = "app-roles";
    // Register module
    if (!store.hasModule(ROLE_APP_STORE_MODULE_NAME))
      store.registerModule(ROLE_APP_STORE_MODULE_NAME, roleStoreModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(ROLE_APP_STORE_MODULE_NAME))
        store.unregisterModule(ROLE_APP_STORE_MODULE_NAME);
    });
    const indexEdicao = ref(false);
    const itemData = reactive({});
    const valid = ref(false);
    const form = ref(null);
    const role = ref({
      name: ''
    });
    
    const dialogRemove = ref(false)
    const selectedPermission = ref([]);
    const isAddPapel = ref(false);
    const {
      rolesListTable,
      tableColumns,
      searchQuery,
      totalRoleListTable,
      loading,
      options,
      roleTotalLocal,
      selectedRows,
      fetchRoles,
    } = useRolesList();

    const formTitle = computed(() => {
      if (indexEdicao.value === false) return "papel";
      if (indexEdicao.value === true) return "papel";
    });
    const permissions = computed(() => store.getters["app-roles/getPermissionsList"]);
    const likesAllRole = computed(() => selectedPermission.value.length === permissions.value.length)
    const likesSomeRole = computed(() => selectedPermission.value.length > 0 && !likesAllRole.value)
    const icon = computed(() => {
      if (likesAllRole.value) return mdiCloseBoxOutline
      if (likesSomeRole.value) return mdiMinusBoxOutline
      return mdiCheckboxBlankOutline
    });    

    function insert() {
      this.indexEdicao = false;
      this.isAddPapel = !this.isAddPapel;
    }
    function edit(item) {
      this.itemData = item;
      this.indexEdicao = !this.indexEdicao;
      selectedPermission.value = item.permissoes;
      role.value = item
      this.isAddPapel = !this.isAddPapel;
    }
    function remover(item) {
      this.itemData = item;
      this.dialogRemove = true;
    }
    function removerItem()
    {
      store.dispatch("app-roles/removeRole", this.itemData.id ).then(() => {
        this.dialogRemove = false;
        fetchRoles()  
        store.dispatch("module/openSnackBar", {
          color: "success",
          timeout: 10000,
          text: "Papel removido com sucesso."
        });
      });
    }
    function closeModalRemover()
    {
      this.itemData = [];
      this.dialogRemove = false;
    }
    function closeModal() {
      role.value = [];
      selectedPermission.value = [];      
      store.commit("app-roles/setIndexEdicao", false);
      isAddPapel.value = false;
      indexEdicao.value = false;
    }    

    const validate = () => {
      form.value.validate();
    };
    
    const toggle = () => {
      nextTick(() => { 
        if(likesAllRole.value === true) 
        {
            selectedPermission.value = []
        } else {
            selectedPermission.value = permissions.value.map(t => t.name);
        }
      })
    }

    const onSubmit = () => {
        if (valid.value) { 
          const data = {
              name: role.value.name,
              permissions: selectedPermission.value
            }

          if (!indexEdicao.value) {
            store.dispatch("app-roles/addRole", data).then(() => {
              store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 10000,
                text: "Papel salvo com sucesso.",
              });
            });
          } else {
            store.dispatch("app-roles/editRole",{ id:role.value.id, dados: data}).then(() => {
              store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 10000,
                text: "Papel atualizado com sucesso com sucesso.",
              });
            });
          }  
          fetchRoles()        
          closeModal();
        } else {
          validate();
        }
    };

    return {
      rolesListTable,
      tableColumns,
      searchQuery,
      totalRoleListTable,
      roleTotalLocal,
      loading,
      options,
      isAddPapel,
      selectedRows,
      formTitle,
      itemData,
      indexEdicao,
      fetchRoles,
      edit,
      insert,
      remover,
      removerItem,
      closeModalRemover,
      closeModal,
      valid,
      validate,
      form,
      onSubmit,
      dialogRemove,
      role,
      valid,
      validate,
      indexEdicao,
      selectedPermission,
      permissions,
      likesAllRole,
      likesSomeRole,
      toggle,
      validators: { required },
      icon, 
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
        mdiFoodAppleOutline
      },
    };
  },
};
</script>

<style>
</style>