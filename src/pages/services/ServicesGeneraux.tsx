import ServiceLayout from "@/components/ServiceLayout";
import { Hammer } from "lucide-react";
import heroImage from "@/assets/services-hero.jpg";
import realisation1 from "@/assets/realisation-services-1.jpg";
import realisation2 from "@/assets/realisation-services-2.jpg";

const ServicesGeneraux = () => {
  const services = [
    "Fournitures de bureau et équipements",
    "Transport et logistique",
    "Entretien et maintenance",
    "Nettoyage professionnel",
    "Gestion de stocks",
    "Location d'équipements",
    "Services de sécurité",
    "Gestion des installations",
  ];

  const sectors = [
    {
      title: "Entreprises",
      description: "Solutions complètes pour vos besoins quotidiens en entreprise",
    },
    {
      title: "Institutions",
      description: "Services adaptés aux écoles, hôpitaux et administrations",
    },
    {
      title: "Événementiel",
      description: "Organisation et logistique pour vos événements professionnels",
    },
  ];

  const gallery = [
    { img: realisation1, title: "Fournitures Bureau", desc: "Équipement complet d'espaces professionnels" },
    { img: realisation2, title: "Transport & Logistique", desc: "Flotte de véhicules pour tous vos besoins" },
  ];

  const whyChooseUs = [
    "Disponibilité et réactivité 24/7",
    "Équipements modernes et performants",
    "Personnel qualifié et formé",
    "Tarifs compétitifs et transparents",
  ];

  return (
    <ServiceLayout
      title="Services Généraux"
      description="Simplifiez la gestion de votre entreprise avec nos services généraux complets. Nous prenons en charge tous vos besoins opérationnels pour que vous puissiez vous concentrer sur votre cœur de métier."
      heroImage={heroImage}
      icon={<Hammer className="h-12 w-12 text-primary" />}
      services={services}
      projects={sectors}
      gallery={gallery}
      whyChooseUs={whyChooseUs}
      seoTitle="Services Généraux - Horeb Group Sarl"
      seoDescription="Services généraux pour entreprises au Cameroun : fournitures, maintenance, logistique et nettoyage."
      servicesTitle="Notre Gamme de Services"
      projectsTitle="Secteurs d'Activité"
    />
  );
};

export default ServicesGeneraux;