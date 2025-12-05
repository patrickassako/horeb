import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import logoHoreb from "@/assets/logo-horeb.jpg";

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const socialLinks = [
    { icon: Facebook, href: "https://web.facebook.com/profile.php?id=61560264476890" },
    { icon: Instagram, href: "https://www.instagram.com/horebgroupsarl" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white pt-20 pb-10" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logoHoreb} alt="Horeb Group" className="h-14 w-auto rounded-sm" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Avec Horeb Group, les fondations solides pour bâtir un avenir durable.
              Excellence et innovation au service de vos projets.
            </p>
          </motion.div>

          {/* Entreprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { name: "Accueil", href: "/" },
                { name: "Services", href: "/services" },
                { name: "À Propos", href: "/a-propos" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="text-white/70 hover:text-[#D4AF37] transition-colors inline-block"
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h3 className="text-[#D4AF37] font-bold text-lg mb-6">Contacts</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">✉</span>
                <a href="mailto:horebgroupsarl@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  horebgroupsarl@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">📞</span>
                <a href="tel:+237680279567" className="text-gray-400 hover:text-white transition-colors">
                  +237 680 279 567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4AF37] mt-1">📍</span>
                <span className="text-gray-400">
                  Mbalngong, Yaoundé, Cameroun
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-500 text-sm">
            © 2024 Horeb Group Sarl. Tous les droits réservés.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-white transition-all text-gray-400"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
