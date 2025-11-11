'use client'
import { RegisterDTO } from "../../domain/entities/authEntities";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useContainer } from "@/core/di/ContainerContext";

export default function useSignUpViewModel() {
  const [status, setStatus] = useState<'sending' | 'success' | 'error'>();
  const { authModule } = useContainer()
  const router = useRouter();
  

  async function handleSignUp(data: RegisterDTO) {
    try {
      setStatus('sending');
      await authModule.registerUseCase.execute(data);
      setStatus('success');
      router.push('/movies')
    } catch (e: any) {
      toast.error(e.message ?? "Ops, algo deu errado, tente de novo!");
    }
  }

  return {
    status,
    handleSignUp
  }
}