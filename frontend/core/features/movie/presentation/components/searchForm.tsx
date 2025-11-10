'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  query: z.string().optional()
})

type FormSchemaType = z.infer<typeof formSchema>

interface SearchFormProps {
  handleSearch: (query?: string) => void;
}

export default function SearchForm({ handleSearch }: SearchFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: ''
    },
  });

  function onSubmit({
    query
  }: FormSchemaType) {
    handleSearch(query);
  }

  return (
    <Form {...form}>
      <form
        className="w-md relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Pesquise por filmes"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="absolute top-0 right-0 h-full flex justify-between items-center gap-8">
          <Button type="submit" size={"icon-lg"} variant={"secondary"} className="bg-transparent! backdrop-blur-none">
            <Search />
          </Button>
        </div>
      </form>
    </Form>

  )
}