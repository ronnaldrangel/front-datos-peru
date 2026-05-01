"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
} from "@/components/ui/field"
import { authApi } from "@/lib/api"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"

function VerifyEmailContent({ className, ...props }: React.ComponentProps<"div">) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verificando tu cuenta...")

  useEffect(() => {
    if (!token) {
      setStatus("loading")
      setMessage("Hemos enviado un correo de verificación. Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.")
      return
    }

    const verify = async () => {
      try {
        const response = await authApi.verifyEmail(token)
        setStatus("success")
        setMessage(response.message)
        setTimeout(() => router.push("/login"), 3000)
      } catch (err: any) {
        setStatus("error")
        setMessage(err.message)
      }
    }

    verify()
  }, [token, router])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-4 text-center">
          {status === "loading" && <Loader2 className="h-12 w-12 animate-spin text-primary" />}
          {status === "success" && <CheckCircle2 className="h-12 w-12 text-green-500" />}
          {status === "error" && <XCircle className="h-12 w-12 text-red-500" />}
          
          <h1 className="text-2xl font-bold">Verificación de cuenta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            {message}
          </p>
        </div>
        
        {status !== "loading" && (
          <Field>
            <Button className="w-full" onClick={() => router.push("/login")}>
              Ir al inicio de sesión
            </Button>
          </Field>
        )}
      </FieldGroup>
    </div>
  )
}

export function VerifyEmailForm(props: React.ComponentProps<"div">) {
  return (
    <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />}>
      <VerifyEmailContent {...props} />
    </Suspense>
  )
}