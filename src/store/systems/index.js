import axios from "@axios";
import store from '@/store';
export default {
  namespaced: true,
  state: {
    itemsList: [],
    item: [], 
    indexEdicao: false,
    listaEmpresas: []
   },
  getters: {
    getItemsList: state => state.itemsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao,
    getListaEmpresas: state => state.listaEmpresas


  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },
    setListaEmpresas: (state, value) => { state.listaEmpresas = value },   

  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/sistema')
          .then(response => {
            const dados = response.data.data  
  
            store.commit('systems/setItemList', dados.sistemas)
            store.commit('providers/setListaEmpresas', dados.empresas)
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/sistema/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/sistema', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    saveOrUpdate(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post(`/v1${dados.data.url}`, dados.data )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/sistema/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/sistema/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};