<template>
  <!-- edit profile dialog -->
  <v-dialog
    v-model="dialogInsertUpdateElement"
    :persistent="true"
    :max-width="tamanhoModalCrud !== undefined ? tamanhoModalCrud : '800px'"
  >
    <v-card class="user-edit-info pa-sm-10 pa-3">
      <v-card-title class="justify-center text-h5">{{ title }}</v-card-title>
      <v-card-text class="text-center mt-n2">{{ subtitle }}</v-card-text>

      <v-card-text class="mt-5">
        <slot name="contentModal"></slot>
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
                v-if="callBackModalSalvar !== undefined"
                class="block-xs full-width-xs mr-4"
                large
                depressed
                :loading="loadingButtonSave !== undefined ? loadingButtonSave : null"
                :disabled="loadingButtonSave !== undefined ? loadingButtonSave : null"
                @click="callBackModalSalvar !== undefined ? callBackModalSalvar() : null"
              >
                salvar
              </v-btn>

              <v-btn
                outlined
                color="secondary"
                v-if="callBackModalCancelar !== undefined"
                class="mr-2"
                large
                depressed
                @click="callBackModalCancelar !== undefined ? callBackModalCancelar(): null"
              >
                Fechar
              </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "modal-component",
  props: [
    "hideButtons",
    "searchTextField",
    "buttonAddItemText",
    "title",
    "subtitle",
    "searchLabelText",
    "dialogModal",
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
        console.log(this.dialogModal)
        return this.dialogModal;
      },
      set(event) {
        console.log(event)
        this.$emit("update:dialogModal", event);
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
