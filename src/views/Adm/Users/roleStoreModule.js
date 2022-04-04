import axios from "@axios";

export default {
  namespaced: true,
  state: {
    roleList: [],
    permissionsList: [],
    item: [], 
    indexEdicao: false,
   },
  getters: {
    getRoleList: state => state.roleList,
    getPermissionsList: state => state.permissionsList,
    getItem: state => state.item,
    getIndexEdicao: state => state.indexEdicao

  },
  mutations: {
    setRoleList: (state, value) => { state.roleList = value },
    setPermissionsList: (state, value) => { state.permissionsList = value },
    setItem: (state, value) => { state.item = value },
    setIndexEdicao: (state, value) => { state.indexEdicao = value },
  },
  actions: {
    fetchRoles(ctx) {
      return new Promise((resolve, reject) => {
        axios
          .get('/v1/acl/role')
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchRole(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/v1/acl/role/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addRole(ctx, dados) {
      return new Promise((resolve, reject) => {
        axios
          .post('/v1/acl/role', dados )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editRole(ctx, {id, dados}) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/v1/acl/role/${id}`, dados)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    removeRole(ctx, id ) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/v1/acl/role/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
};