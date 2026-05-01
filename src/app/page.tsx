import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, MoveRight, Terminal, Zap, ShieldCheck, BarChart2, Lock, Check, Database, CheckCircle2, Play, Search, MessageSquare, Smartphone } from "lucide-react";

export default function Home() {
  const apiCards = [
    {
      title: "DNI",
      description: "Consulta datos completos de personas naturales",
      features: ["Código de verificación", "Nombres", "Apellido Paterno", "Apellido Materno"],
      credits: 1,
    },
    {
      title: "RUC",
      description: "Información detallada de empresas y personas jurídicas",
      features: ["Número RUC", "Nombre o razón social", "Estado y condición", "Dirección completa", "Ubigeo"],
      credits: 1,
    },
    {
      title: "Anexos (Establecimientos)",
      description: "Consulta de establecimientos y anexos de empresas",
      features: ["Lista de establecimientos", "Direcciones de anexos", "Código de establecimiento", "Estado del anexo", "Actividad económica"],
      credits: 1,
    },
    {
      title: "Representante Legal",
      description: "Datos del representante legal de la empresa",
      features: ["Nombres del representante", "DNI del representante", "Cargo en la empresa", "Fecha de nombramiento", "Estado del cargo"],
      credits: 1,
    },
    {
      title: "Carnet de Extranjería",
      description: "Consulta datos de extranjeros residentes en Perú",
      features: ["Nombres", "Apellido Paterno", "Apellido Materno"],
      credits: 1,
    },
    {
      title: "Placa Vehicular",
      description: "Datos de vehículos registrados en el Perú",
      features: ["Marca", "Modelo", "Serie", "Color", "Motor"],
      credits: 5,
    },
    {
      title: "SOAT",
      description: "Verificación del seguro obligatorio de accidentes de tránsito",
      features: ["Estado del SOAT", "Vigencia del seguro", "Compañía aseguradora", "Número de póliza", "Fecha de vencimiento"],
      credits: 5,
    },
    {
      title: "Licencia de Conducir",
      description: "Verificación de licencias de conducir vigentes",
      features: ["Titular de la licencia", "Clase de licencia", "Fecha de vencimiento", "Estado de la licencia"],
      credits: 5,
    },
    {
      title: "Tipo de Cambio",
      description: "Tipo de cambio oficial del día",
      features: ["Tipo de cambio compra", "Tipo de cambio venta", "Fecha de consulta", "Fuente oficial (SUNAT/SBS)"],
      credits: 1,
    },
    {
      title: "Consulta CPE",
      description: "Verificación de comprobantes de pago electrónicos",
      features: ["Validación de CPE", "Estado del comprobante", "Datos del emisor", "Monto y fecha"],
      credits: 1,
    }
  ];

  return (
    <>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 right-0 -z-10 -translate-y-1/2 translate-x-1/3 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
            {/* Left Column */}
            <div className="flex flex-col items-start text-left space-y-8 max-w-2xl relative z-10">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Todas las APIs que tu proyecto <span className="text-primary">necesita en un solo lugar</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Con DatosPeru.net centralizas tus consultas. Accede a RUC, DNI, SOAT, Placas, Licencias y valida comprobantes de SUNAT en milisegundos con la plataforma más estable del país.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-0.5">
                  Empieza gratis
                  <MoveRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1"><Check className="h-4 w-4 text-primary" /></div>
                  Consultas RUC/DNI rápídas
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1"><Check className="h-4 w-4 text-primary" /></div>
                  Fácil integración
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-primary/10 p-1"><Check className="h-4 w-4 text-primary" /></div>
                  Soporte 24/7
                </div>
              </div>
            </div>

            {/* Right Column - Mockup */}
            <div className="relative mx-auto w-full max-w-[600px] lg:ml-auto z-10">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/30 to-purple-500/20 rounded-[2rem] blur-xl opacity-50"></div>
              <div className="relative rounded-2xl bg-background border border-border shadow-2xl shadow-primary/10 overflow-hidden flex flex-col">
                <div className="flex items-center px-4 py-3 bg-muted/30/80 border-b border-border backdrop-blur-sm">
                  <div className="flex gap-1.5 flex-1">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400 border border-amber-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20"></div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground font-medium px-3 py-1 bg-background border border-border rounded-md shadow-sm">api.datosperu.net/v1/dashboard</div>
                  <div className="flex-1"></div>
                </div>
                <div className="flex-1 p-6 bg-background overflow-hidden">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold text-foreground">Dashboard de Consultas</h3>
                      <p className="text-sm text-muted-foreground">24 peticiones recientes</p>
                    </div>
                    <Badge className="bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 border-emerald-200 dark:border-emerald-500/30">En línea</Badge>
                  </div>

                  <div className="space-y-4">
                    {[
                      { type: "GET", endpoint: "/v1/dni/74581290", status: 200, time: "42ms" },
                      { type: "GET", endpoint: "/v1/ruc/20100070970", status: 200, time: "85ms" },
                      { type: "GET", endpoint: "/v1/placa/ABC-123", status: 200, time: "112ms" },
                      { type: "POST", endpoint: "/v1/sunat/xml", status: 201, time: "310ms" },
                      { type: "GET", endpoint: "/v1/whatsapp/send", status: 200, time: "94ms" },
                    ].map((req, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-muted hover:border-border hover:bg-muted/30 transition-colors shadow-sm cursor-default">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded w-12 text-center shadow-xs ${req.type === 'GET' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                            {req.type}
                          </span>
                          <span className="font-mono text-sm text-muted-foreground truncate max-w-[200px] sm:max-w-[250px]">{req.endpoint}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono text-muted-foreground/80">{req.time}</span>
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3 w-3" /> {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* APIs Services */}
        <section id="apis" className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
              <div className="flex items-center gap-4 justify-center w-full max-w-sm mb-2">
                <div className="h-px bg-zinc-300 flex-1"></div>
                <span className="text-xs font-bold tracking-widest text-muted-foreground/80 uppercase">APIS</span>
                <div className="h-px bg-zinc-300 flex-1"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Conoce <span className="text-primary">nuestras APIs</span></h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Integra servicios confiables usando infraestructura diseñada para soportar millones de peticiones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-auto">
              {apiCards.map((api, idx) => (
                <Card key={idx} className="border border-border bg-gradient-to-br from-card to-muted/30 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col">
                  <CardHeader className="px-5 pt-5 pb-3">
                    <CardTitle className="text-lg font-bold text-foreground">{api.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed mt-1">
                      {api.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-bold text-foreground">Información incluida:</span>
                    </div>
                    <ul className="space-y-2.5 text-xs text-muted-foreground font-medium mb-4 flex-1">
                      {api.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Integration / Code Snippet */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center mx-auto">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground rounded-full px-4 py-1.5 text-sm font-semibold">
                  <Terminal className="h-4 w-4" /> <span>Desarrolladores</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Integración <span className="text-primary">fácil y directa</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Conéctate con JSON, REST y ejemplos listos. Hacer una solicitud es tan fácil como copiar y pegar. Olvídate de configuraciones complicadas.
                </p>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">1</div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Genera tu Token</h4>
                      <p className="text-muted-foreground mt-1">Regístrate y obtén un Token Bearer seguro desde tu dashboard personal.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">2</div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Configura el Endpoint</h4>
                      <p className="text-muted-foreground mt-1">Usa la URL estándar basada en REST e inyecta tus parámetros de búsqueda.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">3</div>
                    <div>
                      <h4 className="text-lg font-bold text-foreground">Recibe Datos</h4>
                      <p className="text-muted-foreground mt-1">Obtén la información validada y tipada en formato JSON casi al instante.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code Tabs */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent blur-2xl rounded-[3rem] -z-10"></div>
                <Tabs defaultValue="curl" className="w-full">
                  <div className="bg-foreground dark:bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-foreground/90 dark:bg-zinc-900/50">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/10 dark:bg-emerald-500/200"></div>
                      </div>
                      <TabsList className="bg-transparent h-8 space-x-1 p-0">
                        <TabsTrigger value="curl" className="h-8 px-4 text-xs font-mono text-muted-foreground/80 bg-transparent data-[state=active]:bg-muted-foreground/20 dark:bg-zinc-800 data-[state=active]:text-zinc-100 data-[state=active]:shadow-none rounded-md border border-transparent data-[state=active]:border-zinc-700 transition-all">cURL</TabsTrigger>
                        <TabsTrigger value="node" className="h-8 px-4 text-xs font-mono text-muted-foreground/80 bg-transparent data-[state=active]:bg-muted-foreground/20 dark:bg-zinc-800 data-[state=active]:text-zinc-100 data-[state=active]:shadow-none rounded-md border border-transparent data-[state=active]:border-zinc-700 transition-all">Node.js</TabsTrigger>
                        <TabsTrigger value="python" className="h-8 px-4 text-xs font-mono text-muted-foreground/80 bg-transparent data-[state=active]:bg-muted-foreground/20 dark:bg-zinc-800 data-[state=active]:text-zinc-100 data-[state=active]:shadow-none rounded-md border border-transparent data-[state=active]:border-zinc-700 transition-all">Python</TabsTrigger>
                        <TabsTrigger value="php" className="h-8 px-4 text-xs font-mono text-muted-foreground/80 bg-transparent data-[state=active]:bg-muted-foreground/20 dark:bg-zinc-800 data-[state=active]:text-zinc-100 data-[state=active]:shadow-none rounded-md border border-transparent data-[state=active]:border-zinc-700 transition-all">PHP</TabsTrigger>
                      </TabsList>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/80 hover:text-white hover:bg-muted-foreground/20 dark:bg-zinc-800 ml-2 rounded-md">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="relative">
                      <TabsContent value="curl" className="p-6 m-0 outline-none">
                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-zinc-300">
                          <code>
                            <span className="text-pink-400">curl</span> --request GET \<br />
                            &nbsp;&nbsp;--url <span className="text-emerald-400">"https://api.datosperu.net/v1/ruc/20100070970"</span> \<br />
                            &nbsp;&nbsp;--header <span className="text-emerald-400">"Authorization: Bearer TU_TOKEN"</span>
                            <br /><br />
                            <span className="text-muted-foreground">// Result:</span><br />
                            &#123;<br />
                            &nbsp;&nbsp;<span className="text-sky-300">"success"</span>: <span className="text-amber-300">true</span>,<br />
                            &nbsp;&nbsp;<span className="text-sky-300">"data"</span>: &#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"ruc"</span>: <span className="text-emerald-400">"20100070970"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"razon_social"</span>: <span className="text-emerald-400">"BANCO DE LA NACION"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"estado"</span>: <span className="text-emerald-400">"ACTIVO"</span>,<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"condicion"</span>: <span className="text-emerald-400">"HABIDO"</span><br />
                            &nbsp;&nbsp;&#125;<br />
                            &#125;
                          </code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="node" className="p-6 m-0 outline-none">
                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-zinc-300">
                          <code>
                            <span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> <span className="text-sky-300">fetch</span>(<span className="text-emerald-400">"https://api.datosperu.net/v1/ruc/20100070970"</span>, &#123;<br />
                            &nbsp;&nbsp;headers: &#123;<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-300">"Authorization"</span>: <span className="text-emerald-400">"Bearer TU_TOKEN"</span><br />
                            &nbsp;&nbsp;&#125;<br />
                            &#125;);<br /><br />
                            <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> response.<span className="text-sky-300">json</span>();<br />
                            <span className="text-sky-300">console</span>.<span className="text-sky-300">log</span>(data);
                          </code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="python" className="p-6 m-0 outline-none">
                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-zinc-300">
                          <code>
                            <span className="text-purple-400">import</span> requests<br /><br />
                            url = <span className="text-emerald-400">"https://api.datosperu.net/v1/ruc/20100070970"</span><br />
                            headers = &#123;<br />
                            &nbsp;&nbsp;<span className="text-sky-300">"Authorization"</span>: <span className="text-emerald-400">"Bearer TU_TOKEN"</span><br />
                            &#125;<br /><br />
                            response = requests.<span className="text-sky-300">get</span>(url, headers=headers)<br />
                            <span className="text-sky-300">print</span>(response.<span className="text-sky-300">json</span>())
                          </code>
                        </pre>
                      </TabsContent>
                      <TabsContent value="php" className="p-6 m-0 outline-none">
                        <pre className="text-sm font-mono leading-relaxed overflow-x-auto text-zinc-300">
                          <code>
                            <span className="text-purple-400">$curl</span> = <span className="text-sky-300">curl_init</span>();<br /><br />
                            <span className="text-sky-300">curl_setopt_array</span>(<span className="text-purple-400">$curl</span>, [<br />
                            &nbsp;&nbsp;CURLOPT_URL {"=>"} <span className="text-emerald-400">"https://api.datosperu.net/v1/ruc/20100070970"</span>,<br />
                            &nbsp;&nbsp;CURLOPT_RETURNTRANSFER {"=>"} <span className="text-amber-300">true</span>,<br />
                            &nbsp;&nbsp;CURLOPT_HTTPHEADER {"=>"} [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-400">"Authorization: Bearer TU_TOKEN"</span><br />
                            &nbsp;&nbsp;],<br />
                            ]);<br /><br />
                            <span className="text-purple-400">$response</span> = <span className="text-sky-300">curl_exec</span>(<span className="text-purple-400">$curl</span>);<br />
                            <span className="text-sky-300">echo</span> <span className="text-purple-400">$response</span>;
                          </code>
                        </pre>
                      </TabsContent>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clientes" className="py-24 bg-background overflow-hidden border-y border-border">
          <div className="container mx-auto px-6 max-w-7xl mb-16">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center gap-4 justify-center w-full max-w-sm mb-2">
                <div className="h-px bg-border flex-1"></div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase">Clientes</span>
                <div className="h-px bg-border flex-1"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Clientes <span className="text-primary">que confían en nosotros</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Empresas de todos los sectores eligen nuestros servicios para potenciar su crecimiento
              </p>
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-marquee gap-12 items-center">
              {[
                "alianza-francesa.avif",
                "bzlinks.avif",
                "clinicapna.avif",
                "ebombo.avif",
                "lacalera.avif",
                "ludfact.avif",
                "misventas.avif",
                "notiscan.avif",
                "tucomprobante.avif",
                "wazend.avif",
              ].map((logo, i) => (
                <div key={`set1-${i}`} className="flex-shrink-0 w-40 h-20 transition-all duration-300 flex items-center justify-center p-4">
                  <img
                    src={`/assets/${logo}`}
                    alt="Cliente"
                    className="max-w-full max-h-full object-contain pointer-events-none"
                  />
                </div>
              ))}
              {/* Repeat the same set for a seamless infinite loop */}
              {[
                "alianza-francesa.avif",
                "bzlinks.avif",
                "clinicapna.avif",
                "ebombo.avif",
                "lacalera.avif",
                "ludfact.avif",
                "misventas.avif",
                "notiscan.avif",
                "tucomprobante.avif",
                "wazend.avif",
              ].map((logo, i) => (
                <div key={`set2-${i}`} className="flex-shrink-0 w-40 h-20 transition-all duration-300 flex items-center justify-center p-4">
                  <img
                    src={`/assets/${logo}`}
                    alt="Cliente"
                    className="max-w-full max-h-full object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="py-32 bg-background">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Preguntas frecuentes</h2>
              <p className="text-xl text-muted-foreground">Respuestas rápidas a las dudas más comunes sobre nuestros servicios.</p>
            </div>

            <Accordion defaultValue={["item-1"]} className="w-full space-y-4">
              <AccordionItem value="item-1" className="border border-border rounded-xl bg-background px-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-bold text-foreground/90 hover:no-underline hover:text-primary transition-colors">¿Qué datos puedo consultar con la API de RUC?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  Puedes acceder a la Razón Social, estado del contribuyente (Activo, Baja, etc.), condición (Habido, No Habido), dirección fiscal, ubigeo y representantes legales directamente desde SUNAT.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border border-border rounded-xl bg-background px-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-bold text-foreground/90 hover:no-underline hover:text-primary transition-colors">¿Las consultas DNI están conectadas a RENIEC?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  Sí, nuestra API consulta en tiempo real fuentes validables que extraen la información oficial de los ciudadanos con un nivel de exactitud del 100%.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border border-border rounded-xl bg-background px-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-bold text-foreground/90 hover:no-underline hover:text-primary transition-colors">¿Cómo funciona la API de WhatsApp?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  Se vincula un dispositivo emisor con QR code o Pairing Code a nuestro servidor especializado. Luego envías solicitudes HTTP a nuestra API, y el servidor envía los mensajes por ti utilizando tus propios números de forma segura.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border border-border rounded-xl bg-background px-6 py-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
                <AccordionTrigger className="text-lg font-bold text-foreground/90 hover:no-underline hover:text-primary transition-colors">¿Tienen límite de consultas gratuitas?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  Sí, ofrecemos un plan gratuito permanente que te permite hacer pruebas y pequeñas integraciones con cuotas mensuales para que inicies tu proyecto sin costo inicial.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="bg-primary/20 p-4 rounded-2xl shrink-0">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-foreground">¿No encuentras la respuesta que buscas?</h4>
                  <p className="text-muted-foreground mt-1 text-lg">Nuestro equipo de soporte técnico estará encantado de ayudarte en todo el proceso.</p>
                </div>
              </div>
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 px-8 h-14 text-lg whitespace-nowrap">
                Contactar a soporte
              </Button>
            </div>
          </div>
        </section>
    </>
  );
}
