import { mdiFileOutline, mdiHomeOutline, mdiLockOutline, mdiCogOutline, mdiAccountMultiple, mdiOfficeBuildingOutline, mdiOfficeBuildingMarkerOutline, mdiNotebookMultiple } from '@mdi/js'

export default [
  {
    title: 'Home',
    icon: mdiHomeOutline,
    to: '/empresa/dashboad',
    resource: 'dashboad-empresa',
    action: 'read',
  },
  {
    title: 'Dashboad',
    icon: mdiHomeOutline,
    to: '/adm/dashboad-adm',
    resource: 'Dashboard-adm',
    action: 'view',
  },
  {
    title: 'Configurações',
    icon: mdiCogOutline,
    resource: 'configuracao',
    action: 'view',
    children: [
      {
        title: 'Papeis',
        to: '/adm/configuracao/acl/papeis',
        resource: 'roles',
        action: 'view',
      },
      {
        title: 'Permissões',
        to: '/adm/configuracao/acl/permissoes',
        resource: 'permission',
        action: 'view',
      },
      {
        title: 'Menus',
        to: '/adm/configuracao/menus',
        resource: 'menu',
        action: 'view'
      },
    ],
  },
  {
    title: 'Usuários',
    icon: mdiAccountMultiple,
    to: '/adm/usuarios',
    resource: 'usuarios',
    action: 'view'
  },
  {
    title: 'Empresas',
    icon: mdiOfficeBuildingOutline,
    to: '/adm/empresas',
    resource: 'empresas',
    action: 'view'
  },
  {
    title: 'Empreendimentos',
    icon: mdiOfficeBuildingMarkerOutline,
    to: '/adm/empreendimentos',
    resource: 'empreendimentos',
    action: 'view'
  },
  {
    title: 'Planos de manutenções',
    icon: mdiNotebookMultiple,
    resource: 'planos',
    action: 'view',
    children: [
      {
        title: 'Lista',
        to: '/adm/planos/lista',
        resource: 'planos',
        action: 'view'
      },
      {
        title: 'Fornecedores',
        to: '/adm/fornecedores',
        resource: 'fornecedores',
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
