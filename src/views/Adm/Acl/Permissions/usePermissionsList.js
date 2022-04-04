import store from '@/store'
import { onMounted, ref, watch } from '@vue/composition-api'

export default function usePermissionsList() {
  const itemsListTable = ref([])


  const tableColumns = [
    { text: 'NOME', value: 'name' },
    { text: 'GUARD', value: 'guard_name' },
    { text: 'DATA CADASTRO', value: 'created_at' },
    { text: 'DATA ATUALIZAÇÃO', value: 'updated_at' },
    {
      text: 'AÇÕES',
      value: 'actions',
      align: 'center',
      sortable: false,
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
    .dispatch('app-permissoes/fetchItems')
    .then(response => {
      const dados = response.data.data  
      store.commit('app-permissoes/setPermissionsList', dados.permissions)
      itemsListTable.value = dados.permissions
      totalItemsListTable.value = dados.permissions.length
      itemsTotalLocal.value = dados.permissions.length

      // remove loading state
      loading.value = false
    })
    .catch(error => {
      console.log(error)
    })
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
    fetchItems
  }
}
