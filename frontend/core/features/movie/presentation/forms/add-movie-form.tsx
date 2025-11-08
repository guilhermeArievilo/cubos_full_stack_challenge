import z from "zod"
import { movieStatus, MovieStatus } from "../../domain/entities/movieStatus";
import { MovieProps } from "../../domain/entities/movie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector from "@/components/ui/multiselect";

const genreId = z.string();

export const MovieStatusSchema = z
  .string()
  .refine(
    (val): val is `${MovieStatus}` =>
      Object.values(MovieStatus).includes(val as MovieStatus),
    { message: "Status inválido" }
  )
  .refine(
    (val) => movieStatus.some((s) => s.value === val),
    { message: "Status inválido (fora da lista de status permitidos)" }
  );

const formSchema = z.object({
  title: z.string().min(1, 'É necessário um título.'),
  originalTitle: z.string().min(1, 'É necessário um título.'),
  tagline: z.string().min(1, 'É necessário um slogan.'),
  synopsis: z.string().min(1, 'É necessário uma sinopse.'),
  genres: z
    .array(genreId)
    .min(1, 'Selecione ou adicione pelo menos um gênero ao filme.')
    .refine((ids) => new Set(ids).size === ids.length, { message: 'Gêneros duplicados não são permitidos' }),
  backdropPath: z.string().min(1, 'Adicione uma foto de fundo.'),
  posterPath: z.string().min(1, 'Adicione uma poster'),
  rating: z
    .number("A classificação deve ser um número.")
    .int({ message: "A classificação deve ser um número inteiro." })
    .gte(0, { message: "A classificação mínima é 0." })
    .lte(18, { message: "A classificação máxima é 18." }),
  voteCount: z
    .number("A quantidade de votos deve ser um número.")
    .int({ message: "A quantidade de votos deve ser um número inteiro" })
    .positive('A quantidade de votos deve ser positivo'),
  voteAverage: z
    .number("A média de votos deve ser um número.")
    .positive('A média de votos devem ser positivo.'),
  duration: z
    .number("A duração do filme deve ser um número.")
    .positive('A duração do filme deve ser um valor positivo.'),
  status: MovieStatusSchema,
  budget: z
    .number("O orçamento deve ser um número.")
    .positive('O orçamento deve ser um valor positivo.'),
  revenue: z
    .number("A receita deve ser um número.")
    .positive('A receita deve ser um valor positivo.'),
  originalLanguage: z.string().min(1, 'Selecione uma linguagem'),
  trailerLink: z.string().min(1, 'Adicione um link do trailer do filme.'),
  releaseDate: z.date()
})

type FormSchemaType = z.infer<typeof formSchema>

interface SearchFormProps {
  handleSubmit: (values: MovieProps) => void;
}

export default function AddMovieForm({ handleSubmit }: SearchFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema)
  });
  
  function onSubmit(data: FormSchemaType) {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o título do filme"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalTitle"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Título Original</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o título original do filme"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Slogan</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite um slogan para o filme"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Sinopse do filme</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Digite a sinopse do filme"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genres"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Gêneros</FormLabel>
              <FormControl>
                <MultipleSelector
                  placeholder="Selecione os gêneros do filme"
                  commandProps={{
                    label: "Select frameworks",
                  }}
                  hideClearAllButton
                  hidePlaceholderWhenSelected
                  emptyIndicator={<p className="text-center text-sm">Ainda não há gêneros adicionados, adicione o primeiro!</p>}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
} 