import axios from "axios";
import router from "@/router";
import { Ability, AbilityBuilder } from "@casl/ability";


async function login({ commit, dispatch }, user) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/login",
      data: user,
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.data.access_token;
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        console.error("Oops, Unable to login! teste");
        console.log("error :>> ", erro.response);
        dispatch("module/openSnackBar", {
          color: "error",
          timeout: 10000,
          text: "Oops, dados invalidos.",
        });
        resolve(false);
      });
  });
}
async function loginGithub({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/authorize/github/redirect",
      method: "GET",
    })
      .then((response) => {
        resolve(response)
      })
      .catch((erro) => {
        console.error("Oops, Unable to login!");
        console.log("error :>> ", erro.response);
        reject(erro.response);
      });
  });
} 

async function loginUserCallback({ commit, dispatch }, payload) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/authorize/github/callback",
      params: payload,
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200 && response.data.data.access_token) {
          const token = response.data.data.access_token;
          localStorage.setItem("accessToken", token);
          axios.defaults.headers.common["Authorization"] = "Bearer " + token;
          resolve(response);
        }
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function recuperarSenha({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/forgotPassword",
      data: data,
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function validarToken({ commit, dispatch }, dados) {
  return new Promise((resolve, reject) => {
    const token = dados.split("=");
    const data = {
      token: token[1],
    };
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/validToken",
      data: data,
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.codigo == false) {
            commit("setErrorMessage", "Link expirado, tente novamente.");
            this.$route.push("auth-login");
          }
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function novaSenha({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/registerNewPassword",
      data,
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function register({ commit, dispatch }, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: process.env.VUE_APP_BASE_URI_API_MANUTENCAO + "/register",
      data,
      method: "POST",
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        reject(erro);
      });
  });
}

async function dadosUsuario({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    axios({
      url:
        process.env.VUE_APP_BASE_URI_API_MANUTENCAO +
        "/v1/usuario/dados-usuario",
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          const ability = new Ability([])
          const user = response.data.data.user;
          localStorage.setItem("user", user);
          localStorage.setItem("role", user.role);

          commit("setUser", user);
          commit("setUsuario", user);
          commit("auth_status", "LOGADO");
          commit("setRole", user.role);
          const { ability: userAbility } = user;
          ability.update(userAbility)

          // Set user's ability in localStorage for Access Control
          localStorage.setItem("userAbility", JSON.stringify(userAbility));

          // We will store `userAbility` in localStorage separate from userData
          // Hence, we are just removing it from user object
          delete user.ability;

          // On success redirect to home
          router.push("/").catch(() => {});
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        console.error("Oops, Aconteceu um erro por aqui!");
        console.log("error :>> ", erro);
        reject(false);
      });
  });
}

async function dadosMenus({ commit, dispatch }) {
  return new Promise((resolve, reject) => {
    axios({
      url:
        process.env.VUE_APP_BASE_URI_API_MANUTENCAO +
        "/v1/usuario/dados-menus",
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
          const ability = new Ability([])
          const user = response.data.data.user;
          localStorage.setItem("user", user);
          localStorage.setItem("role", user.role);

          commit("setUser", user);
          commit("setUsuario", user);
          commit("auth_status", "LOGADO");
          commit("setRole", user.role);
          const { ability: userAbility } = user;
          ability.update(userAbility)

          // Set user's ability in localStorage for Access Control
          localStorage.setItem("userAbility", JSON.stringify(userAbility));

          // We will store `userAbility` in localStorage separate from userData
          // Hence, we are just removing it from user object
          delete user.ability;

          // On success redirect to home
          router.push("/").catch(() => {});
          resolve(true);
        }
        resolve(false);
      })
      .catch((erro) => {
        console.error("Oops, Aconteceu um erro por aqui!");
        console.log("error :>> ", erro);
        reject(false);
      });
  });
}

export default {
  login,
  loginGithub,
  loginUserCallback,
  recuperarSenha,
  novaSenha,
  validarToken,
  dadosUsuario,
  register,
};
