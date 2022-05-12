<template language="html">
  <div class="gestao-planos">
    <crud
      :title="'Gestão de planos'"
      buttonAddItemText="Novo plano"
      :dialog.sync="dialog"
      :formTitle="formTitle"
      :callBackModalCancelar="fechar"
      :callBackModalSalvar="salvar"
      :callBackModalInsert="resetFields"
      :loadingButtonSave="loadingControl.loadingSalvar"
      :tamanhoModalCrud="600"
      searchLabelText="Pesquisar na lista"
      :searchTextField.sync="searchTextField"
      :dialogDelete.sync="dialogDelete"
    >
      <template slot="data-content">
        <div class="row mr-2">
          <div class="col-12 d-flex flex-row-reverse">
            <v-menu transition="slide-y-transition" bottom>
              <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on" large>
                    <v-icon
                        size="17"
                        class="me-1"
                    >
                        mdi-file-cog-outline
                    </v-icon>
                  Configurações
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="modalComponentes()">
                  <v-list-item-title>Equipamentos</v-list-item-title>
                </v-list-item>
                <v-list-item @click="modalSistemas()">
                  <v-list-item-title>Sistemas</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </template>
      <template slot="data-table">
        <v-data-table
          :loading="loadingTable"
          :headers="computedHeaders"
          :items="listaItens"
          :search="searchTextField"
          items-per-page-text="Linhas por página"
          no-results-text="Nenhum registro encontrado"
          no-data-text="Nenhum registro encontrado"
          mobile-breakpoint="0"
        >
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
          <template v-slot:[`item.rota`]="{ item }">
            <span v-if="item.rota !== ''">{{ item.rota }}</span>
            <span v-else>
              <v-chip label> Lista </v-chip>
            </span>
          </template>
          <template v-slot:[`item.acao`]="{ item }">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="toggleModalLateral(item)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-eye </v-icon>
                    <span>Visualizar</span>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="editar(item)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-pencil </v-icon>
                    <span>Editar</span>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item @click="remover(item, true)">
                  <v-list-item-title>
                    <v-icon size="20" class="me-2"> mdi-delete </v-icon>
                    <span>Apagar</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </template>
      <!-- ------------- MODAL DE DELETE --------------------------------------------- -->
      <template slot="modalDelete/titleModal">Excluir o registro?</template>
      <template slot="modalDelete/contentModal">
        <p>
          Atenção! Você está prestes a realizar uma ação que não pode ser
          desfeita.
        </p>
        <p>Você realmente deseja excluir esse registro?</p>
      </template>
      <template slot="modalDelete/actionsModal">
        <v-btn depressed @click="dialogDelete = false">Fechar</v-btn>
        <v-btn color="error" @click="remover()">Excluir</v-btn>
        <v-spacer class="d-none d-md-block"></v-spacer>
      </template>
      <!-- ------------- MODAL DE CADASTRO --------------------------------------------- -->
      <template slot="contentModalCrud">
        <v-container fluid>
          <v-row wrap>
            <v-col cols="12" md="12">
              <v-text-field
                outlined
                label="Nome"
                data-vv-as="nome"
                dense
                persistent-hint
                v-model="objetoEdicao.nome"
                :hint="errors.first('nome')"
                :error="errors.collect('nome').length ? true : false"
                v-validate="'required'"
                data-vv-scope="plano"
                data-vv-validate-on="change"
                id="nome"
                name="nome"
                trim
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Data inicial"
                data-vv-as="data_inicial"
                dense
                persistent-hint
                v-model="objetoEdicao.data_inicial"
                :hint="errors.first('data_inicial')"
                :error="errors.collect('data_inicial').length ? true : false"
                v-validate="'required'"
                data-vv-scope="plano"
                data-vv-validate-on="change"
                id="data_inicial"
                name="data_inicial"
                trim
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Data final"
                data-vv-as="data_final"
                dense
                persistent-hint
                v-model="objetoEdicao.data_final"
                :hint="errors.first('data_final')"
                :error="errors.collect('data_final').length ? true : false"
                v-validate="'required'"
                data-vv-scope="plano"
                data-vv-validate-on="change"
                id="data_final"
                name="data_final"
                trim
              />
            </v-col>
            <div class="col-12">
              <v-select
                :items="listaEmpreendimentos"
                outlined
                dense
                item-text="name"
                item-value="id"
                label="Empreendimentos"
                hide-details="auto"
                data-vv-as="Empreendimentos"
                persistent-hint
                v-model="objetoEdicao.id_empresa"
                :hint="errors.first('empreendimento_id')"
                :error="errors.collect('empreendimento_id').length ? true : false"
                v-validate="'required'"
                data-vv-scope="plano"
                data-vv-validate-on="change"
                trim
              ></v-select>
            </div>
          </v-row>
        </v-container>
      </template>
    </crud>
    <modal-sistemas :visible="showFormSistemas" @close="showFormSistemas=false" ></modal-sistemas>
    <modal-componentes :visible="showFormEquipamentos" @close="showFormEquipamentos=false" ></modal-componentes>
  </div>
