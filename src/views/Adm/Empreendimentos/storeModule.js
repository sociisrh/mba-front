import axios from "@axios";

export default {
  namespaced: true,
  state: {
    itemsList: [],
    empreendimentosList: [],
    empresasList: [],
    item: [], 
    indexEdicao: false
   },
  getters: {
    getItemsList: state => state.itemsList,
    getEmpreendimentosList: state => state.empreendimentosList,
    getEmpresasList: state => state.empresasList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao

  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setEmpreendimentosList: (state, value) => { state.empreendimentosList = value },
    setEmpresasList: (state, value) => { state.empresasList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },    
  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/empreendimento/initialize')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/empreendimento/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/empreendimento', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/empreendimento/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/empreendimento/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};