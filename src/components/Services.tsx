import { Building2, Hammer, PaintBucket, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: Building2,
    title: "Gros Œuvre",
    description:
      "Construction de structures solides et durables. Fondations, maçonnerie et charpente de qualité professionnelle.",
  },
  {
    icon: Hammer,
    title: "Rénovation",
    description:
      "Rénovation complète de bâtiments résidentiels et commerciaux. Modernisation et mise aux normes.",
  },
  {
    icon: PaintBucket,
    title: "Finitions",
    description:
      "Travaux de finition soignés : peinture, revêtements, et décoration pour sublimer vos espaces.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description:
      "Services de maintenance et réparation pour garantir la pérennité de vos installations.",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-primary font-semibold mb-3 tracking-wider uppercase text-sm">
            Nos Services
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Le Meilleur Service Pour Vous
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-strong transition-all duration-300 hover:-translate-y-2 border-border bg-card group cursor-pointer"
              >
                <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors">
                  <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
