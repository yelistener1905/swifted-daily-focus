import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AppLayout } from "@/components/layout/AppLayout";
import HomePage from "./pages/HomePage";
import StreaksPage from "./pages/StreaksPage";
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <StartupPage onStart={handleStart} />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/streaks" element={<StreaksPage />} />
                <Route path="/daily" element={<DailyPage />} />
                <Route path="/roadmaps" element={<RoadmapsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AppLayout>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
