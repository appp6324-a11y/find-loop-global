import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import PostAdPage from "./pages/PostAdPage";
import DashboardPage from "./pages/DashboardPage";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";

/* NEW PAGES (missing routes) */
import PricingPage from "./pages/PricingPage";
import CategoriesPage from "./pages/CategoriesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import HelpPage from "./pages/HelpPage";
import SafetyPage from "./pages/SafetyPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import ReportPage from "./pages/ReportPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Core */}
          <Route path="/" element={<Index />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:slug" element={<ListingPage />} />
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />

          {/* Categories */}
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/category/:slug/:subslug" element={<CategoryPage />} />
          <Route path="/categories" element={<CategoriesPage />} />

          {/* Static / Info */}
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />

          {/* User */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/report" element={<ReportPage />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
