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

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Recuperar Acceso</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tu correo y te enviaremos un enlace para restablecerla
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" type="email" placeholder="usuario@ejemplo.com" required />
        </Field>
        <Field>
          <Button type="submit" className="w-full">Enviar enlace</Button>
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
