import Vue from 'vue';
import VueRouter from 'vue-router';
import paths from './paths';
import { canNavigate } from '@/plugins/acl/routeProtection';
import store from '@/store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: to => {          
      const userData = JSON.stringify(store.getters["auth/getUsuario"])
      const userToken = localStorage.getItem('accessToken')
      const userRole = (JSON.parse(userData) && userToken && localStorage.getItem('role') ) ? localStorage.getItem('role') : null 

      if (userRole === 'Administrador') return { name: '/adm/dashboad-adm' }
      if (userRole === 'Construtora') return { name: '/empresa/dashboad' }          
      
      return { name: 'auth-login', query: to.query }
              
    },
    meta: {
      requiresAuth: true
    },
  },
  ...paths
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});

router.beforeEach((to, _, next) => {
  const userData = localStorage.getItem('user')
  const isLoggedIn = userData && localStorage.getItem('accessToken') && localStorage.getItem('userAbility')
  
  if (!canNavigate(to))
  {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login', query: { marketplace: to.query.marketplace } })    

    return next({ name: 'misc-not-authorized' })    
  }
  else if ((to.name === 'auth-login' || to.name === 'auth-register' || to.name === 'auth-forgot-password' || to.name === 'auth-reset-password' || to.name === 'auth-login') && isLoggedIn)
  {
    return next('/')
  }
  else {
    return next()
  }  
})

export default router
