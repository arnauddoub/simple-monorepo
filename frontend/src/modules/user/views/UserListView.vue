<script setup lang="ts">
import useUserQuery from '@/modules/user/composables/useUserQuery'

const { useGetUsers } = useUserQuery()
const users = useGetUsers()
</script>

<template>
  <ul>
    <li v-for="user in users.data.value" :key="user.id">{{ user.fullName }}</li>
  </ul>
</template>
