import { VerifyEmailForm } from "@/components/verify-email-form"
import Image from "next/image"
import { Database } from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export default function VerifyEmailPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter text-primary">datosperu<span className="text-foreground">.net</span></span>
          </Link>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <VerifyEmailForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login-bg.png"
          alt="DatosPeru.net Verification Background"
          fill
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale-[0.2]"
          priority
        />
      </div>
    </div>
  )
}
