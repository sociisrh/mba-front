import store from '@/store'
import { onMounted, ref, watch } from '@vue/composition-api'

export default function useRolesList() {
  const rolesListTable = ref([])

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
  const totalRoleListTable = ref(0)
  const loading = ref(false)
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
  })
  const roleTotalLocal = ref([])
  const selectedRows = ref([])

  // fetch data
  const fetchRoles = () => {
    store
    .dispatch('app-roles/fetchRoles')
    .then(response => {
      const dados = response.data.data
      store.commit('app-roles/setRoleList', dados.roles)
      store.commit('app-roles/setPermissionsList', dados.permissions)
      rolesListTable.value = dados.roles
      totalRoleListTable.value = dados.roles.length
      roleTotalLocal.value = dados.roles.length

      // remove loading state
      loading.value = false
    })
    .catch(error => {
      console.log(error)
    })
  }

  onMounted(async () => {
    fetchRoles()
  })
  return {
    rolesListTable,
    tableColumns,
    searchQuery,
    totalRoleListTable,
    loading,
    options,
    roleTotalLocal,
    selectedRows,
    fetchRoles
  }
}
