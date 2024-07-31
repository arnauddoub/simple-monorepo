import type { UserListResponse } from 'types/dist/user'
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/composables/useApi'

export default function useUserQuery() {
  function useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const { data, error } = await useApi('/users').get().json<UserListResponse>()
        if (error.value) throw new Error()
        return data.value
      }
    })
  }

  return {
    useGetUsers
  }
}
