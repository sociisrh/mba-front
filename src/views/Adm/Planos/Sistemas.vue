<template>
  <v-dialog v-model="show" persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">Gestão de sistemas</span>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="listaItens"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Novo sistema
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.nome"
                          label="Nome do sistema"
                          :hint="errors.first('nome')"
                          :error="errors.collect('nome').length ? true : false"
                          v-validate="'required'"
                          data-vv-scope="sistema"
                          data-vv-validate-on="change"
                          data-vv-as="nome"
                          dense
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.descricao"
                          label="Descrição do sistema"
                          :hint="errors.first('descricao')"
                          :error="
                            errors.collect('descricao').length ? true : false
                          "
                          v-validate="'required'"
                          data-vv-scope="sistema"
                          data-vv-validate-on="change"
                          data-vv-as="descricao"
                          dense
                          persistent-hint
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-select
                          :items="itemsStatus"
                          v-model="editedItem.status"
                          :hint="errors.first('status')"
                          :error="
                            errors.collect('status').length ? true : false
                          "
                          v-validate="'required'"
                          data-vv-scope="sistema"
                          data-vv-validate-on="change"
                          data-vv-as="status"
                          dense
                          persistent-hint
                          label="Status"
                        ></v-select>
                      </v-col>
                      <div class="col-12" sm="12" md="12">
                        <v-select
                          :items="listaEmpresas"
                          dense
                          item-text="name"
                          item-value="id"
                          label="Empresa responsavel"
                          hide-details="auto"
                          data-vv-as="Empresa responsavel"
                          persistent-hint
                          v-model="editedItem.id_empresa"
                          :hint="errors.first('id_empresa')"
                          :error="
                            errors.collect('id_empresa').length ? true : false
                          "
                          v-validate="'required'"
                          data-vv-scope="sistema"
                          data-vv-validate-on="change"
                          trim
                        ></v-select>
                      </div>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Fechar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :loading="loadingSalvar"
                  >
                    salvar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Tem certeza de que deseja excluir este item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Fechar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Excluir</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reiniciar </v-btn>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="default" outlined @click.stop="show = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import store from "@/store";
export default {
  props: ["visible"],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nome",
        align: "start",
        sortable: false,
        value: "nome",
      },
      { text: "Descrição", value: "descricao" },
      { text: "Status", value: "status" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    itemsStatus: [
      { text: "Ativo", value: "A" },
      { text: "Inativo", value: "I" },
    ],
    loadingSalvar: false,
    editedIndex: -1,
    editedItem: {
      nome: "",
      descricao: "",
      status: "A",
      id_empresa: ""
    },
    defaultItem: {
      nome: "",
      descricao: "",
      status: "A",
    },
    listaEmpresas: [],
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.listaItens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.listaItens.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {      
      this.$store
        .dispatch("systems/removeItem", this.editedItem.id)
        .then((response) => {
          if (response.data.data === true) {
            this.listaItens.splice(this.editedIndex, 1);
            this.$store.dispatch("module/openSnackBar", {
              color: "success",
              timeout: 3000,
              text: "Registro removido.",
            });
            this.item = {};
          }
        })
        .catch(() => {
          store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 3000,
            text: "Não foi possivel remover o registro.",
          });
        })
        .finally(() => {
          this.loadingTable = false;
          this.dialogDelete = false;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$validator.validate("sistema.*").then((result) => {
        if (result) {
          this.loadingSalvar = true;
          let url =
            this.editedIndex === -1
              ? "/sistema"
              : "/sistema/" + this.editedItem.id;
          let method = this.editedIndex === -1 ? "POST" : "PUT";
          let text =
            this.editedIndex === -1
              ? "sistema cadastrado."
              : "sistema atualizado.";
          let erro =
            this.editedIndex === -1
              ? "Erro ao salvar item."
              : "Erro ao atualizar item.";
          let data = this.editedItem;
          data._method = method;
          data.url = url;
          this.$store
            .dispatch("systems/saveOrUpdate", { data })
            .then(() => {
              this.editedIndex === -1
                ? this.listaItens.push(this.editedItem)
                : Object.assign(
                    this.listaItens[this.editedIndex],
                    this.editedItem
                  );
              this.$store.dispatch("module/openSnackBar", {
                color: "success",
                timeout: 3000,
                text: text,
              });
            })
            .catch((error) => {
              this.$store.dispatch("module/openSnackBar", {
                color: "error",
                timeout: 3000,
                text: erro,
              });
            })
            .finally(() => {
              this.close();
            });
        } else {
          this.$store.dispatch("module/openSnackBar", {
            color: "error",
            timeout: 3000,
            text: "Preencha todo formulário antes de salvar!",
          });
        }
      });
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    store.dispatch("systems/fetchItems");
    store.dispatch("empresas/fetchItems").then((response) => {
      this.listaEmpresas = response.data.data.empresas;
    });
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
    computedHeaders() {
      return this.headers.filter(
        (h) => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    },
    formTitle() {
      return this.editedIndex === -1 ? "Cadastrar sistema" : "Editar sistema";
    },
    listaItens: {
      get() {
        return store.getters["systems/getItemsList"];
      },
      set(value) {
        store.dispatch("systems/setItemList", value);
      },
    },
  },
};
</script>