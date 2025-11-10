'use client'

import { useContainer } from "@/core/di/ContainerContext";
import { useEffect, useState } from "react";
import { Movie, MovieProps } from "../../../domain/entities/movie";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AttributesMovie from "../../components/attributes-movie";
import VoteAveragePerCentChart from "../../components/vote-average-per-cent-chart";
import { Language } from "../../../domain/entities/language";
import { RatingData } from "../../../domain/entities/rating";
import { formatDateToDDMMYYYY, formatMinutesToHHMMSS, formatMinutesToReadable, formatNumber } from "@/lib/utils";
import { movieStatus } from "../../../domain/entities/movieStatus";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AlertDeleteMovieDialog from "../../dialogs/alert-delete-movie/alert-delete-movie-dialog";
import EditMovieDrawer from "../../drawers/edit-movie/edit-movie-drawer";
import { Genre } from "../../../domain/entities/genre";
import AddGenreDialog from "../../dialogs/add-genre/add-genre-dialog";
import dayjs from "dayjs";

export default function MovieDetailPage({ slug }: { slug: string }) {
  const router = useRouter();
  const [deleteMovieTrigger, setDeleteMovieTrigger] = useState<boolean>(false);
  const [openEditDrawer, setEditDrawer] = useState<boolean>(false);
  const [triggerAddGenrePopover, setTriggerAddGenrePopover] = useState<boolean>(false)
  
  const { movieModule } = useContainer();
  
  const [genres, setGenres] = useState<Genre[]>([])
  const [atualCreatedGenre, setCreatedGenre] = useState<Genre | null>(null)
  const [movie, setMovie] = useState<Movie | null>(null);
  const [languages, setLanguages] = useState<Language[]>([])
  const [ratings, setRatings] = useState<RatingData[]>([])

  async function handleDeleteMovie() {
    if (!movie) return;
    try {
      toast.error("Deletando filme...");
      await movieModule.deleteMovie.execute(movie.id);
      toast.success("Filme deletado com sucesso.");
      router.replace('/home');
    } catch {
      toast.error("Ops, algo deu errado ao deletar o filme.");
    }
  }
  

  async function createGenre(name: string) {
    const genre = await movieModule.createGenre.execute(name);
    setCreatedGenre(genre);
    setTriggerAddGenrePopover(false);
    await fetchGenres();
  }

  async function editMovie(data: Partial<MovieProps>) {
    if (!movie) return;
    try {
      toast.error("Atualizando filme...");
      await movieModule.updateMovie.execute(movie.id, data);
      toast.success("Filme atualizado com sucesso.");
      await fetchMovieBySlug();
    } catch {
      toast.error("Ops, algo deu errado ao atualizar o filme.");
    } finally {
      setEditDrawer(false);
    }
  }
  
  async function fetchLanguages() {
    const data = await movieModule.listLanguages.execute();
    setLanguages(data);
  }

  async function fetchRatings() {
    const data = await movieModule.listRatings.execute();
    setRatings(data);
  }

  async function fetchMovieBySlug() {
    const movie = await movieModule.getMovieBySlug.execute(slug);
    setMovie(movie);
  }

  async function fetchGenres() {
    const data = await movieModule.listGenres.execute();
    setGenres(data);
  }

  useEffect(() => {
    fetchGenres();
    fetchMovieBySlug();
    fetchLanguages();
    fetchRatings();
  }, [slug])

  if (!movie) {
    return <div className="flex flex-col justify-center items-center">Carregando...</div>
  }

  return (
    <>
      <section className="relative container mx-auto grid grid-cols-12 gap-4 m-6 bg-surface-container/30 p-6 rounded-xs overflow-clip">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image src={`/images/${movie.backdropPath}`} alt={movie.title} width={1920} height={1080} className="w-full h-full object-cover opacity-30"/>
        </div>

        <div className="col-span-3 flex flex-col gap-4 z-10">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-semibold">{movie.title}</h1>
            <h2 className="text-lg font-light">Título original: {movie.originalTitle}</h2>
          </div>

          <div className="w-full aspect-2/3">
            <Image src={`/images/${movie.posterPath}`} alt={movie.title} width={400} height={600} className="w-full h-full object-cover rounded-xs"/>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4 py-8 justify-end z-10">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-lg italic font-light p-4">{movie.tagline}</h3>
          </div>

          <AttributesMovie label="Sinopse" labelSize="lg">
            <p>{movie.synopsis}</p>
          </AttributesMovie>

          <AttributesMovie label="Gêneros" labelSize="sm" fit>
            <div className="flex gap-2">
              {
                movie.genres.map((genre) => {
                  if (typeof genre === 'string') return (<></>);

                  return (
                    <Button key={genre.id} variant="default" size="sm">{genre.name}</Button>
                  )
                })
              }
            </div>
          </AttributesMovie>
        </div>

        <div className="col-span-6 flex flex-col gap-4 py-8 z-10">
          <div className="flex justify-end items-center gap-4">
            <Button variant="secondary" onClick={() => setDeleteMovieTrigger(true)}>Deletar</Button>
            <Button onClick={() => setEditDrawer(true)}>Editar</Button>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 flex gap-6 items-center">
              <div className="flex-1">
                <AttributesMovie label="Classificação indicativa" labelSize="sm">
                  <span>{ ratings.length ? ratings.find((curr) => curr.value === movie.rating)?.label : 'Carregando...' }</span>
                </AttributesMovie>
              </div>
              <div className="">
                <AttributesMovie label="Votos" labelSize="sm">
                  <span>{movie.voteCount}</span>
                </AttributesMovie>
              </div>
              <VoteAveragePerCentChart voteAverage={movie.voteAverage ?? 0}/>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Lançamento" labelSize="sm">
                <span>{formatDateToDDMMYYYY(movie.releaseDate.toString())}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Duração" labelSize="sm">
                <span>{formatMinutesToReadable(movie.duration)}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Situação" labelSize="sm">
                <span>{movieStatus.find((curr) => curr.value === movie.status)?.label ?? 'Desconhecido'}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Idioma" labelSize="sm">
                <span>{ languages.length ? (languages.find((curr) => curr.value === movie.originalLanguage))?.label : 'Carregando...' }</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Orçamento" labelSize="sm">
                <span>{movie.budget ? formatNumber(movie.budget) : '--'}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Receita" labelSize="sm">
                <span>{movie.revenue ? formatNumber(movie.revenue) : '--'}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Lucro" labelSize="sm">
                <span>{movie.profit ? formatNumber(movie.profit) : '--'}</span>
              </AttributesMovie>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid grid-cols-12 gap-4 mb-6 p-6">
        <span className="col-span-12 font-semibold text-2xl">Trailer</span>
        <div className="col-span-12 aspect-video bg-surface-container-highest/20 flex items-center justify-center rounded-xs overflow-clip">
         <iframe
          className="w-full h-full"
          width={1280}
          height={720}
          src={movie.trailerLink}
          title={`Trailer do filme ${movie.title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        </div>
      </section>

      <AlertDeleteMovieDialog
        open={deleteMovieTrigger}
        onClose={() => setDeleteMovieTrigger(false)}
        onConfirm={handleDeleteMovie}
        title={movie.title}
      />
      <EditMovieDrawer
        values={{
          ...movie,
          genres: movie.genres
            .filter((val): val is Genre => typeof val !== "string")
            .map(val => val.id),
          duration: formatMinutesToHHMMSS(movie.duration),
          releaseDate: dayjs(movie.releaseDate).toString()
        }}
        open={openEditDrawer}
        onOpenChange={(status) => setEditDrawer(status)}
        genreDataOptions={genres}
        onCreateGenre={() => setTriggerAddGenrePopover(true)}
        ratingsDataOptions={ratings}
        languageDataOptions={languages}
        onSubmitMovie={editMovie}
      />
      <AddGenreDialog
        open={triggerAddGenrePopover}
        onOpenChange={setTriggerAddGenrePopover}
        handleCreateGenre={createGenre}
      />
    </>
  )
}