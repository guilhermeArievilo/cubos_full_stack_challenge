import { create } from 'zustand'

export type AuthStoreDatasource = {
  accessToken: string,
  setAccessToken: (value: string) => void,
  clearAcessToken: () => void
}

export const useAuthStore = create<AuthStoreDatasource>((set) => ({
  accessToken: '',
  setAccessToken: (value: string) => set(() => ({
    accessToken: value
  })),
  clearAcessToken: () => set(() => ({
    accessToken: ''
  }))
}));