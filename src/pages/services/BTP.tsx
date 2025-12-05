import ServiceLayout from "@/components/ServiceLayout";
import { Building2 } from "lucide-react";
import heroImage from "@/assets/services-hero.jpg";
import realisation3 from "@/assets/realisation-btp-3.jpg";

import duplexKribi1 from "@/assets/duplex-kribi-1.jpg";
import duplexKribi2 from "@/assets/duplex-kribi-2.jpg";

const BTP = () => {
  const services = [
    "Construction de bâtiments résidentiels",
    "Construction de bâtiments commerciaux",
    "Construction d'infrastructures hôtelières",
    "Rénovation et réhabilitation",
    "Aménagements extérieurs",
    "Travaux de génie civil",
    "Maçonnerie et gros œuvre",
    "Études et conception architecturale",
  ];

  const projects = [
    {
      title: "Projets Résidentiels",
      description: "Villas modernes, immeubles d'habitation et lotissements",
    },
    {
      title: "Projets Commerciaux",
      description: "Centres commerciaux, bureaux et espaces professionnels",
    },
    {
      title: "Projets Hôteliers",
      description: "Hôtels, restaurants et infrastructures touristiques",
    },
  ];

  const gallery = [
    { img: duplexKribi1, title: "Conception d'un Duplex", desc: "Dans la ville de Kribi - Usage Habitation" },
    { img: duplexKribi2, title: "Vue Extérieure", desc: "Duplex Moderne à Kribi" },
    { img: realisation3, title: "Infrastructure Hôtelière", desc: "Hôtel de luxe avec piscine" },
  ];

  const whyChooseUs = [
    "Équipe d'experts qualifiés et expérimentés",
    "Matériaux de qualité supérieure",
    "Respect strict des délais",
    "Suivi et garantie après-travaux",
  ];

  return (
    <ServiceLayout
      title="BTP & Construction"
      description="Horeb Group Sarl est votre partenaire de confiance pour tous vos projets de construction au Cameroun. De la conception à la réalisation, nous garantissons qualité, durabilité et respect des délais."
      heroImage={heroImage}
      icon={<Building2 className="h-12 w-12 text-primary" />}
      services={services}
      projects={projects}
      gallery={gallery}
      whyChooseUs={whyChooseUs}
      seoTitle="BTP & Construction - Horeb Group Sarl"
      seoDescription="Expert en construction BTP au Cameroun : bâtiments résidentiels, commerciaux, rénovation et génie civil. Qualité et respect des délais garantis."
      servicesTitle="Nos Services BTP"
      projectsTitle="Types de Projets"
    />
  );
};

export default BTP;