<template>
  <div id="user-list">
    <v-card>
      <v-card-title v-if="title">
        <span v-html="title"></span>
        <span v-html="subtitle"></span>
      </v-card-title>

      <v-divider class="mt-4"></v-divider>
      <!-- actions -->
      <v-card-text class="d-flex align-center flex-wrap pb-0">
        <!-- search -->
        <v-text-field 
          v-if="hideSearch !== undefined
            ? !hideSearch
            : searchTextField !== undefined
            ? true
            : false"
          v-model="search"
          placeholder="Search"
          outlined
          hide-details
          dense
          class="user-search me-3 mb-4"
          append-icon="mdi-text-search"
          :label="searchLabelText"          
          single-line
        >
        </v-text-field>
        <slot name="advancedSearch"></slot>
        <v-spacer></v-spacer>
        <div class="d-flex align-center flex-wrap">
          <v-dialog
              v-model="dialogInsertUpdateElement"
              :persistent="true"
              :scrollable="scrollable !== undefined ? scrollable : true"
              :max-width="tamanhoModalCrud !== undefined ? tamanhoModalCrud : '800px'"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
                  class="mb-4 me-3"
                  v-if="showButtonAddItem !== undefined
                    ? showButtonAddItem
                    : callBackModalInsert !== undefined ||
                      buttonAddItemText !== undefined
                    ? true
                    : false"          
                  large          
                  @click="callBackModalInsert !== undefined ? callBackModalInsert() : null">
                  <v-icon
                    size="17"
                    class="me-1"
                  >
                    mdi-plus
                  </v-icon>
                  <span>{{ buttonAddItemText != "" ? buttonAddItemText : "Novo Registro" }}</span>            
                </v-btn>
              </template>
              <v-card :loading="showLoadingModal" :disabled="showLoadingModal" style="background-color: white !important;">
                <v-card-title style="padding: 0 12px !important">
                  <slot name="prependTitleModal"></slot>
                  <div class="full-width pa-4 pl-5">
                    <span class="">{{ formTitle }}</span>
                  </div>
                  <slot name="appendTitleModal"></slot>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text
                  :style="'height: ' + modalCrudheight ? modalCrudheight : 500 + 'px;'"
                  class="scrollbar"
                >
                  <slot name="contentModalCrud"> </slot>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="pt-0 p-0 mt-2 column-reverse-xs justify-end">
                  <slot name="footerModalCrud"></slot>
                  <v-btn
                    v-if="callBackModalCancelar !== undefined"
                    class="mr-2"
                    color="secondary"
                    outlined
                    large
                    depressed
                    @click="callBackModalCancelar !== undefined ? callBackModalCancelar(): null">
                    Fechar
                  </v-btn>
                  <v-spacer vertical class="mt-2 mb-2 d-block d-md-none"></v-spacer>
                  <v-btn
                    color="primary"
                    v-if="callBackModalSalvar !== undefined"
                    class="block-xs full-width-xs"
                    large
                    depressed
                    :loading="loadingButtonSave !== undefined ? loadingButtonSave : null"
                    :disabled="loadingButtonSave !== undefined ? loadingButtonSave : null"
                    @click="callBackModalSalvar !== undefined ? callBackModalSalvar() : null">
                      Salvar
                    </v-btn>
                </v-card-actions>
              </v-card>
          </v-dialog>
          
          <v-btn
            color="secondary"
            outlined
            class="mb-4"
            large
          >
            <v-icon
              size="17"
              class="me-1"
            >
              mdi-export-variant
            </v-icon>
            <span>Exportar</span>
          </v-btn>
        </div>
      </v-card-text>
      <div class="mt-1">
        <slot name="data-content"></slot>
      </div>
      <div class="mt-4">
        <!-- hidden-sm-and-down -->
        <slot name="data-table"></slot>
      </div>
      <div class="hidden-md-and-up">
        <slot name="data-list"></slot>
        <v-spacer></v-spacer>
      </div>
    </v-card>
    <div>
      <v-dialog
        v-model="dialogDeleteElement"
        :persistent="true"
        max-width="300"
      >
        <div class="pa-2">
          <v-card>
            <v-card-title class="headline">
              <slot name="modalDelete/titleModal"></slot>
            </v-card-title>
            <v-card-text>
              <slot name="modalDelete/contentModal"></slot>
            </v-card-text>
            <v-card-actions class="justify-center">
              <slot name="modalDelete/actionsModal"></slot>
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "crud",
  props: [
    "hideButtons",
    "searchTextField",
    "buttonAddItemText",
    "title",
    "subtitle",
    "searchLabelText",
    "dialog",
    "dialogDelete",
    "formTitle",
    "callBackModalInsert",
    "callBackModalCancelar",
    "callBackModalSalvar",
    "hideDialogInsert",
    "showButtonAddItem",
    "hideSearch",
    "tamanhoModalCrud",
    "scrollable",
    "modalCrudheight",
    "loadingButtonSave",
    "advancedButtonSearch",
    "advancedButtonSearchText",
    "advancedButtonSearchIcon",
    "advancedButtonSearchLoading",
    "additionalButton",
    "additionalButtonText",
    "additionalButtonIcon",
    "additionalButtonLoading",
    "additionalButtonDisabled",
    "showDialogTermos",
    "showLoadingModal"
  ],
  data() {
    return {}
  },
  computed: {
    search: {
      get() {
        return this.searchTextField;
      },
      set(event) {
        this.$emit("update:searchTextField", event);
      },
    },
    dialogInsertUpdateElement: {
      get() {
        return this.dialog;
      },
      set(event) {
        this.$emit("update:dialog", event);
      },
    },
    dialogDeleteElement: {
      get() {
        return this.dialogDelete;
      },
      set(event) {
        this.$emit("update:dialogDelete", event);
      },
    },
  },
  created() {},
  methods: {},
};
</script>
 
<style lang="scss">
  @import '@core/preset/preset/apps/user.scss';
</style>

