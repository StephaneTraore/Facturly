import { FileText, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    const footerLinks = {
        product: [
            { name: "Fonctionnalités", href: "#features" },
            { name: "Tarifs", href: "#pricing" },
            { name: "Démo", href: "#demo" },
            { name: "API", href: "#api" }
        ],
        support: [
            { name: "Centre d'aide", href: "#help" },
            { name: "Contact", href: "#contact" },
            { name: "Status", href: "#status" },
            { name: "Communauté", href: "#community" }
        ],
        company: [
            { name: "À propos", href: "#about" },
            { name: "Blog", href: "#blog" },
            { name: "Carrières", href: "#careers" },
            { name: "Partenaires", href: "#partners" }
        ],
        legal: [
            { name: "Confidentialité", href: "#privacy" },
            { name: "CGU", href: "#terms" },
            { name: "Mentions légales", href: "#legal" },
            { name: "RGPD", href: "#gdpr" }
        ]
    };

    return (
        <footer className="bg-foreground text-background py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold">Facturly</span>
                        </div>
                        <p className="text-background/70 mb-6 max-w-md">
                            La plateforme moderne pour créer vos factures, devis et quittances.
                            Simplifiez votre gestion administrative et gagnez du temps.
                        </p>
                        <div className="space-y-2 text-sm text-background/70">
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>contact@facturly.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+224 612 976 487</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>Conakry, Guinée</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-semibold mb-4">Produit</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 hover:text-background transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 hover:text-background transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Entreprise</h3>
                        <ul className="space-y-2 mb-6">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 hover:text-background transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <h3 className="font-semibold mb-4">Légal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 hover:text-background transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-background/70 text-sm">
                            © 2024 Facturly. Tous droits réservés.
                        </p>
                        <p className="text-background/70 text-sm mt-2 md:mt-0">
                            Fait en Guinée
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;