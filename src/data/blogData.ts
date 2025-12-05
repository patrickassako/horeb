export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "construction-hotel-kribi",
        title: "Suivi technique de l'Hôtel Horizon à Kribi",
        excerpt:
            "Découvrez les coulisses de notre suivi technique pour la construction de l'Hôtel Horizon, un projet d'envergure sur la côte camerounaise.",
        content: `
## Un projet ambitieux sur la côte camerounaise

L'Hôtel Horizon à Kribi représente l'un de nos projets les plus emblématiques. Situé face à l'océan Atlantique, cet établissement de standing a nécessité une coordination technique minutieuse.

### Les défis relevés

- **Contraintes environnementales** : Construction en zone côtière avec gestion de l'érosion
- **Standards internationaux** : Respect des normes hôtelières de haut standing
- **Délais serrés** : Livraison dans les temps malgré les aléas climatiques

### Notre approche

Notre équipe a assuré un suivi quotidien du chantier, garantissant la qualité des matériaux et le respect des plans architecturaux. La communication constante avec le maître d'ouvrage a permis d'anticiper les problèmes et d'apporter des solutions rapides.

### Résultats

Le projet a été livré dans les délais avec une satisfaction client maximale. L'hôtel accueille aujourd'hui des visiteurs du monde entier.
    `,
        image: "/images/projects/hotel-kribi.jpg",
        category: "BTP",
        author: "Équipe Horeb",
        date: "2024-11-15",
        readTime: "5 min",
    },
    {
        id: "2",
        slug: "importance-suivi-chantier",
        title: "L'importance du suivi technique de chantier",
        excerpt:
            "Pourquoi le suivi technique est essentiel pour la réussite de vos projets de construction ? Découvrez nos conseils d'experts.",
        content: `
## Pourquoi le suivi technique est indispensable ?

Le suivi technique de chantier est souvent négligé, pourtant il constitue un élément clé de la réussite de tout projet de construction.

### Les enjeux

1. **Qualité des travaux** : Vérification constante de la conformité aux normes
2. **Respect du budget** : Anticipation des dépassements de coûts
3. **Délais de livraison** : Suivi du planning et gestion des retards

### Notre méthodologie

Chez Horeb Group, nous avons développé une méthodologie rigoureuse :

- Visites régulières du chantier
- Rapports photographiques détaillés
- Réunions de coordination hebdomadaires
- Contrôle qualité à chaque étape

### Conclusion

Investir dans un suivi technique professionnel, c'est garantir la pérennité de votre investissement immobilier.
    `,
        image: "/images/projects/suivi-chantier.jpg",
        category: "Conseils",
        author: "M. Bipan Levis Stéphane",
        date: "2024-10-20",
        readTime: "4 min",
    },
    {
        id: "3",
        slug: "horeb-group-services-generaux",
        title: "Comment nous révolutionnons les services généraux",
        excerpt:
            "De la fourniture de bureau à la logistique, découvrez comment Horeb Group Sarl simplifie la gestion de vos besoins quotidiens.",
        content: `
## Une offre complète pour les entreprises

Les services généraux sont le cœur opérationnel de toute entreprise. Chez Horeb Group, nous proposons une gamme complète de services pour vous libérer de ces contraintes.

### Nos services

- **Fournitures de bureau** : Papeterie, consommables, mobilier
- **Équipements** : Matériel informatique, électronique
- **Transport et logistique** : Livraison, stockage, distribution
- **Entretien** : Maintenance des locaux et équipements

### L'avantage Horeb

Un seul interlocuteur pour tous vos besoins. Plus de temps perdu à gérer de multiples fournisseurs.

### Témoignage client

> "Depuis que nous travaillons avec Horeb Group, notre productivité a augmenté de 20%. Leurs services sont impeccables." - Client satisfait
    `,
        image: "/images/projects/services-generaux.jpg",
        category: "Services",
        author: "M. Wonyu Olivier",
        date: "2024-09-05",
        readTime: "3 min",
    },
];

export const categories = ["Tous", "BTP", "Conseils", "Services", "Actualités"];
