<script setup lang="ts">
import { useGetUsers } from '@/modules/user/composables/useUserQuery'

const { data: users } = useGetUsers()
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{ user.fullName }}</li>
  </ul>
</template>
