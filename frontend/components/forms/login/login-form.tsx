'use client'
import z from "zod";
import { emailValidation, nameValidation, passwordValidation } from "../zod_validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const identifierValidation = z.union([emailValidation, nameValidation]);

const formSchema = z.object({
  identifier: identifierValidation,
  password: passwordValidation
})

type FormSchemaType = z.infer<typeof formSchema>

interface LoginFormProps {
  handleLogin: (values: FormSchemaType) => void;
}

export default function LoginForm({ handleLogin }: LoginFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        className="w-full sm:w-md bg-surface-container p-4 flex flex-col gap-4 items-center rounded-xs"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome/E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome/E-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua senha" {...field} isPasswordInput/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between items-center gap-8">
          <Button asChild variant={"link"} type="button">
            <Link href={'/forgot-password'}>
              Esqueci minha senha
            </Link>
          </Button>
          <Button type="submit" size={"lg"}>Entrar</Button>
        </div>
      </form>
    </Form>
  )
}