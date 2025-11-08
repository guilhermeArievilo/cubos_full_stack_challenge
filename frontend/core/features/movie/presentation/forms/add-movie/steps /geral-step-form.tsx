'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Genre } from "@/core/features/movie/domain/entities/genre";
import { movieStatus, MovieStatus } from "@/core/features/movie/domain/entities/movieStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

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
  duration: z
    .number("A duração do filme deve ser um número.")
    .positive('A duração do filme deve ser um valor positivo.'),
  status: MovieStatusSchema,
  originalLanguage: z.string().min(1, 'Selecione uma linguagem'),
  releaseDate: z.date()
})

export type GeralFormSchemaType = z.infer<typeof formSchema>

interface GeralStepFormProps {
  values?: GeralFormSchemaType;
  onFormReady?: (method: UseFormReturn<GeralFormSchemaType>) => void;
  genres?: Genre[];
  onCreateGenre: () => void
}

export default function GeralStepForm({
  values,
  onFormReady,
  genres,
  onCreateGenre
}: GeralStepFormProps) {
  const form = useForm<GeralFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      title: "",
      originalTitle: "",
      tagline: "",
      synopsis: ""
    },
  });
  
  function genreToOption(): Option[] {
    if (!genres?.length) {
      return [];
    }

    return genres.map(genre => ({
      value: genre.id,
      label: genre.name
    }))
  }

  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady])

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
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

        <div className="col-span-2 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gêneros</FormLabel>
                <FormControl>
                  <MultipleSelector
                    placeholder="Selecione os gêneros do filme"
                    commandProps={{
                      label: "Select frameworks",
                    }}
                    defaultOptions={genreToOption()}
                    hideClearAllButton
                    hidePlaceholderWhenSelected
                    emptyIndicator={<p className="text-center text-sm">Ainda não há gêneros adicionados, adicione o primeiro!</p>}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />

          <Button variant={"secondary"} type="button" onClick={onCreateGenre}>Adicionar Gênero</Button>
        </div>

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Duração</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Duração do filmes em minutos"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Situação</FormLabel>
              <FormControl>
                <Select { ...field }>
                  <SelectTrigger className="w-full h-10!">
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Situações</SelectLabel>
                      {
                        movieStatus.map(({ value, label }) => (
                          <SelectItem value={value}>{label}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalLanguage"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Linguagem original</FormLabel>
              <FormControl>
                <Input
                  placeholder="Linguagem original"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="originalLanguage"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Data de lançamento</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Data de lançamento"
                  {...field}
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