'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function useToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>();

  
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  function toogle() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return {
    toogle,
    mounted
  }
}