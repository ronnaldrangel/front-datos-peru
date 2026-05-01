"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, KeyIcon, CreditCardIcon, ZapIcon, CopyIcon, RefreshCwIcon, EyeIcon, EyeOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SectionCards({ userData, onRefreshToken }: { userData: any, onRefreshToken: () => void }) {
  const [showToken, setShowToken] = React.useState(false)
  
  const credits = userData?.credits ?? 0
  const apiToken = userData?.api_token || "No generado"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiToken)
    alert("Token copiado al portapapeles")
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Créditos Restantes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {credits}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />
              Activo
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-primary">
            <ZapIcon className="size-4" />
            Plan Free
          </div>
          <div className="text-muted-foreground">
            Tus créditos se renuevan mensualmente
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card lg:col-span-2">
        <CardHeader>
          <CardDescription>Token API</CardDescription>
          <CardTitle className="text-lg font-mono truncate @[250px]/card:text-xl">
            {showToken ? apiToken : "••••••••••••••••••••••••••••"}
          </CardTitle>
          <CardAction className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowToken(!showToken)}>
              {showToken ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={copyToClipboard}>
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={onRefreshToken}>
              <RefreshCwIcon className="h-4 w-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            <KeyIcon className="size-4 text-muted-foreground" />
            Llave de acceso privada
          </div>
          <div className="text-muted-foreground">
            No compartas tu token con nadie
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Soporte Técnico</CardDescription>
          <CardTitle className="text-xl font-semibold @[250px]/card:text-2xl">
            Ayuda & Docs
          </CardTitle>
          <CardAction>
             <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Online
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <Button variant="link" className="p-0 h-auto text-primary font-bold">
            Ver documentación
          </Button>
          <div className="text-muted-foreground">
            Guías de integración y ejemplos
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
