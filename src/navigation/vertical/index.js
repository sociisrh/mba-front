import { mdiFileOutline, mdiHomeOutline, mdiLockOutline } from '@mdi/js'

export default [
  {
    title: 'Dashboad',
    icon: mdiHomeOutline,
    to: 'dashboard',
  },
  {
    title: 'Configurações',
    icon: mdiLockOutline,
    children: [
      {
        title: 'Papeis',
        to: 'acl-papeis',
      },
      {
        title: 'Permissões',
        to: 'acl-permissoes',
      },
      {
        title: 'Menus',
        to: 'acl-menus',
      },
    ],
  },
  {
    title: 'Usuários',
    icon: mdiFileOutline,
    to: 'usuarios',
  },
  {
    title: 'Empresas',
    icon: mdiFileOutline,
    to: 'empresas',
  },
  {
    title: 'Empreendimentos',
    icon: mdiFileOutline,
    to: 'empreendimentos',
  },
  {
    title: 'Planos de manutenções',
    icon: mdiLockOutline,
    children: [
      {
        title: 'Lista',
        to: 'planos-list',
      },
      {
        title: 'Novo plano',
        to: 'planos-new',
      }
    ],
  },

]
