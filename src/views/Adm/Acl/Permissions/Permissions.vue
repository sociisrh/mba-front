<template>
  <div>
    <!-- app drawer -->
    <v-card>
      <v-card-title> Gestão de permissões </v-card-title>
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
        <!-- Opções -->
        <div class="d-flex align-center flex-wrap">
          <v-btn color="primary" class="mb-4 me-3" @click.stop="insert()">
            <v-icon>{{ icons.mdiPlus }}</v-icon>
            <span>Nova permissão</span>
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
        :items="itemsListTable"
        :server-items-length="totalItemsListTable"
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

    <!-- Modal central -->
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
import storeModule from "./storeModule";
import usePermissionsList from "./usePermissionsList";
import { required } from "@core/utils/validation";

export default {
  name: "Gestao-permissoes",
  setup() {
    const PERMISSIONS_APP_STORE_MODULE_NAME = "app-permissoes";
    // Register module
    if (!store.hasModule(PERMISSIONS_APP_STORE_MODULE_NAME))
      store.registerModule(PERMISSIONS_APP_STORE_MODULE_NAME, storeModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(PERMISSIONS_APP_STORE_MODULE_NAME))
        store.unregisterModule(PERMISSIONS_APP_STORE_MODULE_NAME);
    });
    const indexEdicao = ref(false);
    const itemData = reactive({});
    const valid = ref(false);
    const form = ref(null);
    const item = ref({
      name: ''
    });
    
    const dialogRemove = ref(false)
 
    const isAddItem = ref(false);
    const { 
      itemsListTable,    
      tableColumns,
      searchQuery,
      totalItemsListTable,
      loading,
      options,
      selectedRows,
      fetchItems,
    } = usePermissionsList();
    const formTitle = computed(() => {
      if (indexEdicao === false) return "permissão";
      if (indexEdicao === true) return "permissão";
    });
  


    function insert() {
      this.indexEdicao = false;
      this.isAddItem = !this.isAddItem;
    }
    function edit(item) {
      this.itemData = item;
      this.indexEdicao = !this.indexEdicao;
      this.item = item
      this.isAddItem = !this.isAddItem;
    }
    function remover(item) {
      this.itemData = item;
      this.dialogRemove = true;
    }
    function removerItem()
    {
      store.dispatch("app-permissoes/removerItem", this.itemData.id ).then(() => {
        this.dialogRemove = false;
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
      item.value = [];
      store.commit("app-permissoes/setIndexEdicao", false);
      isAddItem = false;
    }    
    const validate = () => {
      form.value.validate();
    };    
    const onSubmit = () => {
        if (valid.value) { 
          const data = {
              name: item.value.name
            }
          if (!indexEdicao.value) {
            store.dispatch("app-permissoes/addItem", data).then(() => {
              store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 10000,
                text: "Item salvo com sucesso.",
              });
            });
          } else {
            store.dispatch("app-permissoes/editItem",{ id:item.value.id, dados: data}).then(() => {
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
      searchQuery,
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
  
      validators: { required },
  
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