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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Regístrate para empezar a usar nuestras APIs
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
          <Input id="name" type="text" placeholder="Juan Pérez" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
          <Input id="email" type="email" placeholder="usuario@ejemplo.com" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar contraseña</FieldLabel>
          <Input id="confirm-password" type="password" required />
        </Field>
        <Field>
          <Button type="submit" className="w-full">Registrarse</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Inicia sesión
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
