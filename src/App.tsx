import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "./pages/HomePage";
import { ImagePromptBuilder } from "./pages/tools/ImagePromptBuilder";
import { VideoPromptBuilder } from "./pages/tools/VideoPromptBuilder";
import { MusicPromptBuilder } from "./pages/tools/MusicPromptBuilder";
import { AppBuilderPrompt } from "./pages/tools/AppBuilderPrompt";
import GuidesPage from "./pages/GuidesPage";
import BeginnerAiImagePrompt from "./pages/guides/BeginnerAiImagePrompt";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import ExamplesPage from "./pages/ExamplesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools/image" element={<ImagePromptBuilder />} />
            <Route path="/tools/video" element={<VideoPromptBuilder />} />
            <Route path="/tools/music" element={<MusicPromptBuilder />} />
            <Route path="/tools/app-builder" element={<AppBuilderPrompt />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/beginner-ai-image-prompt" element={<BeginnerAiImagePrompt />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/examples" element={<ExamplesPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
