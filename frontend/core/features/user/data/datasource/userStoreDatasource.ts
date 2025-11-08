import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '../../domain/entity/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function setUser(user: User) {
    user = user
  }

  return { user, setUser }
})

export type UserStoreDatasource = ReturnType<typeof useUserStore>
