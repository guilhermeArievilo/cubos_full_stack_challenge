'use client'
import { Button } from "@/components/ui/button";
import SearchForm from "@/core/features/movie/presentation/components/searchForm";
import AddGenreDialog from "@/core/features/movie/presentation/dialogs/add-genre/add-genre-dialog";
import AddMovieFilterDialog from "@/core/features/movie/presentation/dialogs/add-filter/add-movie-fliter-dialog";
import AddMovieDrawer from "@/core/features/movie/presentation/drawers/add-movie/add-movie-drawer";
import { useEffect, useState } from "react";
import { Genre } from "@/core/features/movie/domain/entities/genre";
import useContainer from "@/core/di/container";
import { Language } from "@/core/features/movie/domain/entities/language";
import { ContentType } from "@/core/features/upload/domain/entities/contentType";
import { toast } from "sonner";
import { MovieCard, MovieProps } from "@/core/features/movie/domain/entities/movie";
import { MovieWizardData } from "@/core/features/movie/presentation/forms/add-movie/wizard/add-movie-form-wizard-context";
import { Rating, RatingData } from "@/core/features/movie/domain/entities/rating";
import { timeStringToMinutes } from "@/lib/utils";
import { MovieStatus } from "@/core/features/movie/domain/entities/movieStatus";
import { PaginatedDataResponseDto } from "@/core/features/movie/domain/repository/movieRepository";

export default function HomePage() {
  const [triggerAddMovieDrawer, setTriggerAddMovieDrawer] = useState<boolean>(false)
  const [triggerAddMovieFliterDialog, setTriggerAddMovieFliterDialog] = useState<boolean>(false)
  const [triggerAddGenrePopover, setTriggerAddGenrePopover] = useState<boolean>(false)

  const { movieModule, uploadModule } = useContainer()

  const [genres, setGenres] = useState<Genre[]>([])
  const [atualCreatedGenre, setCreatedGenre] = useState<Genre | null>(null)
  const [languages, setLanguages] = useState<Language[]>([])
  const [ratings, setRatings] = useState<RatingData[]>([])

  const [moviePaginatedData, setMoviePaginatedData] = useState<PaginatedDataResponseDto<MovieCard> | null>(null)

  async function uploadFile(fileName: string, contentType: ContentType, file: File) {
    try {
      toast.info("Fazendo upload...");
      const res = await uploadModule.upload.execute(fileName, contentType, file);
      toast.success("Upload realizado com sucesso.");
      return res
    } catch {
      toast.error("Ops, algo deu errado aqui, tente de novo.");
      return null;
    }
  }

  async function createMovie(data: MovieWizardData): Promise<'success' | 'fail'> {
    try {
      toast.info("Cadastrando filme...");
      await movieModule.addMovie.execute({
        ...data,
        rating: Rating[data.rating as keyof typeof Rating],
        duration: timeStringToMinutes(data.duration),
        status: MovieStatus[data.status as keyof typeof MovieStatus],
        releaseDate: new Date(data.releaseDate)
      });
      toast.success(`${data.title} foi cadastrado.`)
      setTriggerAddMovieDrawer(false);
      return 'success';
    } catch {
      toast.error("Ops, algo deu errado aqui, tente de novo.");
      return 'fail';
    }
  }

  async function createGenre(name: string) {
    const genre = await movieModule.createGenre.execute(name);
    setCreatedGenre(genre);
    setTriggerAddGenrePopover(false);
    await fetchGenres();
  }

  async function fetchMovies() {
    const moviePaginatedDataRes = await movieModule.listMovies.execute({
      limit: 10,
      page: 1,
      orderBy: 'title',
      order: 'asc',
    })

    setMoviePaginatedData(moviePaginatedDataRes);
  }

  async function fetchGenres() {
    const data = await movieModule.listGenres.execute();
    setGenres(data);
  }

  async function fetchLanguages() {
    const data = await movieModule.listLanguages.execute();
    setLanguages(data);
  }

  async function fetchRatings() {
    const data = await movieModule.listRatings.execute();
    setRatings(data);
  }

  useEffect(() => {
    fetchMovies();
    fetchGenres();
    fetchLanguages();
    fetchRatings();
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
      
      <AddMovieDrawer
        open={triggerAddMovieDrawer}
        onOpenChange={setTriggerAddMovieDrawer}
        onCreateGenre={() => setTriggerAddGenrePopover(true)}
        onUploadFile={uploadFile}
        onSubmitMovie={createMovie}
        genreDataOptions={genres}
        ratingsDataOptions={ratings}
        createdGenres={atualCreatedGenre ? [atualCreatedGenre] : []}
        languageDataOptions={languages}
        onClose={() => setCreatedGenre(null)}
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