import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

interface Contact {
    name: string;
    role: string;
    phone: string;
}

const contacts: Contact[] = [
    {
        name: "M. Fotso Nicodème",
        role: "Gérant",
        phone: "+237680279590",
    },
    {
        name: "Assistance",
        role: "Service Client",
        phone: "+237680279567",
    },
];

const WhatsAppButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleWhatsAppClick = (phone: string) => {
        const cleanPhone = phone.replace(/\D/g, "");
        const message = encodeURIComponent(
            "Bonjour, je vous contacte depuis le site web Horeb Group. Je souhaite avoir plus d'informations sur vos services."
        );
        window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-72 border border-gray-100"
                    >
                        <div className="mb-4">
                            <h3 className="font-bold text-navy text-lg">Contactez-nous</h3>
                            <p className="text-sm text-gray-500">Choisissez un contact</p>
                        </div>
                        <div className="space-y-3">
                            {contacts.map((contact, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => handleWhatsAppClick(contact.phone)}
                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition-colors group"
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="font-semibold text-navy group-hover:text-green-600 transition-colors">
                                            {contact.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{contact.role}</p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main WhatsApp Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-600 transition-colors relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={
                    isOpen
                        ? {}
                        : {
                            boxShadow: [
                                "0 0 0 0 rgba(34, 197, 94, 0.4)",
                                "0 0 0 20px rgba(34, 197, 94, 0)",
                            ],
                        }
                }
                transition={
                    isOpen
                        ? {}
                        : {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeOut",
                        }
                }
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-7 h-7" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="whatsapp"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-7 h-7" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default WhatsAppButton;
