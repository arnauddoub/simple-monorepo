import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'users.index',
    component: () => import('@/modules/user/views/UserListView.vue')
  },
  {
    path: '/users/:id',
    name: 'users.show',
    component: () => import('@/modules/user/views/UserView.vue'),
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: () => import('@/modules/user/views/CreateUserView.vue'),
  }
]