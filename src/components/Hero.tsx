import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-background.jpg";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse movement tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, window.innerWidth], [-20, 20]), springConfig);
  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax and Mouse Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, x, rotateX, rotateY, transformPerspective: 1200 }}
      >
        <motion.img
          src={heroImage}
          alt="Équipe Horeb Group sur le terrain"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, filter: "brightness(0.5)" }}
          animate={{ scale: 1, filter: "brightness(0.75)" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-navy-dark/70 via-navy/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-[1]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
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
            className="text-primary font-semibold mb-4 tracking-wider uppercase text-sm"
            whileHover={{ scale: 1.05, x: 10 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Votre Partenaire de Confiance
            </motion.span>
          </motion.p>
          
          <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05, color: "hsl(var(--primary))" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Horeb Group Sarl
            </motion.span>
            <motion.span 
              className="block text-primary mt-2"
              variants={subtitleVariants}
              whileHover={{ scale: 1.02, x: 10 }}
            >
              Bâtissons Ensemble Votre Avenir
            </motion.span>
          </motion.h1>
          
          <motion.p
            variants={textVariants}
            className="text-xl text-white/95 mb-8 max-w-2xl leading-relaxed font-medium"
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Expert camerounais en BTP, électricité et services généraux. 
              Transformons ensemble vos projets en succès garantis.
            </motion.span>
          </motion.p>
          
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-base shadow-strong transition-all group relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center">
                  Découvrez Nos Expertises
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
            </motion.div>
            
            <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-navy font-semibold px-8 py-6 text-base transition-all relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Devis Gratuit
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
      
      {/* Animated Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
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
