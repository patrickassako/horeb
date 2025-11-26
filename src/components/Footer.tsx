import { Building2, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Konta</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed max-w-md">
              Entreprise de BTP de confiance avec plus de 25 ans d'expérience. 
              Nous transformons vos projets en réalité avec expertise et passion.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white/10 rounded-lg hover:bg-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Projets
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  À Propos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Gros Œuvre
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Rénovation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Finitions
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-primary transition-colors">
                  Maintenance
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2024 Konta Construction. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors">
                Politique de Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
