import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const faqs = [
        {
            question: "Puis-je essayer Facturly gratuitement ?",
            answer: "Oui ! Nous offrons 30 jours d'essai gratuit sur tous nos plans. Aucune carte bancaire n'est requise pour commencer."
        },
        {
            question: "Mes données sont-elles sécurisées ?",
            answer: "Absolument. Toutes vos données sont chiffrées et stockées sur des serveurs sécurisés certifiés ISO 27001. Nous respectons le RGPD."
        },
        {
            question: "Puis-je personnaliser mes factures ?",
            answer: "Oui, vous pouvez ajouter votre logo, personnaliser les couleurs, et modifier les templates selon votre charte graphique."
        },
        {
            question: "Facturly est-il conforme à la législation française ?",
            answer: "Oui, nos factures respectent toutes les obligations légales françaises et européennes en matière de facturation."
        },
        {
            question: "Puis-je importer mes données existantes ?",
            answer: "Oui, nous proposons des outils d'import pour vos clients, produits et factures depuis Excel, CSV ou d'autres logiciels de facturation."
        },
        {
            question: "Y a-t-il des frais de mise en place ?",
            answer: "Aucun ! Il n'y a pas de frais de mise en place, d'installation ou de résiliation. Vous ne payez que votre abonnement mensuel."
        }
    ];

    return (
        <section className="py-20 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Questions{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            fréquentes
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Vous avez des questions ? Nous avons les réponses !
                    </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-border rounded-lg px-6 bg-card"
                        >
                            <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        Vous ne trouvez pas la réponse à votre question ?
                    </p>
                    <a
                        href="mailto:support@Facturly-plus.com"
                        className="text-primary hover:text-primary/80 font-medium"
                    >
                        Contactez notre équipe support
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FAQ;