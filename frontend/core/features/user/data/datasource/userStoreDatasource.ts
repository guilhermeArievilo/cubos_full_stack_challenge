import { create } from "zustand"
import { User } from "../../domain/entity/user"

export type UserStoreDatasource = {
  user: User | null,
  setUser: (user: User) => void,
  clearUserData: () => void
}


export const useUserStore = create<UserStoreDatasource>((set) => ({
  user: null,
  setUser: (user: User) => set(() => ({
    user
  })),
  clearUserData: () => set(() => ({
    user: null
  }))
}))