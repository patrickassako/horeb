import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const contactInfo = [
  {
    icon: Phone,
    title: "Téléphone",
    content: "+33 1 23 45 67 89",
    link: "tel:+33123456789",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@konta-btp.fr",
    link: "mailto:contact@konta-btp.fr",
  },
  {
    icon: MapPin,
    title: "Adresse",
    content: "123 Rue de la Construction, 75001 Paris",
    link: "#",
  },
];

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-semibold mb-3 tracking-wider uppercase text-sm">
            Contactez-nous
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Démarrez Votre Projet Aujourd'hui
          </h2>
          <motion.div
            className="w-24 h-1 bg-primary mx-auto"
            initial={{ width: 0 }}
            animate={inView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-border shadow-card">
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Nom complet
                    </label>
                    <Input
                      placeholder="Votre nom"
                      className="border-border focus:border-primary transition-colors"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.fr"
                      className="border-border focus:border-primary transition-colors"
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Téléphone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    className="border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Type de projet
                  </label>
                  <Input
                    placeholder="Ex: Construction neuve, Rénovation..."
                    className="border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    placeholder="Décrivez votre projet..."
                    rows={5}
                    className="border-border focus:border-primary resize-none transition-colors"
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-strong"
                  >
                    Envoyer le Message
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="prose prose-lg">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Parlons de Votre Projet
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Notre équipe d'experts est prête à vous accompagner dans tous vos projets
                de construction et de rénovation. N'hésitez pas à nous contacter pour un
                devis gratuit et personnalisé.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="p-6 bg-navy text-white border-0 mt-8">
                <h4 className="text-xl font-bold mb-3">Horaires d'Ouverture</h4>
                <div className="space-y-2 text-white/80">
                  <motion.div
                    className="flex justify-between"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Lundi - Vendredi</span>
                    <span className="font-semibold text-white">8h - 18h</span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Samedi</span>
                    <span className="font-semibold text-white">9h - 13h</span>
                  </motion.div>
                  <motion.div
                    className="flex justify-between"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Dimanche</span>
                    <span className="font-semibold text-white">Fermé</span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