</template>
<script>
import logo from "@/assets/images/svg/logo.svg";
import Crud from "@/components/Crud.vue";
import ModalLateral from "@/components/ModalLateral.vue";
import modalSistemas from "@/views/Adm/Planos/Sistemas.vue"
import modalComponentes from "@/views/Adm/Planos/Componentes.vue"
import store from "@/store";
export default {
  name: "gestao-planos",
  components: { Crud, ModalLateral, modalSistemas, modalComponentes },
  metaInfo() {
    return {
      title: "planos",
    };
  },
  data() {
    return {
      image: logo,
      searchTextField: "",
      dialog: false,
      loadingTable: false,
      loadingControl: {
        dataTable: false,
        loadingSalvar: false,
      },
      headers: [
        { text: "Nome", value: "nome", sortable: false, hide: "smAndDown" },
        { text: "Empreendimento", value: "empreendimento"},
        { text: "Data inicial", value: "data_inicial"},
        { text: "Data final", value: "data_final"},
        { text: "Status", value: "status", },
        { text: "Ações", value: "acao", sortable: false, align: "center" },
      ],
      headersModal: [
        {
          text: "Uuid",
          value: "uuid",
        },
        {
          text: "Nome",
          value: "nome",
        },
        {
          text: "E-mail",
          value: "email",
        },
        {
          text: "Responsavel",
          value: "responsavel",
        },
        {
          text: "Status",
          value: "status",
        },
        {
          text: "Data de criação",
          value: "created_at",
        },
        {
          text: "Última alteração",
          value: "updated_at",
        },
      ],
      listaItensDataTable: [],
      objetoSalvar: [],
      dialogDelete: false,
      dialog: false,
      showFormEquipamentos: false,
      showFormSistemas: false,
      modalLateral: {
        show: false,
        item: [],
        title: "",
      },
      buttonAction: false,
      objetoEdicao: {
        nome: "",
        email: "",
        responsavel: "",
        status: "",
        id_empresa: "",
      },
      indexEdicao: 0,
      edicao: false,
    };
  },
  methods: {
    editar(item) {
      this.edicao = true;
      this.indexEdicao = this.listaItens.indexOf(item);
      this.objetoEdicao = Object.assign({}, item);
      this.dialog = true;
    },
    resetFields() {},
    fechar() {
      this.dialog = false;
      this.edicao = false;
      this.objetoEdicao = {};
    },
    salvar() {
      this.$validator.validate("fornecedor.*").then((result) => {
        if (result) {
          this.loadingExcluir = true;
          this.loadingSalvar = true;
          let url =
            this.edicao === false
              ? "/fornecedor"
              : "/fornecedor/" + this.objetoEdicao.id;
          let method = this.edicao === false ? "POST" : "PUT";
          let text =
            this.edicao === false
              ? "fornecedor cadastrado."
              : "fornecedor atualizado.";
          let erro =
            this.edicao === false
              ? "Erro ao salvar item."
              : "Erro ao atualizar item.";
          let data = this.objetoEdicao;
          data._method = method;
          data.url = url;
          this.$store
            .dispatch("providers/saveOrUpdate", { data })
            .then(() => {
              this.edicao === false
                ? this.listaItens.push(this.objetoEdicao)
                : Object.assign(
                    this.listaItens[this.indexEdicao],
                    this.objetoEdicao
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
              this.fechar();
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
    remover(item, openModal = false) {
      if (openModal) {
        this.item = item;
        this.dialogDelete = true;
      } else {
        this.loadingTable = true;
        let item = this.item;
        this.indexEdicao = this.listaItens.indexOf(item);
        this.$store
          .dispatch("providers/removeItem", this.item.id)
          .then((response) => {
            if (response.data.data === true) {
              this.listaItens.pop(this.indexEdicao);
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
      }
    },
    toggleModalLateral(item) {
      this.modalLateral.title = this.modalLateral.show ? "" : item.nome;
      this.modalLateral.item = this.modalLateral.show ? [] : item;
      this.modalLateral.show = this.modalLateral.show ? false : true;
    },
    resolveStatusVariant(status) {
      if (status === "P") return "warning";
      if (status === "A") return "success";
      if (status === "I") return "secondary";

      return "warning";
    },
    resolveNameStatusVariant(status) {
      if (status === "P") return "PENDENTE";
      if (status === "A") return "ATIVO";
      if (status === "I") return "INATIVO";

      return "PENDENTE";
    },
    modalComponentes()
    {
        this.showFormEquipamentos = !this.showFormEquipamentos;
    },
    modalSistemas()
    {
        this.showFormSistemas = !this.showFormSistemas;
    }
  },
  computed: {
    computedHeaders() {
      return this.headers.filter(
        (h) => !h.hide || !this.$vuetify.breakpoint[h.hide]
      );
    },
    formTitle() {
      return this.edicao === false
        ? "Cadastrar planos"
        : "Editar planos";
    },
  },
  created() {},
};
</script>
<style lang="scss">
</style>