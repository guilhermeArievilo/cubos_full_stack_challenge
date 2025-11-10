import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InterludePage() {
  return (
    <main className="grow flex flex-col gap-6">
      <section className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-8xl font-bold">Cubos Movies</h1>
          <h3 className="text-on-surface-variant text-lg">Base de dados de filmes \o/</h3>
        </div>

        <div className="flex items-center justify-center gap-8">
          <Button asChild size={"lg"}>
            <Link href={'/auth/login'}>Entrar</Link>
          </Button>
          <Button asChild size={"lg"} variant={'secondary'}>
            <Link href={'/auth/login'}>Criar conta</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}