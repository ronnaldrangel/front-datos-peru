"use client"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { authApi } from "@/lib/api"
import { Loader2 } from "lucide-react"

function ResetPasswordContent({ className, ...props }: React.ComponentProps<"form">) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token) {
      setError("Token de restablecimiento no encontrado.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await authApi.resetPassword({
        token,
        newPassword: formData.password
      })
      setSuccess(response.message)
      setTimeout(() => router.push("/login"), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Nueva contraseña</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 text-sm text-green-500 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-md text-center">
            {success}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="password">Nueva contraseña</FieldLabel>
          <Input 
            id="password" 
            type="password" 
            required 
            placeholder="••••••••" 
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <Input 
            id="confirm-password" 
            type="password" 
            required 
            placeholder="••••••••" 
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </Field>
        <Field>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Actualizando..." : "Cambiar contraseña"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            <Link href="/login" className="underline underline-offset-4">
              Volver al inicio de sesión
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

export function ResetPasswordForm(props: React.ComponentProps<"form">) {
  return (
    <Suspense fallback={<Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />}>
      <ResetPasswordContent {...props} />
    </Suspense>
  )
}
