"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { RefreshCw } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default function DashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const [userData, setUserData] = React.useState<any>(null)
  const [usageData, setUsageData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/login')
        return
      }

      const response = await fetch(`${API_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      } else {
        router.push('/login')
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsageData = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/user/usage`, {
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
      const response = await fetch(`${API_URL}/user/refresh-token`, {
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  React.useEffect(() => {
    setMounted(true)
    fetchUserData()
    fetchUsageData()
  }, [])

  if (!mounted || loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const user = {
    name: userData?.full_name || "Usuario",
    email: userData?.email || "usuario@ejemplo.com",
    avatar: "",
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} onLogout={handleLogout} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards userData={userData} onRefreshToken={handleRefreshToken} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive usageData={usageData} />
              </div>
              <DataTable data={usageData} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
