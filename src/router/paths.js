import store from '@/store';
import admRouter from './adm/index';


export default [
    {
        path: '/',
        name: 'route-valid',
        redirect: to => {          
          const userData = JSON.stringify(store.getters["auth/getUsuario"])
          const userToken = localStorage.getItem('accessToken')
          const userRole = (JSON.parse(userData) && userToken && localStorage.getItem('role') ) ? localStorage.getItem('role') : null 

          if (userRole === 'Administrador') return { name: 'dashboad' }          
          
          return { name: 'auth-login', query: to.query }
                 
        },
        meta: {
          requiresAuth: true
        },
      },
      {
        path: '/error-404',
        name: 'error-404',
        component: () => import('@/views/Error404.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
        },
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          layout: 'content',
          requiresAuth: true
        },
      },
      {
        path: '/second-page',
        name: 'second-page',
        component: () => import('@/views/SecondPage.vue'),
        meta: {
          layout: 'content',
          requiresAuth: true
        },
      },
      {
        path: '/authorize/github/callback',
        name: 'auth-login-github',
        component: () => import('@/views/LoginGithub.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
          requiresAuth: false,
          redirectIfLoggedIn: true,
        },
      },
      {
        path: '/login',
        name: 'auth-login',
        component: () => import('@/views/Login.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
          requiresAuth: false,
          redirectIfLoggedIn: true,
        },
      },
      {
        path: '/register',
        name: 'auth-register',
        component: () => import('@/views/Register.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
          requiresAuth: false,
          redirectIfLoggedIn: true,
        },
      },
      {
        path: '/forgot-password',
        name: 'auth-forgot-password',
        component: () => import('@/views/ForgotPassword.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
          requiresAuth: false,
          redirectIfLoggedIn: true,
        },
      },
      {
        path: '/reset-password/:token',
        name: 'auth-reset-password',
        component: () => import('@/views/ResetPassword.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
          requiresAuth: false,
          redirectIfLoggedIn: true,
        },
      },
      {
        path: '/not-authorized',
        name: 'misc-not-authorized',
        component: () => import('@/views/NotAuthorized.vue'),
        meta: {
          layout: 'blank',
          resource: 'Public',
        },
      },      
      {
        path: '*',
        redirect: 'error-404',
      },
      ...admRouter,
];