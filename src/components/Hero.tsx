import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-background.jpg";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -100, rotateX: -90 },
    visible: {
      opacity: 1,
      x: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image - Stable */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <motion.img
          src={heroImage}
          alt="Équipe Horeb Group sur le terrain"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/75 via-navy/65 to-navy/40" />
      </motion.div>

      {/* Animated Bubbles - Continuous */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(15)].map((_, i) => {
          const size = 20 + Math.random() * 60;
          const delay = Math.random() * 5;
          const duration = 8 + Math.random() * 6;
          const xPos = Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                bottom: -100,
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [0, Math.sin(i) * 50, 0],
                opacity: [0, 0.6, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* Content - Mobile Optimized */}
      <motion.div 
        className="container mx-auto px-4 md:px-6 relative z-10"
        style={{ opacity }}
      >
        <motion.div
          className="max-w-3xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={textVariants}
            className="text-primary font-semibold mb-3 md:mb-4 tracking-wider uppercase text-xs md:text-sm"
          >
            Votre Partenaire de Confiance
          </motion.p>
          
          <motion.h1
            variants={titleVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
          >
            <span className="block">Horeb Group Sarl</span>
            <span className="block text-primary mt-1 md:mt-2 text-2xl sm:text-3xl md:text-5xl lg:text-6xl">
              Bâtissons Ensemble Votre Avenir
            </span>
          </motion.h1>
          
          <motion.p
            variants={textVariants}
            className="text-base md:text-xl text-white/95 mb-6 md:mb-8 max-w-2xl leading-relaxed font-medium"
          >
            Expert camerounais en BTP, électricité et services généraux. 
            Transformons ensemble vos projets en succès garantis.
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 md:px-8 py-5 md:py-6 text-sm md:text-base shadow-strong transition-all group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  Découvrez Nos Expertises
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-6 md:px-8 py-5 md:py-6 text-sm md:text-base transition-all relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5 group-hover:rotate-12 transition-transform" />
                  Devis Gratuit
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-background to-transparent z-10" />
      
      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
