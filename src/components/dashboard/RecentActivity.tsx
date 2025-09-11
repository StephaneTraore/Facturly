import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Receipt, CreditCard, Clock } from "lucide-react"

interface Activity {
  id: string
  type: "invoice" | "quote" | "receipt"
  title: string
  client: string
  amount: string
  status: "draft" | "sent" | "paid" | "overdue"
  date: string
}

const activities: Activity[] = [
  {
    id: "1",
    type: "invoice",
    title: "Facture #2024-001",
    client: "Entreprise ABC",
    amount: "2 450 €",
    status: "paid",
    date: "Il y a 2h"
  },
  {
    id: "2",
    type: "quote",
    title: "Devis #2024-045",
    client: "Société XYZ",
    amount: "1 800 €",
    status: "sent",
    date: "Il y a 4h"
  },
  {
    id: "3",
    type: "receipt",
    title: "Quittance #2024-123",
    client: "Client DEF",
    amount: "850 €",
    status: "paid",
    date: "Il y a 6h"
  },
  {
    id: "4",
    type: "invoice",
    title: "Facture #2024-002",
    client: "Startup GHI",
    amount: "3 200 €",
    status: "overdue",
    date: "Il y a 1j"
  }
]

const typeIcons = {
  invoice: FileText,
  quote: Receipt,
  receipt: CreditCard
}

const statusConfig = {
  draft: { label: "Brouillon", variant: "secondary" as const },
  sent: { label: "Envoyé", variant: "default" as const },
  paid: { label: "Payé", variant: "default" as const },
  overdue: { label: "En retard", variant: "destructive" as const }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Activité Récente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = typeIcons[activity.type]
            const status = statusConfig[activity.status]
            
            return (
              <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{activity.amount}</span>
                    <Badge variant={status.variant} className="text-xs">
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}