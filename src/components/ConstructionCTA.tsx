import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import constructionTeam from "@/assets/construction-team.jpg";
import { ArrowRight } from "lucide-react";

const ConstructionCTA = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="py-20 bg-background" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Left Content - Gold Background */}
                    <motion.div
                        className="bg-[#D4AF37] p-12 md:p-16 flex flex-col justify-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Construisons mieux !
                        </h2>
                        <p className="text-white/90 text-lg mb-8 leading-relaxed">
                            Transformez la complexité de vos chantiers en simplicité grâce à notre approche
                            experte de gestion de projets dans le secteur BTP, pour des constructions
                            fluides et réussies à chaque étape.
                        </p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                className="bg-white text-[#D4AF37] hover:bg-white/90 font-bold px-8 py-6 rounded-full shadow-lg text-lg"
                            >
                                Contactez-nous
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        className="relative h-64 lg:h-auto"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img
                            src={constructionTeam}
                            alt="Équipe Horeb Group sur chantier"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/20 to-transparent lg:hidden" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ConstructionCTA;
