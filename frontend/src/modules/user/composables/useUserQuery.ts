import type { Registry } from '@my-monorepo/backend/registry/schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useApi } from '@/composables/useApi'

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await useApi('/users')
        .get()
        .json<Registry['users.index']['types']['response']>()
      if (error.value || !data.value) throw new Error()
      return data.value.data
    },
  })
}

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data, error } = await useApi(`/users/${id}`)
        .get()
        .json<Registry['users.show']['types']['response']>()
      if (error.value || !data.value) throw new Error()
      return data.value.data
    },
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: Registry['users.store']['types']['body']) => {
      const { data, error } = await useApi('/users')
        .post(payload)
        .json<Registry['users.store']['types']['response']>()
      if (error.value || !data.value) throw new Error()
      return data.value.data
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: Registry['users.update']['types']['body']) => {
      const { data, error } = await useApi(`/users/${id}`)
        .put(payload)
        .json<Registry['users.update']['types']['response']>()
      if (error.value || !data.value) throw new Error()
      return data.value.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}

export function useDeleteUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await useApi(`/users/${id}`)
        .delete()
        .json<Registry['users.destroy']['types']['response']>()
      if (error.value) throw new Error()
      return data.value
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })
}
