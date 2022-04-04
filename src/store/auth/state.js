export default {
	authStatus: '',
    errorMessages: '',
	token: localStorage.getItem('accessToken') || false,
	user: localStorage.getItem('user') || [],
	tableList: [],
	notifications: [],
	currentTime: new Date().toLocaleString(),
	avatarURL: localStorage.getItem('user')&& localStorage.getItem('user').avatar || '' ,
	name: localStorage.getItem('user') && localStorage.getItem('user').name || '',
	usuario: '',
	role: localStorage.getItem('role') || ''
}