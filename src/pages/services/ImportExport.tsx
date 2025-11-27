import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PaintBucket, CheckCircle, ArrowRight, Phone, Globe, Package, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/services-hero.jpg";
import realisation1 from "@/assets/realisation-import-1.jpg";
import realisation2 from "@/assets/realisation-import-2.jpg";

const ImportExport = () => {
  const services = [
    "Importation de produits et équipements",
    "Exportation de matières premières",
    "Sourcing international",
    "Gestion douanière et administrative",
    "Transport et logistique internationale",
    "Conseil en commerce international",
    "Négociation avec fournisseurs",
    "Contrôle qualité des marchandises",
  ];

  const products = [
    {
      icon: Package,
      title: "Équipements Industriels",
      description: "Machines, outils et équipements pour l'industrie et le BTP",
    },
    {
      icon: Globe,
      title: "Matières Premières",
      description: "Import/export de matériaux de construction et consommables",
    },
    {
      icon: TrendingUp,
      title: "Produits Divers",
      description: "Large gamme de produits selon vos besoins spécifiques",
    },
  ];

  return (
    <div className="min-h-screen">
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
              alt="Services Horeb Group"
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
                <div className="p-4 bg-primary/20 rounded-lg">
                  <PaintBucket className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  Import/Export
                </h1>
              </div>
              
              <p className="text-xl text-white/90 leading-relaxed">
                Facilitez vos échanges internationaux avec Horeb Group Sarl. 
                Nous gérons l'importation et l'exportation de vos produits avec professionnalisme et efficacité, 
                en vous offrant un accès privilégié aux marchés internationaux.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Gallery Section - Nos Opérations */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Nos Opérations
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Infrastructure logistique et opérations import/export
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { img: realisation1, title: "Opérations Portuaires", desc: "Gestion de containers et cargo international" },
                { img: realisation2, title: "Stockage & Distribution", desc: "Entrepôts modernes et gestion logistique" },
              ].map((project, index) => (
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
                      src={project.img}
                      alt={project.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white font-bold text-xl mb-2">{project.title}</h3>
                        <p className="text-white/80">{project.desc}</p>
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
                  Services Import/Export
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  Fort de notre réseau de partenaires internationaux, nous facilitons vos transactions 
                  commerciales à l'échelle mondiale. De la recherche de fournisseurs à la livraison finale, 
                  nous gérons chaque étape du processus.
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
                  Catégories de Produits
                </h2>
                
                {products.map((product, index) => {
                  const Icon = product.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">
                            {product.title}
                          </h3>
                          <p className="text-muted-foreground">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                <div className="bg-navy-dark text-white p-8 rounded-lg mt-8">
                  <h3 className="text-2xl font-bold mb-4">Notre Expertise</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Réseau international de partenaires fiables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Gestion complète des formalités douanières</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Traçabilité et suivi en temps réel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <span>Tarifs négociés et compétitifs</span>
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
                Développez votre commerce international
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Contactez-nous pour discuter de vos besoins en import/export
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

export default ImportExport;