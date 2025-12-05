import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Settings } from "lucide-react";
import equipment1 from "@/assets/realisation-btp-3.jpg";
import equipment2 from "@/assets/realisation-import-1.jpg";
import equipment3 from "@/assets/realisation-import-2.jpg";
import equipment4 from "@/assets/realisation-services-1.jpg";

const EquipmentGallery = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const images = [equipment1, equipment2, equipment3, equipment4];

    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden" ref={ref}>
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-navy via-[#D4AF37] to-navy" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight">
                            Des outils à la hauteur <br />
                            <span className="bg-[#D4AF37]/20 px-2">de vos ambitions</span>
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Découvrez notre vaste gamme d'équipements de pointe, soigneusement entretenus et
                            constamment mis à jour, provenant des marques les plus renommées, garantissant une
                            efficacité maximale pour mener à bien tous vos projets de construction.
                        </p>
                    </motion.div>

                    {/* Decorative Sun/Gear Icon */}
                    <motion.div
                        className="hidden md:block absolute top-0 right-0 text-[#D4AF37]"
                        initial={{ opacity: 0, rotate: -90, scale: 0 }}
                        animate={inView ? { opacity: 1, rotate: 0, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Settings className="w-32 h-32 opacity-20 animate-spin-slow" />
                    </motion.div>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            className={`relative rounded-2xl overflow-hidden shadow-lg h-64 ${index === 0 || index === 3 ? "lg:col-span-2" : ""
                                }`}
                            initial={{ opacity: 0, y: 50 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <img
                                src={img}
                                alt={`Equipment ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EquipmentGallery;
