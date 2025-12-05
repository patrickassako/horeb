import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { ArrowRight, Building2, Wrench, Globe, Home, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/services-hero.jpg";

const Services = () => {
    const services = [
        {
            icon: Building2,
            title: "BTP & Construction",
            description: "Construction résidentielle, commerciale et infrastructures publiques.",
            link: "/services/btp",
            color: "bg-blue-500",
        },
        {
            icon: Wrench,
            title: "Services Généraux",
            description: "Maintenance, entretien et gestion de vos installations.",
            link: "/services/services-generaux",
            color: "bg-green-500",
        },
        {
            icon: Globe,
            title: "Import / Export",
            description: "Solutions logistiques internationales et négoce.",
            link: "/services/import-export",
            color: "bg-orange-500",
        },
        {
            icon: Home,
            title: "Mobilier & Immobilier",
            description: "Aménagement intérieur et promotion immobilière.",
            link: "/services/immobilier",
            color: "bg-purple-500",
        },
        {
            icon: Zap,
            title: "Électricité & Informatique",
            description: "Installations électriques et solutions IT avancées.",
            link: "/services/electricite-informatique",
            color: "bg-yellow-500",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Nos Services - Horeb Group Sarl</title>
                <meta name="description" content="Découvrez l'ensemble des services d'Horeb Group : BTP, Services Généraux, Import-Export, Immobilier, Électricité et Informatique." />
            </Helmet>
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-navy overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={heroImage}
                            alt="Services Hero"
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-navy" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Nos Domaines d'Expertise
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Une approche multidisciplinaire pour répondre à tous vos besoins avec excellence et professionnalisme.
                        </motion.p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => {
                                const Icon = service.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={service.link} className="block h-full">
                                            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full group">
                                                <div className={`w-14 h-14 rounded-xl ${service.color} bg-opacity-10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                                    <Icon className={`w-7 h-7 ${service.color.replace('bg-', 'text-')}`} />
                                                </div>
                                                <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-secondary transition-colors">
                                                    {service.title}
                                                </h3>
                                                <p className="text-gray-600 mb-6">
                                                    {service.description}
                                                </p>
                                                <div className="flex items-center text-secondary font-semibold group-hover:translate-x-2 transition-transform">
                                                    En savoir plus <ArrowRight className="ml-2 w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default Services;
