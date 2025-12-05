import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ConstructionCTA from "@/components/ConstructionCTA";
import ManagementFeatures from "@/components/ManagementFeatures";
import EquipmentGallery from "@/components/EquipmentGallery";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Horeb Group Sarl - Excellence en BTP & Services Multidisciplinaires</title>
        <meta name="description" content="Horeb Group Sarl : Votre partenaire de confiance au Cameroun pour le BTP, l'électricité, l'import-export et les services généraux. Solutions innovantes et durables." />
      </Helmet>
      <Navbar />
      <motion.main
        className="pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Services />
        <ManagementFeatures />
        <ConstructionCTA />
        <Projects />
        <EquipmentGallery />
        <Stats />
        <Contact />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Index;
