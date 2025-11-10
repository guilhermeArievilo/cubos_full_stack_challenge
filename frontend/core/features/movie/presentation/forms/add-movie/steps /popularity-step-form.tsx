'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";
import { useAddMovieFormWizard } from "../wizard/add-movie-form-wizard-context";

export const popularityFormSchema = z.object({
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
});

export type PopularityFormSchemaType = z.infer<typeof popularityFormSchema>

interface PopularityStepFormProps {
  values?: PopularityFormSchemaType;
  onFormReady?: (method: UseFormReturn<PopularityFormSchemaType>) => void;
}

export default function PopularityStepForm({
  values,
  onFormReady
}: PopularityStepFormProps) {
  const { resetTrigger } = useAddMovieFormWizard();
  const form = useForm<PopularityFormSchemaType>({
    resolver: zodResolver(popularityFormSchema) as any,
    defaultValues: values ?? {
      voteAverage: 0,
      voteCount: 0
    }
  });
  
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
        <span className="col-span-2 text-xl font-semibold">Popularidade do filme</span>

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
      </form>
    </Form>
  )
}