import { Building2, Hammer, PaintBucket, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: Building2,
    title: "Gros Œuvre",
    description:
      "Construction de structures solides et durables. Fondations, maçonnerie et charpente de qualité professionnelle.",
  },
  {
    icon: Hammer,
    title: "Rénovation",
    description:
      "Rénovation complète de bâtiments résidentiels et commerciaux. Modernisation et mise aux normes.",
  },
  {
    icon: PaintBucket,
    title: "Finitions",
    description:
      "Travaux de finition soignés : peinture, revêtements, et décoration pour sublimer vos espaces.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Services de maintenance et réparation pour garantir la pérennité de vos installations.",
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
            Nos Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Le Meilleur Service Pour Vous
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
                <Card className="p-8 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-border bg-card group cursor-pointer h-full">
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
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
