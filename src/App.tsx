import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BTP from "./pages/services/BTP";
import ServicesGeneraux from "./pages/services/ServicesGeneraux";
import ImportExport from "./pages/services/ImportExport";
import ElectriciteInformatique from "./pages/services/ElectriciteInformatique";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services/btp" element={<BTP />} />
          <Route path="/services/services-generaux" element={<ServicesGeneraux />} />
          <Route path="/services/import-export" element={<ImportExport />} />
          <Route path="/services/electricite-informatique" element={<ElectriciteInformatique />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
