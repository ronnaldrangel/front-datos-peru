"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Database, Menu } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <Database className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tighter text-primary">datosperu<span className="text-foreground">.net</span></span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="/#apis" className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}>
                Nuestras APIs
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}>
                Documentación
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/precios" className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-muted text-muted-foreground hover:text-foreground font-medium"}>
                Precios
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" className="hidden md:inline-flex rounded-full px-6 border-border hover:bg-muted text-foreground font-medium">
            Ingresar
          </Button>
          <Button className="hidden md:inline-flex rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-medium shadow-md shadow-primary/20">
            Empieza ahora
          </Button>

          <Sheet>
            <SheetTrigger render={
              <Button variant="outline" size="icon" className="md:hidden border-border" aria-label="Menu" />
            }>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background">
              <SheetHeader>
                <SheetTitle className="text-left w-full mb-4">
                  <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <Database className="h-5 w-5 text-primary" />
                    <span className="font-bold">datosperu<span className="text-foreground">.net</span></span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/#apis" className="text-lg font-medium text-muted-foreground hover:text-primary">Nuestras APIs</Link>
                <Link href="/#clientes" className="text-lg font-medium text-muted-foreground hover:text-primary">Clientes</Link>
                <Link href="/#faqs" className="text-lg font-medium text-muted-foreground hover:text-primary">FAQs</Link>
                <Link href="#" className="text-lg font-medium text-muted-foreground hover:text-primary">Documentación</Link>
                <Link href="/precios" className="text-lg font-medium text-muted-foreground hover:text-primary">Precios</Link>
                <div className="border-t border-muted my-4"></div>
                <Button variant="outline" className="w-full rounded-full border-border">Iniciar sesión</Button>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white">Empieza ahora</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
