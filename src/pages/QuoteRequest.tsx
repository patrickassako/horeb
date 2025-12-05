import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

type QuoteFormData = {
    name: string;
    email: string;
    phone: string;
    company: string;
    service_category: string;
    budget_range: string;
    project_details: string;
};

const SERVICE_CATEGORIES = [
    "BTP & Construction",
    "Génie Civil",
    "Hydraulique & Forages",
    "Commerce Général & Négoce",
    "Prestations de Services",
    "Autre"
];

const BUDGET_RANGES = [
    "Moins de 1 000 000 FCFA",
    "1M - 5M FCFA",
    "5M - 20M FCFA",
    "20M - 50M FCFA",
    "Plus de 50M FCFA",
    "À définir"
];

const QuoteRequest = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<QuoteFormData>({
        defaultValues: {
            service_category: "",
            budget_range: ""
        }
    });

    const onSubmit = async (data: QuoteFormData) => {
        setLoading(true);
        try {
            const { error } = await supabase.from("quote_requests").insert([data]);

            if (error) throw error;

            setSubmitted(true);
            toast({
                title: "Demande envoyée !",
                description: "Nous avons bien reçu votre demande de devis. Notre équipe vous contactera sous 24h.",
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Erreur",
                description: "Une erreur est survenue: " + error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Demande de Devis - Horeb Group Sarl</title>
                <meta name="description" content="Obtenez un devis gratuit et personnalisé pour vos projets de construction, génie civil ou prestations de services." />
            </Helmet>
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Demandez votre Devis Gratuit</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Remplissez le formulaire ci-dessous pour nous parler de votre projet.
                            Nous analyserons vos besoins et vous proposerons une solution sur mesure.
                        </p>
                    </motion.div>

                    <div className="max-w-3xl mx-auto">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-bold text-green-800 mb-4">Merci pour votre confiance !</h2>
                                <p className="text-lg text-green-700 mb-8">
                                    Votre demande a été transmise à notre équipe commerciale.
                                    Nous vous contacterons très rapidement pour affiner votre besoin.
                                </p>
                                <Button
                                    className="bg-navy hover:bg-navy/90 text-white"
                                    onClick={() => window.location.href = "/"}
                                >
                                    Retour à l'accueil
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card className="border-t-4 border-t-secondary shadow-lg">
                                    <CardHeader>
                                        <CardTitle>Détails du Projet</CardTitle>
                                        <CardDescription>Tous les champs marqués d'une astérisque (*) sont obligatoires.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name">Nom complet *</Label>
                                                    <Input
                                                        id="name"
                                                        {...register("name", { required: "Ce champ est requis" })}
                                                        placeholder="Votre nom"
                                                    />
                                                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="company">Entreprise (Optionnel)</Label>
                                                    <Input
                                                        id="company"
                                                        {...register("company")}
                                                        placeholder="Nom de votre société"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Email *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        {...register("email", { required: "Ce champ est requis" })}
                                                        placeholder="exemple@email.com"
                                                    />
                                                    {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone">Téléphone *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        {...register("phone", { required: "Ce champ est requis" })}
                                                        placeholder="+237..."
                                                    />
                                                    {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Type de Service *</Label>
                                                    <Select onValueChange={(val) => setValue("service_category", val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionnez une catégorie" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {SERVICE_CATEGORIES.map((cat) => (
                                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {!watch("service_category") && submitted && <span className="text-red-500 text-xs">Veuillez sélectionner une catégorie</span>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Budget Estimatif (Optionnel)</Label>
                                                    <Select onValueChange={(val) => setValue("budget_range", val)}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Sélectionnez une plage" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {BUDGET_RANGES.map((range) => (
                                                                <SelectItem key={range} value={range}>{range}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="project_details">Description du Projet *</Label>
                                                <Textarea
                                                    id="project_details"
                                                    {...register("project_details", { required: "Veuillez décrire votre projet" })}
                                                    placeholder="Décrivez vos besoins, les spécificités techniques, la localisation, etc."
                                                    rows={6}
                                                    className="resize-none"
                                                />
                                                {errors.project_details && <span className="text-red-500 text-xs">{errors.project_details.message}</span>}
                                            </div>

                                            <Button type="submit" className="w-full bg-navy hover:bg-navy/90 text-white text-lg py-6" disabled={loading}>
                                                {loading ? (
                                                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi en cours...</>
                                                ) : (
                                                    "Envoyer ma demande de devis"
                                                )}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default QuoteRequest;
