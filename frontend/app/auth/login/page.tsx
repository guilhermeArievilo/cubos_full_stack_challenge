'use client'
import LoginForm from "@/components/forms/login/login-form";
import { useAuth } from "@/contexts/authContext";

export default function Home() {
  const { login } = useAuth()
  return (
    <main className="grow container sm:mx-auto px-6 flex flex-col items-center justify-center">
      <LoginForm handleLogin={login} />
    </main>
  );
}
