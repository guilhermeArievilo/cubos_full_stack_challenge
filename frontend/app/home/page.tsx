'use client'
import Component from "@/components/comp-461";
import { Button } from "@/components/ui/button";
import SearchForm from "@/core/features/movie/presentation/components/searchForm";
import AddGenreDialog from "@/core/features/movie/presentation/dialogs/add-genre/add-genre-dialog";
import AddMovieFilterDialog from "@/core/features/movie/presentation/dialogs/add-filter/add-movie-fliter-dialog";
import AddMovieDrawer from "@/core/features/movie/presentation/drawers/add-movie/add-movie-drawer";
import { useEffect, useState } from "react";
import { Genre } from "@/core/features/movie/domain/entities/genre";
import useContainer from "@/core/di/container";

export default function HomePage() {
  const [triggerAddMovieDrawer, setTriggerAddMovieDrawer] = useState<boolean>(false)
  const [triggerAddMovieFliterDialog, setTriggerAddMovieFliterDialog] = useState<boolean>(false)
  const [triggerAddGenrePopover, setTriggerAddGenrePopover] = useState<boolean>(false)

  const { movieModule } = useContainer()

  const [genres, setGenres] = useState<Genre[]>([])

  async function createGenre(name: string) {
    await movieModule.createGenre.execute(name);
    setTriggerAddGenrePopover(false);
    await fetchGenres();
  }

  async function fetchGenres() {
    const data = await movieModule.listGenres.execute();
    setGenres(data);
  }

  useEffect(() => {
    fetchGenres();
  }, [])
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
      <AddMovieDrawer
        open={triggerAddMovieDrawer}
        onOpenChange={setTriggerAddMovieDrawer}
        onCreateGenre={() => setTriggerAddGenrePopover(true)}
        genreDataOptions={genres}
      />
      <AddMovieFilterDialog open={triggerAddMovieFliterDialog} onOpenChange={setTriggerAddMovieFliterDialog}/>
      <AddGenreDialog
        open={triggerAddGenrePopover}
        onOpenChange={setTriggerAddGenrePopover}
        handleCreateGenre={createGenre}
      />
    </main>
  )
}