import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import registerIllustration from "@/assets/register-illustration.jpg";
import { toast } from "sonner";

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        // TODO: Implement registration logic when backend is connected
        console.log("Register attempt:", formData);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/5 to-primary-glow/10 items-center justify-center p-8">
                <div className="max-w-lg space-y-6">
                    <img
                        src={registerIllustration}
                        alt="Illustration d'inscription"
                        className="w-full h-auto rounded-2xl shadow-2xl"
                    />
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-semibold text-foreground">
                            Rejoignez Facturly
                        </h2>
                        <p className="text-muted-foreground">
                            Commencez dès aujourd'hui à simplifier votre gestion administrative
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="flex-1 flex items-center justify-center px-2 py-8 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center gap-4 mb-8">
                        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Retour
                        </Link>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                            Facturly
                        </h1>
                        <p className="text-muted-foreground">
                            Créez votre compte professionnel
                        </p>
                    </div>

                    <Card className="border-border/50 shadow-lg">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center">Inscription</CardTitle>
                            <CardDescription className="text-center">
                                Remplissez les informations pour créer votre compte
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input
                                            id="firstName"
                                            placeholder="Alpha Boubacar"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                            className="transition-all duration-200 focus:scale-[1.02]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input
                                            id="lastName"
                                            placeholder="Diaby"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                            className="transition-all duration-200 focus:scale-[1.02]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="company">Entreprise (optionnel)</Label>
                                    <Input
                                        id="company"
                                        placeholder="Vitemonbillet SARL"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="transition-all duration-200 focus:scale-[1.02]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="alpha@exemple.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="transition-all duration-200 focus:scale-[1.02]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                            className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                            className="pr-10 transition-all duration-200 focus:scale-[1.02]"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" variant="hero" onClick={() => { toast.success("Yoo ! Allons molo, c'est pas encore dispo cette partie") }}>
                                    Créer mon compte
                                </Button>

                                <div className="text-center text-sm text-muted-foreground">
                                    Déjà un compte ?{" "}
                                    <Link to="/login" className="text-primary hover:text-primary-glow transition-colors font-medium">
                                        Se connecter
                                    </Link>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}