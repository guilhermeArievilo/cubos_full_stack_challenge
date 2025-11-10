import z from "zod";
import { Genre } from "../../../domain/entities/genre";
import { useForm, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  genre: z.string().optional(),
  duration: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato inválido (use HH:MM ou HH:MM:SS)")
    .optional(),
  releaseDateStart: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    { message: "Data inicial inválida" }
  ),
  releaseDateEnd: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    { message: "Data final inválida" }
  ),
}).refine((data) => {
  return new Date(data.releaseDateEnd) >= new Date(data.releaseDateStart);
}, {
  message: "A data de lançamento final não pode ser menor que a data inicial",
  path: ["releaseDateEnd"],
});

export type ApplyFiltersFormSchemaType = z.infer<typeof formSchema>

interface GApplyFiltersFormProps {
  values?: ApplyFiltersFormSchemaType;
  genres?: Genre[];
  onFormReady?: (method: UseFormReturn<ApplyFiltersFormSchemaType>) => void;
}

export default function ApplyFiltersForm({
  values,
  genres,
  onFormReady
}: GApplyFiltersFormProps) {
  const form = useForm<ApplyFiltersFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {
      duration: "",
      genre: "",
      releaseDateStart: "",
      releaseDateEnd: "",
    },
  });
  
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);
  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
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

          <Button type="button" variant={'secondary'} onClick={() => form.setValue('duration', '')}>Limpar duração</Button>
        </div>
        
        <div className="col-span-2 flex flex-col gap-2">
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="col-span-2 flex flex-col">
                <FormLabel>Gênero</FormLabel>
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
                          genres?.map(({ name, id }) => (
                            <SelectItem value={id} key={id}>{name}</SelectItem>
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

          <Button type="button" variant={'secondary'} onClick={() => form.setValue('genre', '')}>Limpar Gênero</Button>
        </div>
        
        <div className="col-span-2 flex flex-col gap-2">
          <span className="text-xl font-semibold">Data de lançamento</span>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="releaseDateStart"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Começo</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Começo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="releaseDateEnd"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Final</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Final"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <Button type="button" variant={'secondary'} onClick={() => {
            form.setValue('releaseDateStart', '');
            form.setValue('releaseDateEnd', '');
          }}>Limpar filtros de Data de lançamento</Button>
        </div>
      </form>
    </Form>
  )
}