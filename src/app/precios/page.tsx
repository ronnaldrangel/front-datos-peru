"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Precios() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Gratis",
      desc: "Perfecto para probar nuestras APIs sin compromiso.",
      creditsText: "100 créditos por 30 días",
      priceMonthly: "Gratis",
      priceAnnual: "Gratis",
      features: [
        "Acceso a todas las APIs de consulta",
        "100 créditos por 30 días",
        "Soporte por email",
        "Documentación completa"
      ],
      buttonText: "Comenzar gratis"
    },
    {
      name: "Básico",
      desc: "Perfecto para pequeños negocios y desarrolladores independientes.",
      creditsText: "Créditos anual : 240,000",
      creditsMonthly: "Créditos mensual : 20,000",
      priceMonthly: "S/ 15",
      priceAnnual: "S/ 150",
      savings: "Ahorra S/30 con pago anual",
      features: [
        "Acceso a todas las APIs de consulta",
        "Soporte por email",
        "Documentación completa"
      ],
      buttonText: "Seleccionar plan"
    },
    {
      name: "Profesional",
      isPopular: true,
      desc: "Ideal para empresas medianas con mayor volumen de consultas.",
      creditsText: "Créditos anual : 600,000",
      creditsMonthly: "Créditos mensual : 50,000",
      priceMonthly: "S/ 25",
      priceAnnual: "S/ 250",
      savings: "Ahorra S/50 con pago anual",
      features: [
        "Descargas XML/PDF incluidas",
        "Dashboards con métricas en tiempo real",
        "Soporte prioritario"
      ],
      buttonText: "Comenzar ahora",
      popularBadge: "Más Popular"
    },
    {
      name: "Enterprise",
      desc: "Para grandes empresas con necesidades avanzadas.",
      creditsText: "Créditos anual : 1,800,000",
      creditsMonthly: "Créditos mensual : 150,000",
      priceMonthly: "S/ 45",
      priceAnnual: "S/ 450",
      savings: "Descuento preferencial anual",
      features: [
        "Todas las APIs + integraciones personalizadas",
        "Soporte 24/7",
        "Integración dedicada y consultor técnico"
      ],
      buttonText: "Seleccionar plan"
    }
  ];

  return (
    <>


        {/* Pricing Section */}
        <section className="py-16 px-0 md:px-0">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center mb-16 space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">Planes de Suscripción</h2>
              <div className="space-y-1">
                <p className="text-lg text-muted-foreground">Elige el plan que mejor se adapte a tus necesidades de consulta</p>
                <p className="text-sm text-muted-foreground/60">* Los precios no incluyen IGV</p>
              </div>

              <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-full mt-6 border border-border shadow-inner">
                <button 
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${!isAnnual ? 'bg-primary text-white border-primary shadow-sm' : 'text-muted-foreground hover:text-foreground border-transparent'}`}
                >
                  Mensual
                </button>
                <button 
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all border-2 ${isAnnual ? 'bg-primary text-white border-primary shadow-sm' : 'text-muted-foreground hover:text-foreground border-transparent'}`}
                >
                  Anual
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan, idx) => (
                <Card 
                  key={idx} 
                  className={`relative flex flex-col overflow-visible bg-card/40 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl ${
                    plan.isPopular 
                      ? 'border-primary shadow-primary/10 hover:shadow-primary/20 scale-100 lg:scale-105 z-10 bg-card/60' 
                      : 'border-border hover:border-border/80 hover:bg-card/60'
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 inset-x-0 flex justify-center">
                      <Badge className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm border-none">
                        {plan.popularBadge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8 px-6">
                    <CardTitle className="text-lg font-bold text-foreground mb-4">{plan.name}</CardTitle>
                    
                    <div className="h-8 mb-2 flex items-center justify-center">
                      {isAnnual && plan.savings && plan.name !== "Gratis" ? (
                        <span className="text-xs font-bold px-3 py-1 rounded-full text-primary bg-primary/10">
                          {plan.savings}
                        </span>
                      ) : (
                        <span className="text-xs font-bold">&nbsp;</span>
                      )}
                    </div>
                    
                    <div className="mb-4 flex items-center justify-center gap-1">
                      <span className="text-4xl font-extrabold text-foreground">
                        {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                      </span>
                      {plan.name !== "Gratis" && (
                        <span className="text-muted-foreground font-medium text-sm mt-3">/{isAnnual ? 'año' : 'mes'}</span>
                      )}
                    </div>
                    
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed h-10">
                      {plan.desc}
                    </CardDescription>
                    

                  </CardHeader>
                  
                  <CardContent className="px-6 flex-1">
                    <ul className="space-y-4 text-sm text-foreground/80 font-medium pb-6">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="px-6 pb-8 pt-0 mt-auto bg-transparent border-t-0">
                    <Button 
                      variant={plan.isPopular ? "default" : "outline"}
                      className={`w-full rounded-full py-6 text-base font-bold transition-all duration-300 ${
                        plan.isPopular 
                          ? 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:-translate-y-1 border-2 border-primary' 
                          : 'border-2 border-border hover:border-primary hover:text-primary bg-transparent hover:-translate-y-1'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
          </div>
        </section>
    </>
  );
}
