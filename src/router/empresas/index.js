import store from "@/store";
export default [

  {
    path: "/empresa/dashboad",
    name: "/empresa/dashboad",
    component: () => import("@/views/Empresas/Dashboad.vue"),
    meta: {
      layout: "content",
      requiresAuth: true,
      resource: 'dashboad-empresa',
      action: 'read'      
    },
  },

  
];
