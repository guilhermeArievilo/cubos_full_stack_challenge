'use client'

import { useContainer } from "@/core/di/ContainerContext";
import { useEffect, useState } from "react";
import { Movie } from "../../../domain/entities/movie";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AttributesMovie from "../../components/attributes-movie";
import VoteAveragePerCentChart from "../../components/vote-average-per-cent-chart";

export default function MovieDetailPage({ slug }: { slug: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieModule } = useContainer();

  async function fetchMovieBySlug() {
    const movie = await movieModule.getMovieBySlug.execute(slug);
    setMovie(movie);
  }

  useEffect(() => {
    fetchMovieBySlug();
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
            <Button variant="secondary" >Deletar</Button>
            <Button>Editar</Button>
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 flex gap-6 items-center">
              <div className="flex-1">
                <AttributesMovie label="Classificação indicativa" labelSize="sm">
                  <span>{movie.rating}</span>
                </AttributesMovie>
              </div>
              <div className="">
                <AttributesMovie label="Votos" labelSize="sm">
                  <span>{movie.voteCount}</span>
                </AttributesMovie>
              </div>
              <VoteAveragePerCentChart voteAverage={movie.voteAverage}/>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Lançamento" labelSize="sm">
                <span>{movie.releaseDate.toString()}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Duração" labelSize="sm">
                <span>{movie.duration}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Situação" labelSize="sm">
                <span>{movie.releaseDate.toString()}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-6">
              <AttributesMovie label="Idioma" labelSize="sm">
                <span>{movie.originalLanguage}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Orçamento" labelSize="sm">
                <span>{movie.duration}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Receita" labelSize="sm">
                <span>{movie.releaseDate.toString()}</span>
              </AttributesMovie>
            </div>

            <div className="col-span-4">
              <AttributesMovie label="Lucro" labelSize="sm">
                <span>{movie.originalLanguage}</span>
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
    </>
  )
}