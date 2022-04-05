import { mdiFileOutline, mdiHomeOutline, mdiLockOutline } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: 'dashboad-empresa',
    resource: 'dashboad-empresa',
    action: 'read',
  },
  {
    title: 'Dashboad',
    icon: mdiHomeOutline,
    to: 'dashboard',
    resource: 'Dashboard-adm',
    action: 'view',
  },
  {
    title: 'Configurações',
    icon: mdiLockOutline,
    resource: 'configuracao',
    action: 'view',
    children: [
      {
        title: 'Papeis',
        to: 'acl-papeis',
        resource: 'roles',
        action: 'view',
      },
      {
        title: 'Permissões',
        to: 'acl-permissoes',
        resource: 'permission',
        action: 'view',
      },
      {
        title: 'Menus',
        to: 'acl-menus',
        resource: 'menu',
        action: 'view'
      },
    ],
  },
  {
    title: 'Usuários',
    icon: mdiFileOutline,
    to: 'usuarios',
    resource: 'usuarios',
    action: 'view'
  },
  {
    title: 'Empresas',
    icon: mdiFileOutline,
    to: 'empresas',
    resource: 'empresas',
    action: 'view'
  },
  {
    title: 'Empreendimentos',
    icon: mdiFileOutline,
    to: 'empreendimentos',
    resource: 'empreendimentos',
    action: 'view'
  },
  {
    title: 'Planos de manutenções',
    icon: mdiLockOutline,
    resource: 'planos',
    action: 'view',
    children: [
      {
        title: 'Lista',
        to: 'planos-list',
        resource: 'planos',
        action: 'view'
      },
      {
        title: 'Novo plano',
        to: 'planos-new',
        resource: 'planos-new',
        action: 'view'
      }
    ],
  },

]
