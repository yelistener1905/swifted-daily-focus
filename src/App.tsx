import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import DailyPage from "./pages/DailyPage";
import RoadmapsPage from "./pages/RoadmapsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import StartupPage from "./pages/StartupPage";

const queryClient = new QueryClient();

const STARTUP_SHOWN_KEY = "swifted-startup-shown";

const App = () => {
  const [showStartup, setShowStartup] = useState(() => {
    return !localStorage.getItem(STARTUP_SHOWN_KEY);
  });

  const handleStart = () => {
    localStorage.setItem(STARTUP_SHOWN_KEY, "true");
    setShowStartup(false);
  };

  if (showStartup) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StartupPage onStart={handleStart} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/daily" element={<DailyPage />} />
              <Route path="/roadmaps" element={<RoadmapsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
