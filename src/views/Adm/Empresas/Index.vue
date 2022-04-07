<template>
  <div>
    <!-- app drawer -->
    <v-card>
      <v-card-title> Gestão de empresas </v-card-title>
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
            <span>Nova empresa</span>
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
        <!-- name -->
        <template #[`item.name`]="{item}">
          <div class="d-flex align-center">
            <v-avatar
              :color="item.logo ? '' : 'primary'"
              :class="item.logo ? '' : 'v-avatar-light-bg primary--text'"
              size="32"
            >
              <v-img
                v-if="item.logo"
                :src="item.logo"
              ></v-img>
              <span
                v-else
              >{{ item.name.slice(0,2).toUpperCase() }}</span>
            </v-avatar>

            <div class="d-flex flex-column ms-3">
              <span
               
                class="text--primary font-weight-semibold text-truncate cursor-pointer text-decoration-none"
              >
                {{ item.name }}
              </span>
              <small>@{{ item.slug }}</small>
            </div>
          </div>
        </template>
        <!-- contato -->
        <template #[`item.fone`]="{item}">
          <div class="d-flex align-center">
            <div class="d-flex flex-column ms-3">
              <span
                class="text--primary font-weight-semibold text-truncate cursor-pointer text-decoration-none"
              >
                {{ item.fone }}
              </span>
              <small>{{ item.cell }}</small>
            </div>
          </div>
        </template>
        <!-- status -->
        <template #[`item.status`]="{item}">
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
            <template v-slot:activator="{ on, attrs }" >
              <v-btn icon v-bind="attrs" v-on="on" v-show="item.id != 1">
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list v-show="item.id != 1">
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
                  label="Nome da empresa"
                  hide-details="auto"
                  class=""
                  data-vv-as="Nome"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.slug"
                  :rules="[validators.required]"
                  outlined
                  dense
                  label="Slug de acesso"
                  hide-details="auto"
                  class=""
                  data-vv-as="Slug de acesso"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.name_responsible"
                  :rules="[validators.required]"
                  outlined
                  dense
                  label="Nome do responsavel"
                  hide-details="auto"
                  class=""
                  data-vv-as="Nome do responsavel"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.email"
                  :rules="[validators.required, validators.emailValidator]"
                  outlined
                  dense
                  label="E-mail do responsavel"
                  hide-details="auto"
                  class=""
                  data-vv-as="E-mail do responsavel"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.fone"
                  :rules="[validators.required]"
                  outlined
                  dense
                  label="Telefone de contato"
                  hide-details="auto"
                  class=""
                  data-vv-as="Telefone de contato"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.cell"
                  :rules="[validators.required]"
                  outlined
                  dense
                  label="Celular de contato"
                  hide-details="auto"
                  class=""
                  data-vv-as="Celular de contato"
                ></v-text-field>
              </div>
              <div class="col-12">
                <v-text-field
                  v-model="item.site"
                  :rules="[validators.required, validators.urlValidator]"
                  outlined
                  dense
                  label="Site"
                  hide-details="auto"
                  class=""
                  data-vv-as="Site"
                ></v-text-field>
              </div>   
              <div class="col-12">
                 <v-file-input
                  v-model="item.logo"
                  label="Logotipo"
                  accept=".png, .jpg, .jpeg"
                  outlined
                  dense
                ></v-file-input>
              </div>            
              <div class="col-12">
                <v-textarea
                  v-model="item.description"
                  outlined
                  dense
                  name="input-7-4"
                  label="Sobre da empresa"
                ></v-textarea>
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
import useEmpresasList from "./useEmpresasList";
import { required, urlValidator, emailValidator } from "@core/utils/validation";

export default {
  name: "Gestao-empresas",
  setup() {
    const EMPRESAS_APP_STORE_MODULE_NAME = "app-empresas";
    // Register module
    if (!store.hasModule(EMPRESAS_APP_STORE_MODULE_NAME))
      store.registerModule(EMPRESAS_APP_STORE_MODULE_NAME, storeModule);

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(EMPRESAS_APP_STORE_MODULE_NAME))
        store.unregisterModule(EMPRESAS_APP_STORE_MODULE_NAME);
    });

    const indexEdicao = ref(false);
    const itemData = reactive({});
    const valid = ref(false);
    const form = ref(null);
    const search = ref("");
    const item = ref({
        name: "",
        fone: "",
        cell: "", 
        status: "", 
        logo: [], 
        access_name: "", 
        description: "", 
        email: "", 
        name_responsible: "",        
        site: "", 
        slug: "",
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
      resolveNameStatusVariant
    } = useEmpresasList();
    const formTitle = computed(() => {
      if (indexEdicao.value === false) return "empresa";
      if (indexEdicao.value === true) return "empresa";
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
      store.dispatch("app-empresas/removeItem", this.itemData.id).then(() => {
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
      store.commit("app-empresas/setIndexEdicao", false);
      isAddItem.value = false;
    }
    const validate = () => {
      form.value.validate();
    };
    const onSubmit = () => {
       if (valid.value) {
        (item.value.access_name) ? item.value.access_name = item.value.slug : item.value.access_name
        const formData = new FormData();
        formData.append('id', item.value.id)
        formData.append('uuid', item.value.uuid)
        formData.append('name', item.value.name);
        formData.append('fone', item.value.fone);
        formData.append('cell', item.value.cell);
        formData.append('status', item.value.status);
        formData.append('logo', item.value.logo);
        formData.append('access_name', item.value.access_name);
        formData.append('description', item.value.description);
        formData.append('email', item.value.email);
        formData.append('name_responsible', item.value.name_responsible);
        formData.append('site', item.value.site);
        formData.append('slug', item.value.slug);

        if (!indexEdicao.value) {
          store.dispatch("app-empresas/addItem", formData).then(() => {
            store.dispatch("module/openSnackBar", {
              color: "success",
              timeout: 10000,
              text: "Item salvo com sucesso.",
            });
            fetchItems();
          });          
        } else {
          store
            .dispatch("app-empresas/editItem", {
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

      validators: { required, urlValidator, emailValidator },

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