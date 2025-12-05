import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";

interface ServiceProject {
    title: string;
    description: string;
}

interface GalleryItem {
    img: string;
    title: string;
    desc: string;
}

interface ServiceLayoutProps {
    title: string;
    description: string;
    heroImage: string;
    icon: ReactNode;
    services: string[];
    projects: ServiceProject[];
    gallery: GalleryItem[];
    whyChooseUs: string[];
    seoTitle: string;
    seoDescription: string;
    projectsTitle?: string;
    servicesTitle?: string;
}

const ServiceLayout = ({
    title,
    description,
    heroImage,
    icon,
    services,
    projects,
    gallery,
    whyChooseUs,
    seoTitle,
    seoDescription,
    projectsTitle = "Types de Projets",
    servicesTitle = "Nos Services"
}: ServiceLayoutProps) => {
    return (
        <div className="min-h-screen">
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
            </Helmet>
            <Navbar />
            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                    >
                        <img
                            src={heroImage}
                            alt={`Services Horeb Group - ${title}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy-dark/85" />
                    </motion.div>

                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <Link to="/" className="inline-flex items-center text-primary hover:text-primary/80 mb-6 transition-colors">
                                <ArrowRight className="h-5 w-5 rotate-180 mr-2" />
                                Retour à l'accueil
                            </Link>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-4 bg-secondary/20 rounded-lg">
                                    {icon}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white">
                                    {title}
                                </h1>
                            </div>

                            <p className="text-xl text-white/90 leading-relaxed">
                                {description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Gallery Section - Nos Réalisations */}
                <section className="py-20 bg-gradient-to-br from-background to-muted/30">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                                Nos Réalisations
                            </h2>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Découvrez quelques-uns de nos projets achevés avec succès
                            </p>
                        </motion.div>

                        <div className={`grid md:grid-cols-${gallery.length > 2 ? '3' : '2'} gap-8`}>
                            {gallery.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    whileHover={{ y: -10 }}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative overflow-hidden rounded-lg shadow-lg">
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                                                <p className="text-white/80">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Details */}
                <section className="py-20 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    {servicesTitle}
                                </h2>
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Nous offrons une gamme complète de services adaptés aux besoins spécifiques de chaque client.
                                    Notre équipe expérimentée assure la gestion complète de vos projets.
                                </p>

                                <div className="space-y-4">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-secondary transition-colors"
                                        >
                                            <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
                                            <span className="text-foreground font-medium">{service}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    {projectsTitle}
                                </h2>

                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.2 }}
                                        className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-lg border border-secondary/20 hover:shadow-lg transition-all"
                                    >
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground">
                                            {project.description}
                                        </p>
                                    </motion.div>
                                ))}

                                <div className="bg-navy-dark text-white p-8 rounded-lg mt-8">
                                    <h3 className="text-2xl font-bold mb-4">Pourquoi nous choisir ?</h3>
                                    <ul className="space-y-3">
                                        {whyChooseUs.map((reason, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                                                <span>{reason}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
                                Prêt à démarrer votre projet ?
                            </h2>
                            <p className="text-xl text-navy/80 mb-8">
                                Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/#contact">
                                    <Button size="lg" className="bg-navy hover:bg-navy/90 text-white font-semibold px-8 py-6 shadow-lg">
                                        <Phone className="mr-2 h-5 w-5" />
                                        Demander un Devis
                                    </Button>
                                </Link>
                                <Link to="/">
                                    <Button size="lg" variant="outline" className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold px-8 py-6 bg-transparent">
                                        Voir Tous les Services
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ServiceLayout;
