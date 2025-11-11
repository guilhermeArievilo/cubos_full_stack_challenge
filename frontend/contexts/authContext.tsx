'use client'
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { LoginDTO, RegisterDTO } from '@/core/features/auth/domain/entities/authEntities';
import { useContainer } from '@/core/di/ContainerContext';
import { useAuthStore } from '@/core/features/auth/data/datasource/authStoreDatasource';
import { usePathname } from 'next/navigation';

interface AuthContextProps {
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (params: RegisterDTO) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AUTHENTICATED_ROUTES = ["/movies"];
const RESTRICTED_WHEN_AUTH = ["/auth/login", "/auth/sign-up", "/auth/forgot-password"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const { authModule } = useContainer();

  async function signUp(params: RegisterDTO) {
    try {
      await authModule.registerUseCase.execute(params);
      router.replace("/movies");
    } catch (e: any) {
      toast.error(e.message ?? "Ops, algo deu errado");
    }
  }

  async function login(credentials: LoginDTO) {
    try {
      await authModule.loginUseCase.execute(credentials);
      router.replace("/movies");
    } catch (e: any) {
      toast.error(e.message ?? "Ops, algo deu errado");
    }
  }

  async function logout() {
    try {
      await authModule.logoutUseCase.execute();
      router.replace("/auth/login");
    } catch (e) {
      console.error(e);
    }
  }

  function isAuthenticatedRoute(path: string) {
    return AUTHENTICATED_ROUTES.some((base) => path === base || path.startsWith(`${base}/`));
  }

  function isRestrictedWhenAuthenticated(path: string) {
    return RESTRICTED_WHEN_AUTH.includes(path);
  }

  useEffect(() => {
    if (!pathname) return;

    if (isAuthenticated && isRestrictedWhenAuthenticated(pathname)) {
      router.replace("/movies");
      return;
    }

    if (!isAuthenticated) {
      authModule.refreshUseCase.execute();
      return;
    }
  }, [isAuthenticated, pathname]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be use inside of the AuthProvider.")
  }

  return context;
}