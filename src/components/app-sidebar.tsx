"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboardIcon, 
  SearchIcon, 
  DatabaseIcon, 
  FileChartColumnIcon, 
  Settings2Icon, 
  CircleHelpIcon, 
  BookOpenIcon,
  CodeIcon,
  ShieldCheckIcon,
  GlobeIcon
} from "lucide-react"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
    isActive: true,
  },
  {
    title: "Servicios API",
    url: "#",
    icon: <DatabaseIcon />,
    items: [
      {
        title: "Consulta DNI",
        url: "#",
      },
      {
        title: "Consulta RUC",
        url: "#",
      },
      {
        title: "Consulta SOAT",
        url: "#",
      },
      {
        title: "Consulta MTC",
        url: "#",
      },
    ],
  },
  {
    title: "Mis Consultas",
    url: "#",
    icon: <SearchIcon />,
  },
]

const navSecondary = [
  {
    title: "Documentación",
    url: "#",
    icon: <BookOpenIcon />,
  },
  {
    title: "Ejemplos Code",
    url: "#",
    icon: <CodeIcon />,
  },
  {
    title: "Estado del Sistema",
    url: "#",
    icon: <ShieldCheckIcon />,
  },
]

const documents = [
  {
    name: "API Reference",
    url: "#",
    icon: <FileChartColumnIcon />,
  },
  {
    name: "Webhooks",
    url: "#",
    icon: <GlobeIcon />,
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string
    email: string
    avatar?: string
  }
  onLogout: () => void
}

export function AppSidebar({ user, onLogout, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <DatabaseIcon className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-base">Datos Perú</span>
                <span className="truncate text-xs text-muted-foreground">API Services</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogout={onLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
