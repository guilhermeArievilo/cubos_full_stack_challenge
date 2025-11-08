'use client'
import z from "zod"
import { emailValidation, nameValidation, passwordValidation } from "../zod_validations"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RegisterDTO } from "@/core/features/auth/domain/entities/authEntities";

const formSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
  confirmPassword: passwordValidation
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
})

type FormSchemaType = z.infer<typeof formSchema>

interface SignUpFormProps {
  handleSignUp: (values: RegisterDTO) => void;
}

export default function SignUpForm({ handleSignUp }: SignUpFormProps) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  function onSubmit({
    name,
    email,
    password
  }: FormSchemaType) {
    handleSignUp({
      name,
      email,
      password
    });
  }

  return (
    <Form {...form}>
      <form
        className="w-md bg-surface-container p-4 flex flex-col gap-4 items-center rounded-xs"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite seu nome"
                  {...field}
                />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail" {...field}/>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Confirmação de senha</FormLabel>
              <FormControl>
                <Input placeholder="Digite sua senha novamente" {...field} isPasswordInput/>
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
          <Button type="submit" size={"lg"}>Criar</Button>
        </div>
      </form>
    </Form>
  )
}