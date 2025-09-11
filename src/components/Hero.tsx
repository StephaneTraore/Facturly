import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
    return (
        <section className="pt-24 pb-12 sm:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                                Créez vos{" "}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    factures
                                </span>{" "}
                                en quelques clics
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                La plateforme moderne pour générer facilement vos factures, devis et quittances.
                                Simplifiez votre gestion administrative et gagnez du temps.
                            </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-3">
                            {[
                                "Création rapide de factures professionnelles",
                                "Gestion automatisée des devis",
                                "Suivi des paiements en temps réel",
                                "Export PDF en un clic"
                            ].map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                                    <span className="text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button variant="hero" size="lg" className="group">
                                Commencer gratuitement
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" size="lg">
                                Voir la démo
                            </Button>
                        </div>

                        {/* Social proof */}
                        <div className="pt-8">
                            <p className="text-sm text-muted-foreground mb-4">
                                Déjà plus de 10,000+ entreprises nous font confiance
                            </p>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                src={heroImage}
                                alt="Tableau de bord Facturly"
                                className="w-full h-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-accent to-primary rounded-full opacity-20 blur-xl"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;