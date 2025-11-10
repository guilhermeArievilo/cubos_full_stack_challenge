import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

export type VoteAveragePerCentChartProps = {
  voteAverage: number;
}

export default function VoteAveragePerCentChart({ voteAverage }: VoteAveragePerCentChartProps) {
  const voteAveragePerCent = (voteAverage/10) * 100;
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
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px] w-fit"
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
          className="first:fill-muted last:fill-background fill-surface-container-lowest/80!"
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
  )
}