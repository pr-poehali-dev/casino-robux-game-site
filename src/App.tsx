import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import CasinoPage from "./pages/CasinoPage";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [balance, setBalance] = useState(1000);

  const handleLogin = (code: string) => {
    if (code === '8920') {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isAuthenticated ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <CasinoPage balance={balance} setBalance={setBalance} onLogout={handleLogout} />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
