import store from '@/store'
import { onMounted, ref, watch } from '@vue/composition-api'

export default function useUsuariosList() {
  const itemsListTable = ref([])


  const tableColumns = [
    { text: 'NOME', value: 'title' },
    { text: 'ROTA', value: 'to' },
    { text: 'POSIÇÃO', value: 'ordem' },
    { text: 'ICONE', value: 'icon' },
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
    .dispatch('app-menus/fetchItems')
    .then(response => {
      const dados = response.data.data  
      store.commit('app-menus/setMenuList', dados.menus)
      store.commit('app-menus/setPermissionsList', dados.permissions)
      itemsListTable.value = dados.menus
      totalItemsListTable.value = dados.menus.length
      itemsTotalLocal.value = dados.menus.length

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
