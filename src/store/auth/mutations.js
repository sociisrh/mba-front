export default {
    auth_request (state) {
        state.authStatus = 'loading'
    },
    auth_success (state,{ token, user }) {
        state.authStatus = 'success'
        state.token = token
        state.user = user
    },
    auth_error (state) {
        state.authStatus = 'error'
    },
    auth_status (state, value) {
        state.authStatus = value
    },
    logout (state) {
        state.authStatus = ''
        state.token = ''
        state.user = ''
    },
    setTableList (state, tableList) {
        state.tableList = tableList
    },
    clearNotifications(state){
        state.notifications = 0
    },
    setErrorMessage(state, value) {
        state.errorMessages = value
    },
    setUser(state, value)
    {
        state.user = value
    },
    setToken(state, value) {
        state.token = value
    },
    setUsuario(state, value)
    {
        state.usuario = value
    },
    setRole(state, value)
    {
        state.role = value
    }

}