import { Button } from "@/components/ui/button";
import { Building2, Menu, Phone } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-white">Konta</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#"
              className="text-white hover:text-primary transition-colors font-semibold"
            >
              Accueil
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-primary transition-colors font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-primary transition-colors font-medium"
            >
              Projets
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-primary transition-colors font-medium"
            >
              À Propos
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-primary transition-colors font-medium"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-strong"
            >
              <Phone className="mr-2 h-5 w-5" />
              Devis Gratuit
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <a
                href="#"
                className="text-white hover:text-primary transition-colors font-semibold py-2"
              >
                Accueil
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-primary transition-colors font-medium py-2"
              >
                Services
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-primary transition-colors font-medium py-2"
              >
                Projets
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-primary transition-colors font-medium py-2"
              >
                À Propos
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-primary transition-colors font-medium py-2"
              >
                Contact
              </a>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold w-full mt-2"
              >
                <Phone className="mr-2 h-5 w-5" />
                Devis Gratuit
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
