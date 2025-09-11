import { Star } from "lucide-react";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Mariama Camara",
            role: "Consultante freelance",
            company: "MC Consulting",
            content: "Facturly a révolutionné ma gestion administrative. Je passe maintenant 3x moins de temps sur mes factures !",
            rating: 5,
            avatar: "MC"
        },
        {
            name: "Oumar Diallo",
            role: "Directeur",
            company: "TechStart SAS",
            content: "Interface intuitive et fonctionnalités complètes. Nos clients apprécient la qualité professionnelle de nos devis.",
            rating: 5,
            avatar: "OD"
        },
        {
            name: "Fatoumata Diaraye Barry",
            role: "Comptable",
            company: "Diallo & Associés",
            content: "Le suivi des paiements automatique nous fait économiser des heures chaque semaine. Un outil indispensable !",
            rating: 5,
            avatar: "FB"
        }
    ];

    return (
        <section className="py-20 sm:px-6 lg:px-8 bg-secondary/30">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Ce que disent nos{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            clients
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Plus de 10,000 entreprises nous font confiance pour leur facturation
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-center space-x-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                                ))}
                            </div>

                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                "{testimonial.content}"
                            </p>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role} • {testimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;