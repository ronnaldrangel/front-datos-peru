"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Copy, 
  Eye, 
  RefreshCw, 
  FileText, 
  Code, 
  ExternalLink,
  Download,
  Moon,
  Sun,
  LayoutGrid,
  EyeOff
} from "lucide-react"
import { useTheme } from "next-themes"

export default function DashboardPage() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [showToken, setShowToken] = React.useState(false)
  const [userData, setUserData] = React.useState<any>(null)
  const [usageData, setUsageData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsageData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/user/usage', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUsageData(data)
      }
    } catch (error) {
      console.error("Error fetching usage data:", error)
    }
  }

  const handleRefreshToken = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:3000/user/refresh-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData({ ...userData, api_token: data.api_token })
        alert("Token regenerado correctamente")
      } else {
        alert("Error al regenerar el token")
      }
    } catch (error) {
      console.error("Error regenerating token:", error)
      alert("Error al regenerar el token")
    }
  }

  React.useEffect(() => {
    setMounted(true)
    fetchUserData()
    fetchUsageData()
  }, [])

  // Hook for chart points calculation - must be before any return
  const chartPoints = React.useMemo(() => {
    const points = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const entry = usageData.find(u => u.date === dateStr);
      points.push({
        label: d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }).replace('.', ''),
        value: entry ? entry.count : 0
      });
    }
    return points;
  }, [usageData]);

  // Derived values
  const apiToken = userData?.api_token || "No generado"
  const credits = userData?.credits ?? 0
  const used = 5 - credits
  const maxValue = Math.max(...chartPoints.map(p => p.value), 1)

  const getPath = (isArea = false) => {
    if (chartPoints.length === 0) return ""
    const pts = chartPoints.map((p, i) => {
      const x = i * (1000 / 6)
      const y = 250 - (p.value / maxValue * 200)
      return { x, y }
    })

    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 1; i < pts.length; i++) {
      const xc = (pts[i].x + pts[i-1].x) / 2
      const yc = (pts[i].y + pts[i-1].y) / 2
      d += ` Q ${pts[i-1].x} ${pts[i-1].y} ${xc} ${yc}`
      if (i === pts.length - 1) {
        d += ` L ${pts[i].x} ${pts[i].y}`
      }
    }

    if (isArea) {
      d += ` L 1000 300 L 0 300 Z`
    }
    return d
  }

  // Early return for loading/mounting
  if (!mounted || loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-background">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <h2 className="font-bold text-sm tracking-tight">API Consulta</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
            
            {/* Token Card */}
            <Card className="bg-card border-border lg:col-span-4 shadow-2xl rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10">
                <CardTitle className="text-[15px] font-bold text-card-foreground">Token API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 relative z-10">
                <div className="bg-muted/50 border border-border rounded-2xl p-4 font-mono text-[13px] text-muted-foreground overflow-hidden break-all min-h-[56px] flex items-center shadow-inner tracking-wider">
                  {showToken ? apiToken : "••••••••••••••••••••••••••••••••••••••••••••••••"}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" className="bg-secondary/50 hover:bg-secondary text-foreground border border-border h-11 gap-2 rounded-xl transition-all" onClick={() => setShowToken(!showToken)}>
                    {showToken ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                    <span className="text-xs font-bold">{showToken ? "Ocultar" : "Mostrar"}</span>
                  </Button>
                  <Button variant="secondary" className="bg-secondary/50 hover:bg-secondary text-foreground border border-border h-11 gap-2 rounded-xl transition-all" onClick={() => navigator.clipboard.writeText(apiToken)}>
                    <Copy className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-bold">Copiar</span>
                  </Button>
                </div>
                <Button 
                  onClick={handleRefreshToken}
                  className="w-full h-11 gap-2.5 text-sm font-bold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4" />
                  Generar Nuevo Token
                </Button>
              </CardContent>
            </Card>

            {/* Plan Card */}
            <Card className="bg-card border-border lg:col-span-4 shadow-2xl rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 relative z-10">
                <CardTitle className="text-[15px] font-bold text-card-foreground">Plan Actual</CardTitle>
                <Button className="h-8 px-4 text-[11px] font-extrabold rounded-full bg-primary/90 hover:bg-primary text-white border-none shadow-md shadow-primary/20">
                  Actualizar plan
                </Button>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-center group/item">
                    <span className="text-muted-foreground text-[13px] font-medium">Plan</span>
                    <span className="font-bold text-foreground text-[15px]">Free</span>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <span className="text-muted-foreground text-[13px] font-medium">Créditos Iniciales</span>
                    <span className="font-bold text-foreground text-[15px]">5</span>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <span className="text-muted-foreground text-[13px] font-medium">Usados</span>
                    <span className="font-bold text-foreground text-[15px]">{used > 0 ? used : 0}</span>
                  </div>
                  <div className="flex justify-between items-center group/item">
                    <span className="text-muted-foreground text-[13px] font-medium">Restantes</span>
                    <span className="font-bold text-primary text-[15px]">{credits}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-3.5 w-3.5" />
                      <span className="text-[12px] font-medium">Fecha de renovación</span>
                    </div>
                    <span className="font-bold text-foreground/80 text-[13px]">7/5/2026</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Developer Resources Card */}
            <Card className="bg-card border-border lg:col-span-4 shadow-2xl rounded-3xl overflow-hidden relative group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-5 relative z-10">
                <CardTitle className="text-[15px] font-bold text-card-foreground">Recursos para desarrolladores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 relative z-10">
                <button className="w-full flex items-center h-14 px-4 bg-muted/30 border border-border rounded-2xl hover:bg-muted/50 hover:border-border transition-all group/btn text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col ml-4">
                    <span className="text-[13px] font-bold text-card-foreground">Documentación</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Prueba las APIs directamente desde el navegador</span>
                  </div>
                </button>
                
                <button className="w-full flex items-center h-14 px-4 bg-muted/30 border border-border rounded-2xl hover:bg-muted/50 hover:border-border transition-all group/btn text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                    <Code className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col ml-4">
                    <span className="text-[13px] font-bold text-card-foreground">Ejemplos en GitHub</span>
                    <span className="text-[10px] text-muted-foreground font-medium">Ejemplos en todos los lenguajes de programación</span>
                  </div>
                </button>
 
                <button className="w-full flex items-center h-14 px-4 bg-muted/30 border border-border rounded-2xl hover:bg-muted/50 hover:border-border transition-all group/btn text-left">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300 shrink-0">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col ml-4 flex-1 min-w-0">
                    <span className="text-[13px] font-bold text-card-foreground">Importar a Postman o Insomnia</span>
                    <span className="text-[10px] text-muted-foreground font-medium truncate">Descarga la colección completa</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-muted-foreground group-hover/btn:text-foreground transition-colors ml-2" />
                </button>
              </CardContent>
            </Card>
          </div>


          {/* Chart Card */}
          <Card className="bg-card border-border shadow-2xl rounded-[2.5rem] overflow-hidden w-full relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between p-8 relative z-10">
              <div>
                <CardTitle className="text-lg font-bold text-card-foreground">Créditos consumidos</CardTitle>
                <p className="text-[13px] text-muted-foreground font-medium mt-1">Consumo de créditos en los últimos 7 días</p>
              </div>
              <Button variant="secondary" className="bg-secondary/50 hover:bg-secondary text-foreground border border-border h-10 px-5 text-xs font-bold rounded-xl flex items-center gap-2">
                Últimos 7 días
              </Button>
            </CardHeader>
            <CardContent className="px-8 pb-8 relative z-10">
              <div className="h-[240px] relative mt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 300" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line 
                      key={i} 
                      x1="0" y1={i * 75} x2="1000" y2={i * 75} 
                      stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" 
                    />
                  ))}
                  
                  {/* Area Gradient */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="var(--primary)" floodOpacity="0.3" />
                    </filter>
                  </defs>
                  
                  {/* Chart Area */}
                  <path 
                    d={getPath(true)} 
                    fill="url(#chartGradient)" 
                    className="transition-all duration-1000"
                  />
                  
                  {/* Chart Line */}
                  <path 
                    d={getPath(false)} 
                    fill="none" 
                    stroke="var(--primary)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#shadow)"
                    className="transition-all duration-1000"
                  />

                  {/* Interactive Points */}
                  {chartPoints.map((p, i) => {
                    const x = i * (1000 / 6)
                    const y = 250 - (p.value / maxValue * 200)
                    return (
                      <g key={i} className="group/point">
                        <circle cx={x} cy={y} r="6" fill="var(--primary)" className="opacity-0 group-hover/point:opacity-100 transition-opacity" />
                        <circle cx={x} cy={y} r="3" fill="white" />
                        <text x={x} y={y - 15} textAnchor="middle" className="text-[10px] fill-muted-foreground opacity-0 group-hover/point:opacity-100 transition-opacity font-bold">
                          {p.value}
                        </text>
                      </g>
                    )
                  })}
                </svg>

                {/* Labels */}
                <div className="flex justify-between mt-8 text-[11px] font-bold text-muted-foreground/60 uppercase tracking-widest px-2">
                  {chartPoints.map((p, i) => (
                    <span key={i}>{p.label}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      `}} />
    </div>
  )
}
