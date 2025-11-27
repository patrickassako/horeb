import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, CheckCircle, ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const BTP = () => {
  const services = [
    "Construction de bâtiments résidentiels",
    "Construction de bâtiments commerciaux",
    "Construction d'infrastructures hôtelières",
    "Rénovation et réhabilitation",
    "Aménagements extérieurs",
    "Travaux de génie civil",
    "Maçonnerie et gros œuvre",
    "Études et conception architecturale",
  ];

  const projects = [
    {
      title: "Projets Résidentiels",
      description: "Villas modernes, immeubles d'habitation et lotissements",
    },
    {
      title: "Projets Commerciaux",
      description: "Centres commerciaux, bureaux et espaces professionnels",
    },
    {
      title: "Projets Hôteliers",
      description: "Hôtels, restaurants et infrastructures touristiques",
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
                  <Building2 className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  BTP & Construction
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed">
                Horeb Group Sarl est votre partenaire de confiance pour tous vos projets de construction au Cameroun. 
                De la conception à la réalisation, nous garantissons qualité, durabilité et respect des délais.
              </p>
            </motion.div>
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
                  Nos Services BTP
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Nous offrons une gamme complète de services de construction et de rénovation, 
                  adaptés aux besoins spécifiques de chaque client. Notre équipe expérimentée 
                  assure la gestion complète de vos projets.
                </p>
                
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                    >
                      <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
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
                  Types de Projets
                </h2>
                
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:shadow-lg transition-all"
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
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Équipe d'experts qualifiés et expérimentés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Matériaux de qualité supérieure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Respect strict des délais</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Suivi et garantie après-travaux</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
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
                Prêt à démarrer votre projet ?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <Button size="lg" variant="outline" className="border-2 border-white bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6">
                    <Phone className="mr-2 h-5 w-5" />
                    Demander un Devis
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6">
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

export default BTP;