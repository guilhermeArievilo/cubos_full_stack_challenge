'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign, DollarSignIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  budget: z.coerce
    .number("O orçamento deve ser um número.")
    .min(0, { message: "O orçamento deve ser pelo menos 0." })
    .positive('O orçamento deve ser um valor positivo.'),
  revenue: z.coerce
    .number("A receita deve ser um número.")
    .min(0, { message: "A receita deve ser pelo menos 0." })
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
    resolver: zodResolver(formSchema) as any,
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
        <span className="col-span-2 text-xl font-semibold">Financeiro do filme</span>

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
      </form>
    </Form>
  )
}