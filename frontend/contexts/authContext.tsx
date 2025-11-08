'use client'
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import useContainer from '@/core/di/container'
import { toast } from 'sonner';
import { LoginDTO } from '@/core/features/auth/domain/entities/authEntities';


type AuthStatus = 'authenticating' | 'authenticated' | 'unauthenticated';

interface AuthContextProps {
  login: (credentials: LoginDTO) => Promise<void>
  logout: () => Promise<void>,
  status: AuthStatus,
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const [isAuthenticated, setAuth] = useState(false);
  const router = useRouter();
  const { authModule } = useContainer()

  useEffect(() => {
    if (!isAuthenticated) {
      try {
        setStatus('authenticating');
        authModule.refreshUseCase.execute()
        setStatus('authenticated');
      } catch {
        setStatus('unauthenticated');
        router.replace('/');
      }
    } else {
      setStatus('unauthenticated');
    }
  }, [router]);

  async function login(credentials: LoginDTO) {
    try {
      setStatus('authenticating');
      await authModule.loginUseCase.execute(credentials);
      router.replace('/home');
      setStatus('authenticated');
    } catch (e: any) {
      toast.error(e.message ?? "Ops, algo deu errado");
      setStatus('unauthenticated');
    }
  }

  async function logout() {
    try {
      await authModule.logoutUseCase.execute();
      setStatus('unauthenticated');
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [status])
  return (
    <AuthContext.Provider value={{
      login,
      logout,
      isAuthenticated,
      status
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth should be use inside of the AuthProvider.")
  }

  return context;
}