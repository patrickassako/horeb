import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    title: "Complexe Commercial",
    category: "Construction Neuve",
    image: project1,
  },
  {
    title: "Résidence Moderne",
    category: "Résidentiel",
    image: project2,
  },
  {
    title: "Rénovation Haut de Gamme",
    category: "Rénovation",
    image: project3,
  },
];

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-semibold mb-3 tracking-wider uppercase text-sm">
              Nos Réalisations
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Construire Vos Projets de Rêve
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-strong group"
            >
              Voir Tous les Projets
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group overflow-hidden border-border hover:shadow-strong transition-all duration-300 cursor-pointer">
                <div className="relative h-80 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/50 to-transparent"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 0.95 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      className="text-primary font-semibold mb-2 text-sm uppercase tracking-wider"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {project.category}
                    </motion.p>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <div className="flex items-center text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Voir le projet</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
