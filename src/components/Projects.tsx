import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const Projects = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_featured", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    if (projects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  if (loading || projects.length === 0) {
    // Optional: Loading state or hidden if no projects
    return null;
  }

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4 relative inline-block">
              Nos réalisations
              <span className="absolute bottom-2 right-0 w-1/3 h-3 bg-[#D4AF37]/20 -z-10" />
            </h2>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Bienvenue dans notre galerie de réussites, où chaque projet est une histoire de détermination,
              d'expertise et de satisfaction client.
            </p>
          </motion.div>

          {/* Slider Controls */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-navy text-navy hover:bg-navy hover:text-white"
              onClick={prevProject}
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-navy text-white hover:bg-navy/90"
              onClick={nextProject}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Featured Project Layout */}
        <div className="relative rounded-3xl overflow-hidden h-[500px] md:h-[600px] shadow-2xl">
          <motion.img
            key={currentProject.id} // Re-animate on change
            src={currentProject.image_url || "/placeholder.svg"}
            alt={currentProject.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-3xl">
            <span className="inline-block px-3 py-1 bg-[#D4AF37] text-navy text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              {currentProject.service_category}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {currentProject.title}
            </h3>
            <p className="text-white/80 mb-6 line-clamp-2">
              {currentProject.description}
            </p>
            <Link to="/contact">
              <Button variant="link" className="text-white hover:text-[#D4AF37] p-0 text-lg font-medium group">
                En savoir plus
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Floating CTA Card */}
          <motion.div
            className="absolute top-1/2 right-8 md:right-12 transform -translate-y-1/2 bg-white p-8 rounded-2xl shadow-xl max-w-md hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-navy mb-6">
              N'attendez plus pour réaliser votre projet
            </h3>
            <Link to="/contact">
              <Button
                size="lg"
                className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold py-6 rounded-full shadow-lg"
              >
                Contactez-nous
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Dots */}
        <div className="flex justify-start gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-navy" : "bg-gray-300"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
