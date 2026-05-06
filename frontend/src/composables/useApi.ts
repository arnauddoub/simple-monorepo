import type { Registry } from '@my-monorepo/backend/registry/schema';
import { createFetch, type OnFetchErrorContext } from '@vueuse/core';

function getErrorMessage(ctx: OnFetchErrorContext): string {
  if (ctx.data?.message) return ctx.data.message;
  if (ctx.response) return `${ctx.response.status} ${ctx.response.statusText}`.trim();
  if (ctx.error?.message) return ctx.error.message;
  return 'An error occurred';
}

export const useApi = createFetch({
  baseUrl: '/api',
  fetchOptions: {
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  },
  options: {
    onFetchError(ctx) {
      if (ctx.response?.status === 422) {
        for (const error of ctx.data?.errors || []) {
          alert(`Error : ${error.message}`);
        }
      } else {
        alert(`Error : ${getErrorMessage(ctx)}`);
      }
      return ctx;
    },
  },
});

export type ApiRoute = keyof Registry;
export type ApiBody<K extends ApiRoute> = Registry[K]['types']['body'];
export type ApiResponse<K extends ApiRoute> = Registry[K]['types']['response'];
export type ApiQuery<K extends ApiRoute> = Registry[K]['types']['query'];
export type ApiParams<K extends ApiRoute> = Registry[K]['types']['params'];
export type ApiErrorResponse<K extends ApiRoute> = Registry[K]['types']['errorResponse'];
