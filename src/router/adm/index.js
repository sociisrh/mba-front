import store from "@/store";
export default [

  {
    path: "/dashboad",
    name: "dashboad",
    component: () => import("@/views/Adm/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("@/views/Adm/Users/Users.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/papeis",
    name: "acl-papeis",
    component: () => import("@/views/Adm/Acl/Role/Papeis.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/permissoes",
    name: "acl-permissoes",
    component: () => import("@/views/Adm/Acl/Permissions/Permissions.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'dashboad-empresa',
      action: 'view',
    },
  },
  {
    path: "/menus",
    name: "acl-menus",
    component: () => import("@/views/Adm/Menu/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  
];
