import type { Response, UserSchema } from '@my-monorepo/types'
import { useQuery } from '@tanstack/vue-query'
import { useApi } from '@/composables/useApi'

export default function useUserQuery() {
  function useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const { data, error } = await useApi('/users').get().json<Response<UserSchema['index']>>()
        if (error.value) throw new Error()
        return data.value
      }
    })
  }

  return {
    useGetUsers
  }
}
