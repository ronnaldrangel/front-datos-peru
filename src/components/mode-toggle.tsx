"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by only rendering after mounting
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const targetTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(targetTheme)
    console.log(`[Theme] Switching to ${targetTheme}. Current IP access might require a moment for localStorage to sync.`)
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="border-border text-foreground bg-background hover:bg-muted transition-all rounded-xl font-medium shadow-sm hover:shadow-md relative overflow-hidden group"
      onClick={toggleTheme}
      title="Cambiar tema"
    >
      <div className="relative h-[1.2rem] w-[1.2rem] flex items-center justify-center">
        <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${mounted && resolvedTheme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 ${mounted && resolvedTheme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
      </div>
      <span className="sr-only">Cambiar tema</span>
    </Button>
  )
}
