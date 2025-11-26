import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Construction professionnelle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <p className="text-primary font-semibold mb-4 tracking-wider uppercase text-sm">
            Excellence en Construction
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Construction de Qualité
            <span className="block text-primary mt-2">
              Impressions Durables
            </span>
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl leading-relaxed">
            Nous sommes une entreprise de BTP reconnue pour notre expertise et notre engagement
            envers l'excellence. Transformons ensemble vos projets en réalité.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base shadow-strong transition-all hover:scale-105"
            >
              Nos Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-6 text-base transition-all"
            >
              <Phone className="mr-2 h-5 w-5" />
              Contactez-nous
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
