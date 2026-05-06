import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useApi, type ApiBody, type ApiResponse } from '@/composables/useApi';

export function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await useApi('/users').get().json<ApiResponse<'users.index'>>();
      if (error.value || !data.value) throw new Error();
      return data.value.data;
    },
  });
}

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data, error } = await useApi(`/users/${id}`).get().json<ApiResponse<'users.show'>>();
      if (error.value || !data.value) throw new Error();
      return data.value.data;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ApiBody<'users.store'>) => {
      const { data, error } = await useApi('/users')
        .post(payload)
        .json<ApiResponse<'users.store'>>();
      if (error.value || !data.value) throw new Error();
      return data.value.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ApiBody<'users.update'>) => {
      const { data, error } = await useApi(`/users/${id}`)
        .put(payload)
        .json<ApiResponse<'users.update'>>();
      if (error.value || !data.value) throw new Error();
      return data.value.data;
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['user', id] }),
      ]),
  });
}

export function useDeleteUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await useApi(`/users/${id}`)
        .delete()
        .json<ApiResponse<'users.destroy'>>();
      if (error.value) throw new Error();
      return data.value;
    },
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ['users'] }),
        queryClient.invalidateQueries({ queryKey: ['user', id] }),
      ]),
  });
}
