import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <Database className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold tracking-tighter text-primary">datosperu<span className="text-foreground">.net</span></span>
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Plataforma de APIs más completa para el mercado peruano. Centralizamos información valiosa para empresas que desean construir integraciones sólidas, modernas y rápidas.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="icon" className="rounded-full border-border text-muted-foreground hover:text-foreground bg-background hover:bg-muted">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </Button>
              {/* Simulated Twitter/X Icon */}
              <Button variant="outline" size="icon" className="rounded-full border-border text-muted-foreground hover:text-foreground bg-background hover:bg-muted font-serif font-bold text-lg">
                𝕏
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Recursos</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API Consulta</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API WhatsApp</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">API SMS</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentación de Integración</Link></li>
              <li><Link href="/precios" className="text-muted-foreground hover:text-primary transition-colors">Precios</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Status y Uptime</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Empresa</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog Oficial</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Canales de Slack</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Programa de Partners</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-foreground">Legal y Soporte</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos y condiciones</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de privacidad</Link></li>
              <li className="pt-4 flex flex-col gap-1">
                <span className="text-muted-foreground/80 text-xs uppercase tracking-wider">Contacto Directo</span>
                <a href="mailto:team@datosperu.net" className="text-foreground hover:text-primary transition-colors">team@datosperu.net</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">+51 967 504 465</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-medium pb-4">
          <p>© {new Date().getFullYear()} DatosPeru.net. Todos los derechos reservados.</p>
          <div className="flex gap-4 items-center">
            Construido con amor.
          </div>
        </div>
      </div>
    </footer>
  );
}
