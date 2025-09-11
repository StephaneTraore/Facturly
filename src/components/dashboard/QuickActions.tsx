import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Receipt, CreditCard, Users, Download } from "lucide-react"

const actions = [
  {
    title: "Nouvelle Facture",
    description: "Créer une facture pour un client",
    icon: FileText,
    href: "/dashboard/invoices/new",
    color: "bg-primary"
  },
  {
    title: "Nouveau Devis",
    description: "Établir un devis personnalisé",
    icon: Receipt,
    href: "/dashboard/quotes/new",
    color: "bg-accent"
  },
  {
    title: "Nouvelle Quittance",
    description: "Générer une quittance de paiement",
    icon: CreditCard,
    href: "/dashboard/receipts/new",
    color: "bg-primary-glow"
  },
  {
    title: "Ajouter Client",
    description: "Enregistrer un nouveau client",
    icon: Users,
    href: "/dashboard/clients/new",
    color: "bg-secondary"
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Actions Rapides
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button 
                key={action.title}
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start gap-3 hover:shadow-md transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href={action.href}>
                  <div className="flex items-center gap-3 w-full">
                    <div className={`p-2 rounded-lg ${action.color} text-white`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </a>
              </Button>
            )
          })}
        </div>
        
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <a href="/dashboard/export" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter les données
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}