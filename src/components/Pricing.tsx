import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const Pricing = () => {
    const plans = [
        {
            name: "Starter",
            price: "90k",
            period: "/mois",
            description: "Parfait pour les freelances et petites entreprises",
            features: [
                "10 factures par mois",
                "5 devis par mois",
                "Support par email",
                "Templates de base",
                "Export PDF"
            ],
            popular: false
        },
        {
            name: "Business",
            price: "300k",
            period: "/mois",
            description: "Idéal pour les entreprises en croissance",
            features: [
                "Factures illimitées",
                "Devis illimités",
                "Support prioritaire",
                "Templates personnalisés",
                "Multi-devises",
                "Rappels automatiques",
                "Analytiques avancées"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "800k",
            period: "/mois",
            description: "Pour les grandes entreprises avec besoins spécifiques",
            features: [
                "Tout du plan Business",
                "API complète",
                "Support dédié",
                "Intégrations avancées",
                "Comptes multiples",
                "Rapports personnalisés",
                "Formation incluse"
            ],
            popular: false
        }
    ];

    return (
        <section id="pricing" className="py-20 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Tarifs{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            transparents
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choisissez le plan qui correspond à vos besoins.
                        Changez ou annulez à tout moment.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-2xl border transition-all duration-300 ${plan.popular
                                    ? "border-primary shadow-lg scale-105 bg-gradient-to-b from-card to-secondary/20"
                                    : "border-border bg-card hover:shadow-lg hover:border-primary/20"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="flex items-center space-x-1 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                                        <Star className="h-4 w-4 fill-current" />
                                        <span>Populaire</span>
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-foreground mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                    {plan.description}
                                </p>
                                <div className="flex items-baseline justify-center">
                                    <span className="text-4xl font-bold text-foreground">
                                        {plan.price} GNF
                                    </span>
                                    <span className="text-muted-foreground ml-1">
                                        {plan.period}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-start space-x-3">
                                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.popular ? "hero" : "outline"}
                                className="w-full"
                                size="lg"
                            >
                                {plan.popular ? "Commencer maintenant" : "Essayer gratuitement"}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        🎉 <strong>Offre de lancement :</strong> 30 jours d'essai gratuit sur tous les plans
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Aucune carte bancaire requise • Annulation à tout moment
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Pricing;