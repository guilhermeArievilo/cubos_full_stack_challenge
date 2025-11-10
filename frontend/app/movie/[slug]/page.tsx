import MovieDetailPage from "@/core/features/movie/presentation/pages/movie-detail/movie-detail-page"


export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return (
    <main className="grow flex flex-col gap-6">
      <MovieDetailPage slug={slug}/>
    </main>
  )
}