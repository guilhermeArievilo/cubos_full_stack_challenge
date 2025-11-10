import { create } from 'zustand'

export type AuthStoreDatasource = {
  accessToken: string,
  isAuthenticated: boolean,
  setAccessToken: (value: string) => void,
  clearAccessToken: () => void
}

export const useAuthStore = create<AuthStoreDatasource>((set) => ({
  accessToken: '',
  isAuthenticated: false,
  setAccessToken: (value: string) => set(() => ({
    isAuthenticated: true,
    accessToken: value
  })),
  clearAccessToken: () => set(() => ({
    isAuthenticated: false,
    accessToken: ''
  }))
}));