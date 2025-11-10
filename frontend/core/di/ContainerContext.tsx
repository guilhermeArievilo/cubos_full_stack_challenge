'use client'
import { createContext, useContext, useMemo } from "react";
import { useAuthStore } from "../features/auth/data/datasource/authStoreDatasource";
import { AppContainer, createContainer } from "./container";

const ContainerContext = createContext<AppContainer | null>(null);

export function ContainerProvider({ children }: { children: React.ReactNode }) {
  const authStore = useAuthStore()

  const container = useMemo(
    () => createContainer({ authStore }),
    [authStore],
  )

  return <ContainerContext.Provider value={container}>{children}</ContainerContext.Provider>
}

export function useContainer() {
  const ctx = useContext(ContainerContext);
  if (!ctx) throw new Error('useContainer must be used within ContainerProvider');
  return ctx
}