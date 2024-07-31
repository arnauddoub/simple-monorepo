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
