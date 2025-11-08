import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  budget: z
    .number("O orçamento deve ser um número.")
    .positive('O orçamento deve ser um valor positivo.'),
  revenue: z
    .number("A receita deve ser um número.")
    .positive('A receita deve ser um valor positivo.'),
})

export type FinancialFormSchemaType = z.infer<typeof formSchema>

interface FinancialStepFormProps {
  values?: FinancialFormSchemaType;
  onFormReady?: (method: UseFormReturn<FinancialFormSchemaType>) => void;
}

export default function FinancialStepForm({
  values,
  onFormReady
}: FinancialStepFormProps) {
  const form = useForm<FinancialFormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: values
  });
  
  useEffect(() => {
    if (onFormReady) {
      onFormReady(form);
    }
  }, [form, onFormReady]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Orçamento</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite a orçamento"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="revenue"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Receita</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Digite a receita"
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