import {
    LayoutDashboard,
    FileText,
    Receipt,
    Users,
    Settings,
    BarChart3,
    Plus,
    CreditCard
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

const mainItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Factures", url: "/dashboard/invoices", icon: FileText },
    { title: "Devis", url: "/dashboard/quotes", icon: Receipt },
    { title: "Quittances", url: "/dashboard/receipts", icon: CreditCard },
    { title: "Clients", url: "/dashboard/clients", icon: Users },
]

const actionItems = [
    { title: "Nouvelle Facture", url: "/dashboard/invoices/new", icon: Plus },
    { title: "Nouveau Devis", url: "/dashboard/quotes/new", icon: Plus },
]

const otherItems = [
    { title: "Statistiques", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Paramètres", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
    const { open } = useSidebar()
    const location = useLocation()
    const currentPath = location.pathname

    const isActive = (path: string) => currentPath === path
    const getNavCls = ({ isActive }: { isActive: boolean }) =>
        `w-full ${isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50"}`

    return (
        <Sidebar className={!open ? "w-14" : "w-64"} collapsible="icon">
            <SidebarContent className="bg-background">
                {/* Logo */}
                <div className="p-6 border-b">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        {open && (
                            <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                                Facturly
                            </span>
                        )}
                    </div>
                </div>

                {/* Navigation principale */}
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className={getNavCls}>
                                            <item.icon className="w-4 h-4" />
                                            {open && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Actions rapides */}
                <SidebarGroup>
                    <SidebarGroupLabel>Actions Rapides</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {actionItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className={getNavCls}>
                                            <item.icon className="w-4 h-4" />
                                            {open && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Autres */}
                <SidebarGroup>
                    <SidebarGroupLabel>Autres</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {otherItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink to={item.url} className={getNavCls}>
                                            <item.icon className="w-4 h-4" />
                                            {open && <span>{item.title}</span>}
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}