import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Stats from "@/components/Stats";
import { CheckCircle, Users, Target, Award } from "lucide-react";
import teamGroup from "@/assets/team-group.jpg";


const About = () => {
    const values = [
        {
            icon: Target,
            title: "Excellence",
            description: "Nous visons la perfection dans chaque projet, grand ou petit.",
        },
        {
            icon: Users,
            title: "Intégrité",
            description: "Transparence et honnêteté sont au cœur de nos relations.",
        },
        {
            icon: Award,
            title: "Innovation",
            description: "Des solutions modernes pour des défis contemporains.",
        },
    ];

    const team = [
        {
            name: "M. Fotso Takoukam Nicodème",
            role: "Gérant",
            image: "/images/team/fotso-nicodeme.jpg",
        },
        {
            name: "M. Wonyu Olivier",
            role: "Directeur de Projet",
            image: "/images/team/bipan-levis.jpg",
        },
        {
            name: "M. Bipan Levis Stéphane",
            role: "Directeur Technique",
            image: "/images/team/wonyu-olivier.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>À Propos - Horeb Group Sarl</title>
                <meta name="description" content="Découvrez l'histoire, les valeurs et l'équipe d'Horeb Group Sarl, votre partenaire de confiance au Cameroun." />
            </Helmet>
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-navy overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            À Propos de Nous
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Bâtir l'avenir avec passion, expertise et engagement.
                        </motion.p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={teamGroup}
                                    alt="Horeb Group Team"
                                    className="rounded-3xl shadow-2xl w-full"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
                                    Notre Histoire
                                </h2>
                                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                                    Fondée en 2024, Horeb Group Sarl est née d'une vision simple : offrir une solution unique et complète pour les besoins complexes de construction et de services au Cameroun.
                                </p>
                                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                    Nous avons réuni une équipe d'experts passionnés dans divers domaines - du BTP à l'informatique - pour créer une synergie capable de relever tous les défis. Aujourd'hui, nous sommes fiers d'être un partenaire de confiance pour les particuliers et les entreprises.
                                </p>
                                <div className="space-y-4">
                                    {["Expertise Multidisciplinaire", "Service Client Dédié", "Qualité Garantie"].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <CheckCircle className="text-secondary w-6 h-6" />
                                            <span className="text-navy font-semibold text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Nos Valeurs</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Les principes qui guident chacune de nos actions et décisions.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {values.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="bg-white p-8 rounded-2xl shadow-lg text-center"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <div className="w-16 h-16 bg-navy/5 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-xl font-bold text-navy mb-4">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <Stats />

                {/* Team Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Notre Équipe</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Des professionnels dévoués à la réussite de votre projet.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative overflow-hidden rounded-2xl shadow-lg"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-96 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent flex flex-col justify-end p-8">
                                        <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-secondary font-medium">{member.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default About;
