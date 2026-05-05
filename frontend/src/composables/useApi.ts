import type { Registry } from '@my-monorepo/backend/registry/schema'
import { createFetch } from '@vueuse/core'

export const useApi = createFetch({
  baseUrl: '/api',
  fetchOptions: {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
})

export type ApiRoute = keyof Registry
export type ApiBody<K extends ApiRoute> = Registry[K]['types']['body']
export type ApiResponse<K extends ApiRoute> = Registry[K]['types']['response']
export type ApiQuery<K extends ApiRoute> = Registry[K]['types']['query']
export type ApiParams<K extends ApiRoute> = Registry[K]['types']['params']
export type ApiErrorResponse<K extends ApiRoute> = Registry[K]['types']['errorResponse']
