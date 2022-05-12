import store from "@/store";
export default [

  {
    path: "/adm/dashboad-adm",
    name: "/adm/dashboad-adm",
    component: () => import("@/views/Adm/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/usuarios",
    name: "/adm/usuarios",
    component: () => import("@/views/Adm/Users/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/configuracao/acl/papeis",
    name: "/adm/configuracao/acl/papeis",
    component: () => import("@/views/Adm/Acl/Role/Papeis.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/configuracao/acl/permissoes",
    name: "/adm/configuracao/acl/permissoes",
    component: () => import("@/views/Adm/Acl/Permissions/Permissions.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'dashboad-empresa',
      action: 'view',
    },
  },
  {
    path: "/adm/configuracao/menus",
    name: "/adm/configuracao/menus",
    component: () => import("@/views/Adm/Menu/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/empresas",
    name: "/adm/empresas",
    component: () => import("@/views/Adm/Empresas/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/empreendimentos",
    name: "/adm/empreendimentos",
    component: () => import("@/views/Adm/Empreendimentos/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/fornecedores",
    name: "/adm/fornecedores",
    component: () => import("@/views/Adm/Fornecedores/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  {
    path: "/adm/planos/lista",
    name: "/adm/planos/lista",
    component: () => import("@/views/Adm/Planos/Index.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
    },
  },
  
];
