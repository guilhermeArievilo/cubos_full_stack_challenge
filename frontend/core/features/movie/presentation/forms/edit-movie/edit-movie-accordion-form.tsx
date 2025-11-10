import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";
import { DollarSignIcon } from "lucide-react";
import { Genre } from "../../../domain/entities/genre";
import { Rating, RatingData } from "../../../domain/entities/rating";
import { Language } from "../../../domain/entities/language";
import { MovieStatus, movieStatus } from "../../../domain/entities/movieStatus";
import { ContentType } from "@/core/features/upload/domain/entities/contentType";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import Image from "next/image";
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

export const editFormSchema = z.object({
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
    .min(1, "Informe a data de lançamento."),
  backdropPath: z.string().min(1, 'Adicione uma foto de fundo.'),
  posterPath: z.string().min(1, 'Adicione uma poster'),
  trailerLink: z.string().min(1, 'Adicione um link do trailer do filme.'),
  voteCount: z.coerce
    .number({
      error: "A quantidade de votos deve ser um número.",
    })
    .int({ message: "A quantidade de votos deve ser um número inteiro." })
    .positive({ message: "A quantidade de votos deve ser positiva." })
    .optional(),

  voteAverage: z.coerce
    .number({
      error: "A média de votos deve ser um número.",
    })
    .min(0, { message: "A média de votos deve ser pelo menos 0." })
    .max(10, { message: "A média de votos não pode ser maior que 10." })
    .optional(),
  budget: z.coerce
    .number("O orçamento deve ser um número.")
    .min(0, { message: "O orçamento deve ser pelo menos 0." })
    .positive('O orçamento deve ser um valor positivo.')
    .optional(),
  revenue: z.coerce
    .number("A receita deve ser um número.")
    .min(0, { message: "A receita deve ser pelo menos 0." })
    .positive('A receita deve ser um valor positivo.')
    .optional(),
})

export type EditMovieAccordionFormSchemaType = z.infer<typeof editFormSchema>  

interface EditMovieAccordionFormProps {
  values?: EditMovieAccordionFormSchemaType;
  genres?: Genre[];
  ratings?: RatingData[];
  createdGenres?: Genre[];
  languages?: Language[];
  onCreateGenre: () => void
  onUploadFile?: (fileName: string, contentType: ContentType, file: File) => Promise<{ uploadPath: string } | null>;
  onFormReady?: (method: UseFormReturn<EditMovieAccordionFormSchemaType>) => void;
}

export default function EditMovieAccordionForm({
  values,
  genres,
  onCreateGenre,
  ratings,
  languages,
  onUploadFile,
  onFormReady
}: EditMovieAccordionFormProps) {
  const form = useForm<EditMovieAccordionFormSchemaType>({
    resolver: zodResolver(editFormSchema) as any,
    defaultValues: values
  });

  const [backdrop, setBackdrop] = useState<File[] | undefined>();
  const [backdropPreview, setBackdropPreview] = useState<string | undefined>();

  const [poster, setPoster] = useState<File[] | undefined>();
  const [posterPreview, setPosterPreview] = useState<string | undefined>();

    
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
      return value?.find(currValue => currOption.value === currValue);
    })
  }
  
  async function handleDropBackdrop(files: File[]) {
    setBackdrop(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setBackdropPreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }

    if (onUploadFile !== undefined) {
      const res = await onUploadFile(files[0].name, files[0].type as ContentType, files[0]);
      form.setValue('backdropPath', res?.uploadPath ?? '');
    }
  };

  async function handleDropPoster(files: File[]) {
    setPoster(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          setPosterPreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }

    if (onUploadFile !== undefined) {
      const res = await onUploadFile(files[0].name, files[0].type as ContentType, files[0]);
      form.setValue('posterPath', res?.uploadPath ?? '');
    }
  };

  
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady])
  return (
    <Form {...form}>
      <form className="px-6 flex-1 overflow-y-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Informações Gerais</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="">
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Mídia</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <FormField
                control={form.control}
                name="backdropPath"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Capa de fundo</FormLabel>
                    <FormControl>
                      <Dropzone
                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                        onDrop={handleDropBackdrop}
                        onError={() => toast.error("Ops, tivemos problema para fazer o upload.")}
                        src={backdrop}
                      >
                        <DropzoneEmptyState />
                        <DropzoneContent>
                          {backdropPreview && (
                            <div className="h-[102px] w-full">
                              <img
                                alt="Preview"
                                className="absolute top-0 left-0 h-full w-full object-cover"
                                src={backdropPreview}
                              />
                            </div>
                          )}
                          {
                            field.value && !backdropPreview && (
                              <Image
                                className="absolute top-0 left-0 h-full w-full object-cover"
                                src={`/images/${field.value}`}
                                width={600}
                                height={400}
                                alt={'Capa'}
                              />
                            )
                          }
                        </DropzoneContent>
                      </Dropzone>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="posterPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poster</FormLabel>
                    <FormControl>
                      <Dropzone
                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                        onDrop={handleDropPoster}
                        onError={() => toast.error("Ops, tivemos problema para fazer o upload.")}
                        src={poster}
                      >
                        <DropzoneEmptyState />
                        <DropzoneContent>
                          {posterPreview && (
                            <div className="h-[102px] w-full">
                              <img
                                alt="Preview"
                                className="absolute top-0 left-0 h-full w-full object-cover"
                                src={posterPreview}
                              />
                            </div>
                          )}
                          {
                            field.value && !posterPreview && (
                              <div className="h-[102px] w-full">
                                <Image
                                  className="absolute top-0 left-0 h-full w-full object-cover"
                                  src={`/images/${field.value}`}
                                  width={600}
                                  height={400}
                                  alt={'Capa'}
                                />
                              </div>
                            )
                          }
                        </DropzoneContent>
                      </Dropzone>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trailerLink"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Link do trailer</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cole o link do trailer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Popularidade</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <FormField
                  control={form.control}
                  name="voteCount"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Total de votos</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          step="1"
                          placeholder="Digite o total de votos"
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="voteAverage"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Média de votos</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Digite a média de votos"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Financeiro</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Orçamento</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSignIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                          className="pl-9"
                          id="currency-input"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          step="0.01"
                          type="number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="revenue"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Receita</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSignIcon className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground z-10" />
                        <Input
                          className="pl-9"
                          id="currency-input"
                          min="0"
                          placeholder="0.00"
                          {...field}
                          step="0.01"
                          type="number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  )
}