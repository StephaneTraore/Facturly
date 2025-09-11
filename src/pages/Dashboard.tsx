import { DashboardLayout } from "@/components/DashboardLayout"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { QuickActions } from "@/components/dashboard/QuickActions"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { 
  FileText, 
  Receipt, 
  CreditCard, 
  TrendingUp,
  Users,
  Euro
} from "lucide-react"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Tableau de Bord
          </h2>
          <p className="text-muted-foreground">
            Aperçu de votre activité de facturation
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Chiffre d'Affaires"
            value="24 580 €"
            change="+12% vs mois dernier"
            changeType="positive"
            icon={Euro}
            description="Ce mois"
          />
          <StatsCard
            title="Factures"
            value="47"
            change="+5 cette semaine"
            changeType="positive"
            icon={FileText}
            description="Total ce mois"
          />
          <StatsCard
            title="Devis en Attente"
            value="12"
            change="3 expires bientôt"
            changeType="neutral"
            icon={Receipt}
            description="À suivre"
          />
          <StatsCard
            title="Clients Actifs"
            value="89"
            change="+7 nouveaux"
            changeType="positive"
            icon={Users}
            description="Ce mois"
          />
        </div>

        {/* Graphique et actions rapides */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Activité récente */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentActivity />
          
          {/* Statuts des paiements */}
          <div className="grid gap-4">
            <StatsCard
              title="Factures Payées"
              value="34"
              change="94% de taux de paiement"
              changeType="positive"
              icon={TrendingUp}
              description="Ce mois"
            />
            <StatsCard
              title="En Retard"
              value="3"
              change="2 480 € à recouvrer"
              changeType="negative"
              icon={CreditCard}
              description="À relancer"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}