import store from '@/store'
import { onMounted, ref, watch } from '@vue/composition-api'

export default function useEmpresasList() {
  const itemsListTable = ref([])

  const tableColumns = [
    { text: 'NOME', value: 'name' },
    { text: 'CONTATOS', value: 'fone' },
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
    .dispatch('app-empresas/fetchItems')
    .then(response => {
      const dados = response.data.data  
      store.commit('app-empresas/setEmpresasList', dados.empresas)
      itemsListTable.value = dados.empresas
      totalItemsListTable.value = dados.empresas.length
      itemsTotalLocal.value = dados.empresas.length

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
    resolveNameStatusVariant
  }
}
