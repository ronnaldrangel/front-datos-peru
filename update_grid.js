const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// Ensure Database and Zap are imported from lucide-react
if (!content.includes('Database')) {
  content = content.replace(/import \{([^}]+)\} from "lucide-react"/, (match, p1) => {
    return 'import {' + p1 + ', Database, Zap} from "lucide-react"';
  });
}

const apisData = `const apiCards = [
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
];`;

const startStr = '<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">';
const endStr = '</div>\n          </div>\n        </section>';
const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  const newGrid = `<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1400px] mx-auto">
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
                  <div className="px-5 py-3 border-t border-border mt-auto flex items-center justify-between bg-muted/20 rounded-b-xl border-dashed">
                      <span className="text-xs text-muted-foreground font-medium">Consumo:</span>
                      <div className="flex items-center gap-1 bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-md">
                        <Zap className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold">{api.credits} {api.credits === 1 ? 'crédito' : 'créditos'}</span>
                      </div>
                  </div>
                </Card>
              ))}
            </div>`;

  content = content.substring(0, startIndex) + newGrid + '\n' + content.substring(endIndex);
  
  // Inject the apiCards array right before the return statement of Landing() function
  const returnIndex = content.indexOf('return (');
  if (returnIndex !== -1 && !content.includes('apiCards = [')) {
    content = content.substring(0, returnIndex) + apisData + '\n\n  ' + content.substring(returnIndex);
  }
  
  fs.writeFileSync('src/app/page.tsx', content);
  console.log('Replaced successfully');
} else {
  console.log('Could not find boundaries');
}
