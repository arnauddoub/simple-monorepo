import type { Validator, UsersSchema } from '@my-monorepo/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { useApi } from '@/composables/useApi'

export default function useUserQuery() {
  const queryClient = useQueryClient()

  function useGetUsers() {
    return useQuery({
      queryKey: ['users'],
      queryFn: async () => {
        const { data, error } = await useApi('/users').get().json<ReturnType<UsersSchema['index']>>()
        if (error.value) throw new Error()
        return data.value
      }
    })
  }

  function useGetUserById(id: string) {
    return useQuery({
      queryKey: ['user', id],
      queryFn: async () => {
        const { data, error } = await useApi(`/users/${id}`).get().json<ReturnType<UsersSchema['show']>>()
        if (error.value) throw new Error()
        return data.value
      }
    })
  }

  function useCreateUser() {
    return useMutation({
      mutationFn: async (payload: Validator<UsersSchema['store']>) => {
        const { data, error } = await useApi('/users').post(payload).json<ReturnType<UsersSchema['store']>>()
        if (error.value) throw new Error()
        return data.value
      },
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    })
  }

  function useUpdateUser(id: string) {
    return useMutation({
      mutationFn: async (payload: Validator<UsersSchema['update']>) => {
        const { data, error } = await useApi(`/users/${id}`).put(payload).json<ReturnType<UsersSchema['update']>>()
        if (error.value) throw new Error()
        return data.value
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries({ queryKey: ['user', id] })
      },
    })
  }

  function useDeleteUser(id: string) {
    return useMutation({
      mutationFn: async () => {
        const { data, error } = await useApi(`/users/${id}`).delete().json<ReturnType<UsersSchema['destroy']>>()
        if (error.value) throw new Error()
        return data.value
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        queryClient.invalidateQueries({ queryKey: ['user', id] })
      },
    })
  }

  return {
    useGetUsers,
    useGetUserById,
    useCreateUser,
    useUpdateUser,
    useDeleteUser
  }
}
