import axios from "@axios";

export default {
  namespaced: true,
  state: {
    itemsList: [],
    permissionsList: [],
    item: [], 
    indexEdicao: false,
   },
  getters: {
    getItemsList: state => state.itemsList,
    getPermissionsList: state => state.permissionsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao

  },
  mutations: {
    setItemList: (state, value) => { state.itemsList = value },
    setPermissionsList: (state, value) => { state.permissionsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },

    
  },
  actions: {
    fetchItems(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/acl/permission')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchItem(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/acl/permission/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addItem(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/acl/permission', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editItem(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/acl/permission/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeItem(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/acl/permission/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};