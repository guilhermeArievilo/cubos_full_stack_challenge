'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  voteCount: z
    .number("A quantidade de votos deve ser um número.")
    .int({ message: "A quantidade de votos deve ser um número inteiro" })
    .positive('A quantidade de votos deve ser positivo'),
  voteAverage: z
    .number("A média de votos deve ser um número.")
    .positive('A média de votos devem ser positivo.'),
})

export type PopularityFormSchemaType = z.infer<typeof formSchema>

interface PopularityStepFormProps {
  values?: PopularityFormSchemaType;
  onFormReady?: (method: UseFormReturn<PopularityFormSchemaType>) => void;
}

export default function PopularityStepForm({
  values,
  onFormReady
}: PopularityStepFormProps) {
  const form = useForm<PopularityFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values
  });
  
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
          name="voteCount"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Total de votos</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite o total de votos"
                  {...field}
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
            <FormItem className="col-span-1">
              <FormLabel>Média de votos</FormLabel>
              <FormControl>
                <Input
                  type="number"
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