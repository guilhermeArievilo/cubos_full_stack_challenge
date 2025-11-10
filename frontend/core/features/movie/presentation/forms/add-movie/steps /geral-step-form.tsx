'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Genre } from "@/core/features/movie/domain/entities/genre";
import { Language } from "@/core/features/movie/domain/entities/language";
import { movieStatus, MovieStatus } from "@/core/features/movie/domain/entities/movieStatus";
import { Rating, RatingData } from "@/core/features/movie/domain/entities/rating";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { useAddMovieFormWizard } from "../wizard/add-movie-form-wizard-context";

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
  
export const RatingSchema = z
  .string()
  .refine(
    (val): val is `${Rating}` =>
      Object.values(Rating).includes(val as Rating),
    { message: "Classificação indicativa inválida" }
  )

export const geralFormSchema = z.object({
  title: z.string().min(1, 'É necessário um título.'),
  originalTitle: z.string().min(1, 'É necessário um título.'),
  tagline: z.string().min(1, 'É necessário um slogan.'),
  synopsis: z.string().min(1, 'É necessário uma sinopse.'),
  genres: z
    .array(genreId)
    .min(1, 'Selecione ou adicione pelo menos um gênero ao filme.')
    .refine((ids) => new Set(ids).size === ids.length, { message: 'Gêneros duplicados não são permitidos' }),
  duration: z
    .string()
    .min(1, "Informe a duração do filme")
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato inválido (use HH:MM ou HH:MM:SS)."),
  status: MovieStatusSchema,
  originalLanguage: z.string().min(1, 'Selecione uma linguagem'),
  rating: RatingSchema,
  releaseDate: z
    .string()
    .min(1, "Informe a data de lançamento.")
})

export type GeralFormSchemaType = z.infer<typeof geralFormSchema>

interface GeralStepFormProps {
  values?: GeralFormSchemaType;
  onFormReady?: (method: UseFormReturn<GeralFormSchemaType>) => void;
  genres?: Genre[];
  ratings?: RatingData[];
  createdGenres?: Genre[];
  languages?: Language[];
  onCreateGenre: () => void
}

export default function GeralStepForm({
  values,
  onFormReady,
  genres,
  ratings,
  createdGenres,
  languages,
  onCreateGenre
}: GeralStepFormProps) {
  const { resetTrigger } = useAddMovieFormWizard();
  const form = useForm<GeralFormSchemaType>({
    resolver: zodResolver(geralFormSchema),
    defaultValues: values || {
      title: "",
      originalTitle: "",
      tagline: "",
      synopsis: "",
      duration: "",
      genres: [],
      rating: "",
      status: "",
      originalLanguage: "",
      releaseDate: ""
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

  function selectOption(value: string[]): Option[] | undefined {
    return genreToOption().filter(currOption => {
      return value.find(currValue => currOption.value === currValue);
    })
  }

  useEffect(() => {
    if (createdGenres?.length) {
      const value = [...form.getValues('genres'), ...createdGenres.map(genre => genre.id)];
      form.setValue('genres', [...new Set(value)]);
    }
  }, [createdGenres])

  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady])

  useEffect(() => {
    form.reset();
  }, [resetTrigger])
  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
        <span className="col-span-2 text-xl font-semibold">Dados gerais do filme</span>
        
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
                    { ...field }
                    placeholder="Selecione os gêneros do filme"
                    value={selectOption(field.value)}
                    onChange={(currOptions) => field.onChange(currOptions.map((value) => value.value))}
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
          name="rating"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-col">
              <FormLabel>Classificação indicativa</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a classificação indicativa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        ratings?.map(({ value, label }) => (
                          <SelectItem value={value} key={value}>{label}</SelectItem>
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
          name="duration"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Duração</FormLabel>
              <FormControl>
                <Input
                  className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  type="time"
                  step={1}
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
            <FormItem className="col-span-1 flex flex-col">
              <FormLabel>Situação</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        movieStatus.map(({ value, label }) => (
                          <SelectItem value={value} key={value}>{label}</SelectItem>
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
            <FormItem className="col-span-1 flex flex-col">
              <FormLabel>Linguagem original</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full h-10!">
                    <SelectValue placeholder="Selecione a linguagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {
                        languages?.map(({ value, label }) => (
                          <SelectItem value={value} key={value}>{label}</SelectItem>
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
          name="releaseDate"
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