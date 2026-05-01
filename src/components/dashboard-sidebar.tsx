"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Search, 
  MessageSquare, 
  Smartphone, 
  Settings, 
  Zap, 
  FileText, 
  LifeBuoy, 
  ChevronRight,
  MoreVertical,
  Database
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()
  const [user, setUser] = React.useState<any>(null)

  const navItems = [
    { name: "API Consulta", icon: Search, href: "/dashboard", active: pathname === "/dashboard" },
  ]

  const serviceItems = [
    { name: "Configuración", icon: Settings, href: "/dashboard/settings", active: pathname === "/dashboard/settings" },
    { name: "Estado de Servicio", icon: Zap, href: "#", badge: "Nuevo" },
  ]

  const bottomItems = [
    { name: "Documentación", icon: FileText, href: "#" },
    { name: "Soporte", icon: LifeBuoy, href: "#" },
  ]

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen w-64 flex-col bg-background border-r border-border font-sans">
      <div className="flex h-16 items-center px-6 gap-2.5 pt-4">
        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/20">
          <Database className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[16px] tracking-tight text-primary leading-tight">datosperu<span className="text-foreground">.net</span></span>
          <p className="text-[10px] text-muted-foreground/60 font-medium">Panel de Control</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 mt-6 space-y-7">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                item.active 
                  ? "bg-muted text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px]", item.active ? "text-primary" : "text-muted-foreground")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.1em]">
            Servicios
          </p>
          <nav className="space-y-1 mt-2">
            {serviceItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  item.active 
                    ? "bg-muted text-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px]", item.active ? "text-primary" : "text-muted-foreground")} />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge className="bg-primary/90 hover:bg-primary text-white text-[9px] font-bold px-1.5 h-4.5 border-none rounded-md">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-1">
          <nav className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              >
                <item.icon className="h-[18px] w-[18px] text-muted-foreground" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="px-1 pt-2">
          <div className="bg-muted/30 rounded-2xl p-4 border border-border shadow-xl relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-3.5 w-3.5 text-primary fill-primary" />
                <span className="text-[11px] font-bold text-foreground tracking-tight flex items-center gap-1.5">
                  Free <span className="text-muted-foreground/60 font-medium">• API Consulta</span>
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Progreso</span>
                  <span className="text-[10px] font-bold text-foreground/80">24/30 días</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[80%] shadow-lg shadow-primary/40" />
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                  Tu plan de API Consulta vence en 6 días. Renueva ahora para seguir usando el servicio.
                </p>
                <Button variant="default" className="w-full h-9 text-xs font-bold mt-2 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 border-none">
                  Actualizar Plan
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-background/80 backdrop-blur-md mt-auto border-t border-border/50">
        <div 
          onClick={logout}
          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-red-500/10 transition-colors group cursor-pointer border border-transparent hover:border-red-500/20"
        >
          <div className="h-9 w-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs ring-1 ring-border group-hover:ring-red-500/50 transition-all">
            {user?.name?.substring(0, 2).toUpperCase() || "DP"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-foreground truncate leading-tight">{user?.name || "Juancito perez"}</p>
            <p className="text-[10px] text-muted-foreground truncate font-medium mt-0.5">{user?.email || "carlosxd1237!@gmail.com"}</p>
          </div>
          <div className="text-[10px] font-bold text-muted-foreground group-hover:text-red-500 transition-colors px-2 py-1 bg-muted/50 rounded-md">
            Salir
          </div>
        </div>
      </div>
    </div>
  )
}
