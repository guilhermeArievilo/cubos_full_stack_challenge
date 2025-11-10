import { MovieCard as Movie } from "../../domain/entities/movie"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import Image from "next/image"

export type MovieCardProps = {
  movie: Movie,
  onClick?: () => void
}

export default function CMovieCard({ movie, onClick }: MovieCardProps) {
  const voteAveragePerCent = movie.voteAverage ? (movie.voteAverage/10) * 100 : 0;
  const chartData = [
    { browser: "safari", voteAverage: voteAveragePerCent, fill: "var(--color-safari)" },
  ]

  const chartConfig = {
    voteAverage: {
      label: "Média de votos",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig

  return (
    <div className="text-inverse-on-surface dark:text-on-surface movie-card relative aspect-2/3 movie-card w-full bg-surface-container rounded-xs overflow-clip flex flex-col justify-between p-2 sm:p-6 cursor-pointer" onClick={onClick}>
      <div className="backdrop"/>
      <div className="absolute top-0 left-0 w-full h-full">
        <Image src={`/images/${movie.posterPath}`} alt={movie.title} width={355} height={235} className="w-full h-full object-cover"/>
      </div>
      
      <div className="vote-average flex-1 flex flex-col items-center justify-center gap-6 z-10! shrink">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] w-full"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={(voteAveragePerCent * 360)/100}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted fill-inverse-surface/70! dark:last:fill-background dark:fill-surface-container-lowest/80!"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="voteAverage" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-chart-3 text-4xl font-bold"
                        >
                          {chartData[0].voteAverage.toLocaleString() + '%'}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
      <article className="info flex flex-col gap-2 z-10">
        <h3 className="text-xs sm:text-md md:text-lg 2xl:text-2xl uppercase">{movie.title}</h3>
        <span className="genres text-xs sm:text-md">
          { movie.genres.reduce((prevGen, currGen) => prevGen + (prevGen ? ', ' : '') + currGen.name,'') }
        </span>
      </article>
    </div>
  )
}