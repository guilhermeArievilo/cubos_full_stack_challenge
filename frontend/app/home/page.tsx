'use client'
import Component from "@/components/comp-461";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import SearchForm from "@/core/features/movie/presentation/components/searchForm";
import AddMovieFilterDialog from "@/core/features/movie/presentation/dialogs/add-filter/add-movie-fliter-dialog";
import AddMovieDrawer from "@/core/features/movie/presentation/drawers/add-movie/add-movie-drawer";
import { useState } from "react";
export default function ForgotPasswordPage() {
  const [triggerAddMovieDrawer, setTriggerAddMovieDrawer] = useState<boolean>(false)
  const [triggerAddMovieFliterDialog, setTriggerAddMovieFliterDialog] = useState<boolean>(false)
  return (
    <main className="grow flex flex-col">
      <section className="flex justify-end items-center gap-3 p-6">
        <SearchForm handleSearch={() => console.log("buscando...")} />
        <Button variant={'secondary'} onClick={() => setTriggerAddMovieFliterDialog(true)}>Filtros</Button>
        <Button onClick={() => setTriggerAddMovieDrawer(true)}>Adicionar Filme</Button>
      </section>

      <section className="flex-1 grid grid-cols-10 gap-6 bg-surface-container-highest/20 p-6 mx-6">
        <span className="col-span-10 flex items-center justify-center text-on-surface-variant/40">Nenhum filme por enquanto...</span>
      </section>

      <section className="p-6 flex justify-center gap-4">
        <Component currentPage={1} totalPages={5}/>
      </section>
      <AddMovieDrawer open={triggerAddMovieDrawer} onOpenChange={setTriggerAddMovieDrawer} />
      <AddMovieFilterDialog open={triggerAddMovieFliterDialog} onOpenChange={setTriggerAddMovieFliterDialog}/>
    </main>
  )
}