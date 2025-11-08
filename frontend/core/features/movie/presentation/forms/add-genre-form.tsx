import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Insira o nome do gênero")
})

type FormSchemaType = z.infer<typeof formSchema>

interface AddGenreFormProps {
  handleCreateGenre: (values: FormSchemaType) => void;
}

export default function AddGenreForm({
  handleCreateGenre
}: AddGenreFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 items-end"
        onSubmit={form.handleSubmit(handleCreateGenre)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome do Gênero</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o nome do Gênero"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button type="submit" size={"lg"}>Criar</Button>
      </form>
    </Form>
  );
}