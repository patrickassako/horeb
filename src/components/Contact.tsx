import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

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
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-semibold mb-3 tracking-wider uppercase text-sm">
            Contactez-nous
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Démarrez Votre Projet Aujourd'hui
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="p-8 border-border shadow-card">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Nom complet
                  </label>
                  <Input
                    placeholder="Votre nom"
                    className="border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="votre@email.fr"
                    className="border-border focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Téléphone
                </label>
                <Input
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  className="border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Type de projet
                </label>
                <Input
                  placeholder="Ex: Construction neuve, Rénovation..."
                  className="border-border focus:border-primary"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  Message
                </label>
                <Textarea
                  placeholder="Décrivez votre projet..."
                  rows={5}
                  className="border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-strong"
              >
                Envoyer le Message
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
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
                  <a
                    key={index}
                    href={info.link}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground">{info.content}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <Card className="p-6 bg-navy text-white border-0 mt-8">
              <h4 className="text-xl font-bold mb-3">Horaires d'Ouverture</h4>
              <div className="space-y-2 text-white/80">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="font-semibold text-white">8h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span className="font-semibold text-white">9h - 13h</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span className="font-semibold text-white">Fermé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
