import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"
import Link from "next/link"

export function VerifyEmailForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Verifica tu correo</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Hemos enviado un código de 6 dígitos a tu correo. Ingrésalo a continuación para activar tu cuenta.
          </p>
        </div>
        <div className="flex w-full justify-center py-2">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Field>
          <Button type="submit" className="w-full">Verificar cuenta</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            ¿No recibiste el código?{" "}
            <button type="button" className="underline underline-offset-4 font-medium">
              Reenviar código
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
