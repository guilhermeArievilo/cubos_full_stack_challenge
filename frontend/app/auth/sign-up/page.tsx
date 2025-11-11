'use client'
import SignUpForm from "@/components/forms/sign-up/sign-up-form";
import useSignUpViewModel from "@/core/features/auth/presentation/sign-up/signUpViewModel";

export default function SignUpPage() {
  const { handleSignUp } = useSignUpViewModel()
  return (
    <main className="grow container sm:mx-auto px-6 flex flex-col items-center justify-center">
      <SignUpForm handleSignUp={handleSignUp}/>
    </main>
  )
}