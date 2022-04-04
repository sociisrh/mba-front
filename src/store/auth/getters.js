export default {
    authorized: state => state.token,
    authstatus: state => state.authStatus,
    getNotifications: state => state.notifications,
    getNotifHeader: state => state.currentTime,
    getNotificationAmt: state => state.notifications.length,
    getAvatar: state => state.avatarURL,
    getNome: state => state.nome,
    getUsuario: state => state.user,
    getErrorMessage: state => state.errorMessages ,
    getToken: state => state.token
}