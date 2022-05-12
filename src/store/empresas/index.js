import axios from "@axios";

export default {
  namespaced: true,
  state: {
    itemsList: [],
    empresaList: [],
    item: [], 
    indexEdicao: false
   },
  getters: {
    getItemsList: state => state.itemsList,
    getEmpresasList: state => state.empresaList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao

  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setEmpresasList: (state, value) => { state.empresaList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },    
  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/empresas/initialize')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/empresas/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/empresas', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/empresas/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/empresas/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};