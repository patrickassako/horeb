import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>Contact - Horeb Group Sarl</title>
                <meta name="description" content="Contactez Horeb Group Sarl pour tous vos projets de construction, services généraux et plus encore. Devis gratuit et réponse rapide." />
            </Helmet>
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="relative py-20 bg-navy overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.h1
                            className="text-4xl md:text-6xl font-bold text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Contactez-nous
                        </motion.h1>
                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Une équipe à votre écoute pour concrétiser vos projets.
                        </motion.p>
                    </div>
                </section>

                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
