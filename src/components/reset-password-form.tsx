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

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Nueva contraseña</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="password">Nueva contraseña</FieldLabel>
          <Input id="password" type="password" required placeholder="••••••••" />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <Input id="confirm-password" type="password" required placeholder="••••••••" />
        </Field>
        <Field>
          <Button type="submit" className="w-full">Cambiar contraseña</Button>
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
