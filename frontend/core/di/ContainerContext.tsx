'use client'
import { createContext, useContext, useMemo } from "react";
import { useAuthStore } from "../features/auth/data/datasource/authStoreDatasource";
import { AppContainer, createContainer } from "./container";
import { useUserStore } from "../features/user/data/datasource/userStoreDatasource";

const ContainerContext = createContext<AppContainer | null>(null);

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  const container = useMemo(
    () => createContainer({ authStore, userStore }),
    [authStore],
  )

  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
}

export function useContainer() {
  const ctx = useContext(ContainerContext);
  if (!ctx) throw new Error('useContainer must be used within ContainerProvider');
  return ctx
}