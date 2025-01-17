// axios
import axios from 'axios'
import Vue from 'vue'
import store from '@/store'
const token = localStorage.getItem('accessToken')

const axiosIns = axios.create({
  baseURL:  process.env.VUE_APP_BASE_URI_API_MANUTENCAO,
  headers: {
    Authorization: (token) ? `Bearer ${token}` : localStorage.getItem('accessToken')
  }
});

if (token != undefined)
{
  axiosIns.defaults.headers.common["Authorization"] = "Bearer " + token
  axios.defaults.headers.common["Authorization"] = "Bearer " + token
}

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosIns.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosIns.defaults.headers.get["Accepts"] = "application/json";

Vue.prototype.$http = axiosIns

export default axiosIns

