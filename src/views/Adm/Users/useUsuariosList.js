import store from '@/store'
import { onMounted, ref, watch } from '@vue/composition-api'
import {
  mdiAccountCheckOutline,
  mdiAccountOutline,
  mdiAccountPlusOutline,
  mdiAccountRemoveOutline,
  mdiCogOutline,
  mdiDatabaseOutline,
  mdiDnsOutline,
  mdiPencilOutline,
  mdiAccountAlertOutline
} from '@mdi/js'

export default function useUsuariosList() {
  const itemsListTable = ref([])

  const tableColumns = [
    { text: 'USUARIO', value: 'name' },
    { text: 'EMAIL', value: 'email' },
    { text: 'PAPEL', value: 'role', sortable: false },
    { text: 'STATUS', value: 'status' },
    { text: 'DATA CADASTRO', value: 'created_at' },
    { text: 'DATA ATUALIZAÇÃO', value: 'updated_at' },
    {
      text: 'AÇÕES',
      value: 'actions',
      align: 'center',
      sortable: false
    },
  ]
  const searchQuery = ref('')
  const totalItemsListTable = ref(0)
  const loading = ref(false)
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })
  const itemsTotalLocal = ref([])
  const selectedRows = ref([])

  // fetch data
  const fetchItems = () => {
    store
    .dispatch('app-usuarios/fetchItems')
    .then(response => {
      const dados = response.data.data  
  
      store.commit('app-usuarios/setUsuariosList', dados.usuarios)
      store.commit('app-usuarios/setEmpreendimentosList', dados.empreendimentos)
      store.commit('app-usuarios/setRolesList', dados.roles)
      store.commit('app-usuarios/setEmpresasList', dados.empresas)
      itemsListTable.value = dados.usuarios
      totalItemsListTable.value = dados.usuarios.length
      itemsTotalLocal.value = dados.usuarios.length

      // remove loading state
      loading.value = false
    })
    .catch(error => {
      console.log(error)
    })
  }

  const resolveStatusVariant = status => {
    if (status === 'P') return 'warning'
    if (status === 'A') return 'success'
    if (status === 'I') return 'secondary'

    return 'primary'
  }
  const resolveNameStatusVariant = status => {
    if (status === 'P') return 'PENDENTE'
    if (status === 'A') return 'ATIVO'
    if (status === 'I') return 'INATIVO'

    return 'primary'
  }

  const resolveUserRoleVariant = role => { 
    if (role === false) return 'error'
    if (role === 'Sindico') return 'warning'
    if (role === 'Construtora') return 'success'
    if (role === 'Visistante') return 'info'
    if (role === 'Administrador') return 'error'

    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role === false) return mdiAccountAlertOutline
    if (role === 'Sindico') return mdiCogOutline
    if (role === 'Construtora') return mdiDatabaseOutline
    if (role === 'Visistante') return mdiPencilOutline
    if (role === 'Administrador') return mdiDnsOutline

    return mdiAccountOutline
  }
  const resolvedRequired = value => (value ? true : 'Este campo é obrigatório')

  onMounted(async () => {
    fetchItems()
  })
  return {
    itemsListTable,
    tableColumns,
    searchQuery,
    totalItemsListTable,
    loading,
    options,
    itemsTotalLocal,
    selectedRows,
    fetchItems,
    resolveStatusVariant,
    resolveNameStatusVariant,
    resolvedRequired,
    resolveUserRoleVariant,
    resolveUserRoleIcon
  }
}
