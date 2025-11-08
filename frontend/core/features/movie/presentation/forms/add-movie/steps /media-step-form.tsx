import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  backdropPath: z.string().min(1, 'Adicione uma foto de fundo.'),
  posterPath: z.string().min(1, 'Adicione uma poster'),
  trailerLink: z.string().min(1, 'Adicione um link do trailer do filme.'),
})

export type MediaFormSchemaType = z.infer<typeof formSchema>

interface MediaStepFormProps {
  values?: MediaFormSchemaType;
  onFormReady?: (method: UseFormReturn<MediaFormSchemaType>) => void;
}

export default function MediaStepForm({ values, onFormReady }: MediaStepFormProps) {
  const form = useForm<MediaFormSchemaType>({
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
          name="backdropPath"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Capa de fundo</FormLabel>
              <FormControl>
                <Input type="file" {...field}/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="posterPath"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <Input type="file" {...field}/>
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
      </form>
    </Form>
  )
}