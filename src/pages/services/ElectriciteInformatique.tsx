import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Wrench, CheckCircle, ArrowRight, Phone, Zap, Monitor, Wifi } from "lucide-react";
import { Link } from "react-router-dom";

const ElectriciteInformatique = () => {
  const electricalServices = [
    "Installation électrique complète",
    "Mise aux normes électriques",
    "Maintenance et dépannage",
    "Systèmes d'éclairage",
    "Tableaux électriques",
    "Câblage et distribution",
  ];

  const itServices = [
    "Vente de matériel informatique",
    "Installation de réseaux",
    "Maintenance informatique",
    "Création de sites web",
    "Développement d'applications",
    "Conseil en solutions IT",
  ];

  const solutions = [
    {
      icon: Zap,
      title: "Électricité",
      description: "Installation et maintenance de systèmes électriques performants et sécurisés",
    },
    {
      icon: Monitor,
      title: "Informatique",
      description: "Solutions IT complètes, du matériel aux logiciels personnalisés",
    },
    {
      icon: Wifi,
      title: "Réseaux",
      description: "Installation et configuration de réseaux câblés et sans fil",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-navy-dark via-navy to-navy-dark overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,119,0,0.3),transparent_50%)]" />
          </div>
          
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
                <div className="p-4 bg-primary/20 rounded-lg">
                  <Wrench className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Électricité & Informatique
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed">
                Des installations électriques aux solutions informatiques avancées, 
                Horeb Group Sarl vous accompagne dans tous vos projets technologiques. 
                Expertise, innovation et fiabilité pour votre entreprise.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Solutions Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Nos Solutions Technologiques
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Une expertise technique complète pour répondre à tous vos besoins
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="p-8 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border hover:border-primary transition-all hover:shadow-lg"
                  >
                    <div className="p-4 bg-primary/10 rounded-lg inline-block mb-4">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {solution.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Details */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Electrical Services */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card p-8 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Services Électriques
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Installation, maintenance et dépannage de tous types de systèmes électriques 
                  pour particuliers et professionnels.
                </p>
                
                <div className="space-y-3">
                  {electricalServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* IT Services */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card p-8 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Monitor className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">
                    Services Informatiques
                  </h2>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Solutions informatiques complètes, du matériel aux développements web 
                  et applications sur mesure.
                </p>
                
                <div className="space-y-3">
                  {itServices.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-background rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{service}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-12 bg-navy-dark text-white p-8 rounded-lg"
            >
              <h3 className="text-2xl font-bold mb-4">Pourquoi Nous Faire Confiance ?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Techniciens certifiés et expérimentés</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Matériel de qualité professionnelle</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Interventions rapides et efficaces</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <span>Garantie et support après-vente</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Un projet électrique ou informatique ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Nos experts sont à votre disposition pour vous conseiller
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="border-2 border-white bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Contactez-Nous
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6">
                    Découvrir Tous les Services
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

export default ElectriciteInformatique;