'use client'
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import SunIcon from '@icons/sun.svg'
import MoonIcon from '@icons/moon.svg'
import { Moon, Sun } from "lucide-react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>();

  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function toggle() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <>
      {
        mounted && (
        <Button className="px-5!" variant={'secondary'} onClick={toggle}>
          {
            theme === 'light' ? <Moon /> : <Sun/>
          }
        </Button>
        )
      }
    </>
  )
}