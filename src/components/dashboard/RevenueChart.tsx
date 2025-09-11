import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

const data = [
  { name: "Jan", revenue: 4000, invoices: 12 },
  { name: "Fév", revenue: 3000, invoices: 8 },
  { name: "Mar", revenue: 5000, invoices: 15 },
  { name: "Avr", revenue: 4500, invoices: 13 },
  { name: "Mai", revenue: 6000, invoices: 18 },
  { name: "Jun", revenue: 5500, invoices: 16 },
  { name: "Jul", revenue: 7000, invoices: 22 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Évolution du Chiffre d'Affaires
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <Tooltip 
              formatter={(value, name) => [
                `${value}${name === 'revenue' ? ' €' : ''}`,
                name === 'revenue' ? 'Chiffre d\'affaires' : 'Nombre de factures'
              ]}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            <Bar 
              dataKey="revenue" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}