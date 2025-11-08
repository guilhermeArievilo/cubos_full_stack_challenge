'use client'
import Image from "next/image"
import { Button } from "./ui/button"
import ToggleTheme from "./toggle-theme"
import Link from "next/link"
import { useAuth } from "@/contexts/authContext"

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="bg-surface backdrop-blur-2xl flex justify-between items-center gap-8 p-4 border-b border-b-outline-variant/20">
      <div className="flex items-center gap-4">
        <Image
          className="dark:invert"
          src="/logo/cube.svg"
          alt="Cube of Cubos Logo"
          width={36}
          height={36}
          priority
        />
        <Image
          className="dark:invert"
          src="/logo/label_logo.svg"
          alt="Label of Cubos Logo"
          width={110}
          height={19}
          priority
        />
        <span>Movies</span>
      </div>

      <div className="flex gap-4">
        <ToggleTheme/>
        {
          !isAuthenticated ? (
            <Button asChild>
              <Link href={'/sign-up'}>Criar Conta</Link>
            </Button>
          ) :
          (
            <Button onClick={logout}>Logout</Button>
          )
        }
      </div>
    </header>
  )
}