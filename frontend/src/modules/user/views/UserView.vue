<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useGetUserById } from '@/modules/user/composables/useUserQuery'

const route = useRoute()
const { data: user } = useGetUserById(route.params.id as string)
</script>

<template>
  <ul v-if="user">
    <li>{{ user.fullName }}</li>
  </ul>
</template>
