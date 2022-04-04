import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './../store/index';
import paths from './paths';
import { canNavigate } from '@/plugins/acl/routeProtection';

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: paths,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});

router.beforeEach((to, _, next) => {
  const userData = localStorage.getItem('user')
  const isLoggedIn = userData && localStorage.getItem('accessToken') && localStorage.getItem('userAbility')

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) {
      return next({ name: 'auth-login', query: { marketplace: to.query.marketplace } })    
    }
    if(isLoggedIn === null || isLoggedIn == '')
    {
      // If logged in => not authorized
      return next({ name: 'misc-not-authorized' })
    }
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    next('/')
  }
  
  return next()
})

export default router
