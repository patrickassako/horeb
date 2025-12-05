import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, ArrowRight } from "lucide-react";
import featureImage1 from "@/assets/realisation-btp-1.jpg";
import featureImage2 from "@/assets/realisation-btp-2.jpg";

const features = [
    "Gestion de projet efficace",
    "Matériaux de qualité",
    "Livraison dans les délais",
    "Satisfaction garantie",
];

const ManagementFeatures = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <section className="py-20 bg-white overflow-hidden" ref={ref}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-[#D4AF37] font-semibold mb-3 tracking-wider uppercase text-sm">
                            Pourquoi choisir Horeb Group ?
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
                            Faciliter la gestion de <br />
                            <span className="relative inline-block">
                                vos constructions BTP
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D4AF37]/20 -z-10" />
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                            Transformez la complexité de vos chantiers en simplicité grâce à notre approche
                            experte de gestion de projets dans le secteur BTP, pour des constructions
                            fluides et réussies à chaque étape.
                        </p>

                        <div className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <div className="p-1 rounded-full bg-[#D4AF37]/10">
                                        <CheckCircle className="h-5 w-5 text-[#D4AF37]" />
                                    </div>
                                    <span className="text-navy font-bold text-lg">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                size="lg"
                                className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white font-bold px-8 py-6 rounded-full shadow-lg"
                            >
                                Nous découvrir
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Images - Collage */}
                    <div className="relative h-[600px] hidden lg:block">
                        <motion.div
                            className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl z-10"
                            initial={{ opacity: 0, y: -50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <img
                                src={featureImage1}
                                alt="Construction site"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-white z-20"
                            initial={{ opacity: 0, y: 50, x: -50 }}
                            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <img
                                src={featureImage2}
                                alt="Construction worker"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute top-1/2 left-10 w-20 h-20 bg-[#D4AF37] rounded-full blur-3xl opacity-20"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ManagementFeatures;
