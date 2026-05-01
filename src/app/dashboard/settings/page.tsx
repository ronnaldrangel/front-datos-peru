"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  User, 
  Lock, 
  Sun,
  Moon,
  Eye,
  EyeOff,
  RefreshCw,
  LayoutGrid,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [userData, setUserData] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  
  // Profile State
  const [firstName, setFirstName] = React.useState("")
  const [lastName, setLastName] = React.useState("")
  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false)

  // Password State
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [isUpdatingPassword, setIsUpdatingPassword] = React.useState(false)
  
  const [showCurrentPwd, setShowCurrentPwd] = React.useState(false)
  const [showNewPwd, setShowNewPwd] = React.useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false)

  // Notification State
  const [notification, setNotification] = React.useState<{type: 'success' | 'error', message: string} | null>(null)

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://127.0.0.1:3000/user/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
        const names = data.name?.split(' ') || ["", ""]
        setFirstName(names[0] || "")
        setLastName(names.slice(1).join(' ') || "")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    setMounted(true)
    fetchUserData()
  }, [])

  const handleUpdateProfile = async () => {
    setIsUpdatingProfile(true)
    setNotification(null)
    try {
      const token = localStorage.getItem('token')
      const fullName = `${firstName} ${lastName}`.trim()
      const response = await fetch('http://127.0.0.1:3000/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: fullName })
      })
      
      const data = await response.json()
      if (response.ok) {
        setNotification({ type: 'success', message: 'Perfil actualizado correctamente' })
        setUserData({ ...userData, name: fullName })
      } else {
        setNotification({ type: 'error', message: data.message || 'Error al actualizar perfil' })
      }
    } catch (error) {
      console.error("Connection error:", error)
      setNotification({ type: 'error', message: 'Error de conexión con el servidor' })
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setNotification({ type: 'error', message: 'Las contraseñas no coinciden' })
      return
    }
    
    setIsUpdatingPassword(true)
    setNotification(null)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://127.0.0.1:3000/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      })
      
      const data = await response.json()
      if (response.ok) {
        setNotification({ type: 'success', message: 'Contraseña actualizada correctamente' })
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setNotification({ type: 'error', message: data.message || 'Error al actualizar contraseña' })
      }
    } catch (error) {
      console.error("Connection error:", error)
      setNotification({ type: 'error', message: 'Error de conexión con el servidor' })
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  React.useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  if (!mounted || loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary font-sans">
      <DashboardSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden bg-background relative">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -mr-64 -mt-64 z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] rounded-full -ml-32 -mb-32 z-0 pointer-events-none" />

        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background/50 backdrop-blur-md z-20">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <h2 className="font-bold text-sm tracking-tight">Configuración</h2>
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
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative z-10">
          
          {/* Notifications */}
          {notification && (
            <div className={`fixed top-20 right-8 z-50 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-8 duration-300 ${
              notification.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : 'bg-red-500/10 border-red-500/20 text-red-500'
            }`}>
              {notification.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
              <span className="text-sm font-bold">{notification.message}</span>
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1600px]">
            
            {/* User Profile Card */}
            <Card className="bg-card border-border shadow-2xl rounded-3xl overflow-hidden relative group border transition-all hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 pb-4 p-8">
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                     <User className="h-6 w-6" />
                   </div>
                   <div>
                     <CardTitle className="text-[15px] font-bold text-card-foreground tracking-tight">Perfil de Usuario</CardTitle>
                     <p className="text-[12px] text-muted-foreground mt-1 font-medium">Edita tu información personal y configuración de cuenta</p>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6 p-8 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-muted-foreground ml-1">Nombre</Label>
                    <Input 
                      placeholder="Nombre" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-muted/50 border border-border rounded-2xl h-11 px-4 text-[13px] text-foreground font-semibold focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-muted-foreground ml-1">Apellidos</Label>
                    <Input 
                      placeholder="Apellidos" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-muted/50 border border-border rounded-2xl h-11 px-4 text-[13px] text-foreground font-semibold focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-muted-foreground ml-1">Correo Electrónico</Label>
                    <Input 
                      disabled
                      value={userData?.email || ""}
                      className="bg-muted/30 border border-border/50 rounded-2xl h-11 px-4 text-[13px] text-muted-foreground font-semibold opacity-60 cursor-not-allowed shadow-none" 
                    />
                    <div className="flex items-center gap-1.5 mt-1.5 ml-1">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">No editable</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[13px] font-medium text-muted-foreground ml-1">Número de Celular</Label>
                    <Input 
                      disabled
                      value="952672817"
                      className="bg-muted/30 border border-border/50 rounded-2xl h-11 px-4 text-[13px] text-muted-foreground font-semibold opacity-60 cursor-not-allowed shadow-none" 
                    />
                    <div className="flex items-center gap-1.5 mt-1.5 ml-1">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <p className="text-[10px] text-muted-foreground/60 font-bold uppercase tracking-wider">No editable</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                   <Button 
                    onClick={handleUpdateProfile}
                    disabled={isUpdatingProfile}
                    className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
                   >
                     {isUpdatingProfile ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
                     Guardar Perfil
                   </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Card */}
            <Card className="bg-card border-border shadow-2xl rounded-3xl overflow-hidden relative group border transition-all hover:border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardHeader className="relative z-10 pb-4 p-8">
                <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                     <Lock className="h-6 w-6" />
                   </div>
                   <div>
                     <CardTitle className="text-[15px] font-bold text-card-foreground tracking-tight">Seguridad</CardTitle>
                     <p className="text-[12px] text-muted-foreground mt-1 font-medium">Actualiza tu contraseña para mayor seguridad</p>
                   </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-5 p-8 pt-2">
                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-muted-foreground ml-1">Contraseña actual</Label>
                  <div className="relative">
                    <Input 
                      type={showCurrentPwd ? "text" : "password"}
                      placeholder="••••••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-muted/50 border border-border rounded-2xl h-11 px-4 text-[13px] text-foreground font-semibold focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner pr-12" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-muted-foreground ml-1">Nueva contraseña</Label>
                  <div className="relative">
                    <Input 
                      type={showNewPwd ? "text" : "password"}
                      placeholder="Nueva contraseña"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-muted/50 border border-border rounded-2xl h-11 px-4 text-[13px] text-foreground font-semibold focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner pr-12" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowNewPwd(!showNewPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[13px] font-medium text-muted-foreground ml-1">Confirmar contraseña</Label>
                  <div className="relative">
                    <Input 
                      type={showConfirmPwd ? "text" : "password"}
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-muted/50 border border-border rounded-2xl h-11 px-4 text-[13px] text-foreground font-semibold focus:ring-primary/20 focus:border-primary/50 transition-all shadow-inner pr-12" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                    >
                      {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                   <Button 
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70"
                   >
                     {isUpdatingPassword ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : null}
                     Actualizar
                   </Button>
                </div>
              </CardContent>
            </Card>

          </div>
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
