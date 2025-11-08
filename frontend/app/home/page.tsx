'use client'
import { Button } from "@/components/ui/button";
import SearchForm from "@/core/features/movie/presentation/components/searchForm";
import { Search } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <main className="grow flex flex-col">
      <section className="flex justify-end items-center gap-3 p-6">
        <SearchForm handleSearch={() => console.log("buscando...")} />
        <Button variant={'secondary'}>Filtros</Button>
        <Button>Adicionar Filme</Button>
      </section>

      <section className="flex-1 grid grid-cols-10 gap-6 bg-surface-container-highest/20 p-6 mx-6">
        <span className="col-span-10 flex items-center justify-center text-on-surface-variant/40">Nenhum filme por enquanto...</span>
      </section>

      <section className="p-6 flex justify-center gap-4">
        <span>Paginação</span>
      </section>
    </main>
  )
}