import { Button } from "@/components/ui/button";
import { FileText, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-foreground">Facturly</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                            Fonctionnalités
                        </a>
                        <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                            Tarifs
                        </a>
                        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                            À propos
                        </a>
                        <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </a>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login">
                            <Button variant="ghost">Se connecter</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="hero">Commencer</Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 space-y-4 border-t border-border">
                        <a href="#features" className="block text-muted-foreground hover:text-foreground transition-colors">
                            Fonctionnalités
                        </a>
                        <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">
                            Tarifs
                        </a>
                        <a href="#about" className="block text-muted-foreground hover:text-foreground transition-colors">
                            À propos
                        </a>
                        <a href="#contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                            Contact
                        </a>
                        <div className="pt-4 space-y-2">
                            <Link to="/login">
                                <Button variant="ghost" className="w-full">Se connecter</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="hero" className="w-full">Commencer</Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;