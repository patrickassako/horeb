import ServiceLayout from "@/components/ServiceLayout";
import { PaintBucket } from "lucide-react";
import heroImage from "@/assets/services-hero.jpg";
import realisation1 from "@/assets/realisation-import-1.jpg";
import realisation2 from "@/assets/realisation-import-2.jpg";

const ImportExport = () => {
  const services = [
    "Importation de produits et équipements",
    "Exportation de matières premières",
    "Sourcing international",
    "Gestion douanière et administrative",
    "Transport et logistique internationale",
    "Conseil en commerce international",
    "Négociation avec fournisseurs",
    "Contrôle qualité des marchandises",
  ];

  const products = [
    {
      title: "Équipements Industriels",
      description: "Machines, outils et équipements pour l'industrie et le BTP",
    },
    {
      title: "Matières Premières",
      description: "Import/export de matériaux de construction et consommables",
    },
    {
      title: "Produits Divers",
      description: "Large gamme de produits selon vos besoins spécifiques",
    },
  ];

  const gallery = [
    { img: realisation1, title: "Opérations Portuaires", desc: "Gestion de containers et cargo international" },
    { img: realisation2, title: "Stockage & Distribution", desc: "Entrepôts modernes et gestion logistique" },
  ];

  const whyChooseUs = [
    "Réseau international de partenaires fiables",
    "Gestion complète des formalités douanières",
    "Traçabilité et suivi en temps réel",
    "Tarifs négociés et compétitifs",
  ];

  return (
    <ServiceLayout
      title="Import/Export"
      description="Facilitez vos échanges internationaux avec Horeb Group Sarl. Nous gérons l'importation et l'exportation de vos produits avec professionnalisme et efficacité, en vous offrant un accès privilégié aux marchés internationaux."
      heroImage={heroImage}
      icon={<PaintBucket className="h-12 w-12 text-primary" />}
      services={services}
      projects={products}
      gallery={gallery}
      whyChooseUs={whyChooseUs}
      seoTitle="Import/Export - Horeb Group Sarl"
      seoDescription="Service d'import-export au Cameroun : sourcing, logistique internationale et dédouanement."
      servicesTitle="Services Import/Export"
      projectsTitle="Catégories de Produits"
    />
  );
};

export default ImportExport;