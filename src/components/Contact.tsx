import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
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
    title: "Téléphones",
    content: "+237 680 279 567 / 590",
    link: "tel:+237680279567",
  },
  {
    icon: Mail,
    title: "Email",
    content: "horebgroupsarl@gmail.com",
    link: "mailto:horebgroupsarl@gmail.com",
  },
  {
    icon: MapPin,
    title: "Siège Social",
    content: "Mbalngong, Yaoundé, Cameroun",
    link: "#",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contacts").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.projectType, // Mapping projectType to subject
        message: formData.message,
      });

      if (error) throw error;

      toast({
        title: "Message envoyé !",
        description: "Nous vous recontacterons très prochainement.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-secondary font-semibold mb-3 tracking-wider uppercase text-sm">
            Contactez-Nous
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            C'est Où Vous Devez Être
          </h2>
          <motion.div
            className="w-24 h-1 bg-secondary mx-auto"
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="text-sm font-semibold text-foreground mb-2 block">
                      Nom complet
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      className="border-border focus:border-primary transition-colors"
                      required
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
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.fr"
                      className="border-border focus:border-primary transition-colors"
                      required
                    />
                  </motion.div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Téléphone
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+237 6..."
                    className="border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Type de projet
                  </label>
                  <Input
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    placeholder="Ex: Construction neuve, Rénovation..."
                    className="border-border focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet..."
                    rows={5}
                    className="border-border focus:border-secondary transition-colors"
                    required
                  />
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-strong"
                    disabled={loading}
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le Message"}
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
                Notre équipe dynamique composée de techniciens, ingénieurs et logisticiens
                est prête à réaliser vos projets avec rigueur, innovation et confiance.
                Contactez-nous pour un devis personnalisé.
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
                      className="p-3 bg-secondary/10 rounded-lg group-hover:bg-secondary transition-colors"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-6 w-6 text-secondary group-hover:text-navy transition-colors" />
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
    </section >
  );
};

export default Contact;
