import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BTP from "./pages/services/BTP";
import ServicesGeneraux from "./pages/services/ServicesGeneraux";
import ImportExport from "./pages/services/ImportExport";
import ElectriciteInformatique from "./pages/services/ElectriciteInformatique";
import Services from "./pages/Services";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import WhatsAppButton from "./components/WhatsAppButton";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";

import QuoteRequest from "./pages/QuoteRequest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/devis" element={<QuoteRequest />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/services/btp" element={<BTP />} />
              <Route path="/services/services-generaux" element={<ServicesGeneraux />} />
              <Route path="/services/import-export" element={<ImportExport />} />
              <Route path="/services/electricite-informatique" element={<ElectriciteInformatique />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
