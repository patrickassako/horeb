import { Building2, Hammer, PaintBucket, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "BTP & Construction",
    description:
      "Construction de bâtiments résidentiels, commerciaux et hôteliers. Rénovation et aménagements extérieurs de qualité professionnelle.",
    link: "/services/btp",
  },
  {
    icon: Hammer,
    title: "Services Généraux",
    description:
      "Fournitures de bureau et équipements, transport et logistique, entretien et maintenance pour vos besoins quotidiens.",
    link: "/services/services-generaux",
  },
  {
    icon: PaintBucket,
    title: "Import/Export",
    description:
      "Importation et exportation de produits divers, équipements, consommables et matières premières avec partenaires internationaux.",
    link: "/services/import-export",
  },
  {
    icon: Wrench,
    title: "Électricité & Informatique",
    description:
      "Installation électrique, maintenance de réseaux, vente de matériel informatique, création de sites web et applications.",
    link: "/services/electricite-informatique",
  },
];

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold mb-3 tracking-wider uppercase text-sm">
            Nos Domaines d'Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Solutions Multidisciplinaires
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Link to={service.link}>
                  <Card className="p-8 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-border bg-card group cursor-pointer h-full flex flex-col">
                    <motion.div
                      className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {service.description}
                    </p>
                    <Button
                      variant="ghost"
                      className="w-full group-hover:bg-primary/10 transition-colors mt-auto"
                    >
                      En savoir plus
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
