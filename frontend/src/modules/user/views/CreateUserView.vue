<script setup lang="ts">
import type { CreateUser } from '@my-monorepo/types'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'
import { UserRole } from '@my-monorepo/types'
import useUserQuery from '@/modules/user/composables/useUserQuery'

const router = useRouter()
const { useCreateUser } = useUserQuery()
const { mutate: createUser } = useCreateUser()

const form = reactive<CreateUser>({
  fullName: '',
  email: '',
  password: '',
  role: UserRole.USER
})

function submit() {
  createUser(form, {
    onSuccess: () => router.push({ name: 'users.index' }),
  })
}
</script>

<template>
  <form @submit.prevent="submit">
    <div>
      <label for="fullName">Full Name</label>
      <input type="text" id="fullName" v-model="form.fullName" />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="form.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" id="password" v-model="form.password" />
    </div>
    <div>
      <label for="role">Role</label>
      <select id="role" v-model="form.role">
        <option :value="UserRole.USER">User</option>
        <option :value="UserRole.ADMIN">Admin</option>
      </select>
    </div>
    <button type="submit">Create</button>
  </form>
</template>
