import { FileText, Calculator, CreditCard, Download, Clock, Shield } from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: FileText,
            title: "Factures professionnelles",
            description: "Créez des factures élégantes et conformes avec votre branding en quelques clics."
        },
        {
            icon: Calculator,
            title: "Devis automatisés",
            description: "Générez des devis détaillés et convertissez-les automatiquement en factures."
        },
        {
            icon: CreditCard,
            title: "Suivi des paiements",
            description: "Suivez vos paiements en temps réel et envoyez des rappels automatiques."
        },
        {
            icon: Download,
            title: "Export multiformat",
            description: "Exportez vos documents en PDF, Excel ou envoyez-les directement par email."
        },
        {
            icon: Clock,
            title: "Gain de temps",
            description: "Automatisez vos tâches répétitives et concentrez-vous sur votre business."
        },
        {
            icon: Shield,
            title: "Données sécurisées",
            description: "Vos données sont chiffrées et sauvegardées de manière sécurisée."
        }
    ];

    return (
        <section id="features" className="py-20 sm:px-6 lg:px-8 bg-secondary/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Tout ce dont vous avez besoin pour{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            facturer
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Une suite complète d'outils pour simplifier votre gestion administrative
                        et professionnaliser vos documents commerciaux.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-card hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/20"
                        >
                            <div className="mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-glow rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;