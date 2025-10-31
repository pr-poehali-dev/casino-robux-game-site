import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import CasinoPage from "./pages/CasinoPage";

const queryClient = new QueryClient();

interface GameStats {
  totalBets: number;
  biggestWin: number;
  totalWins: number;
  totalLosses: number;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('balance');
    return saved ? parseInt(saved) : 1000;
  });

  const [gameStats, setGameStats] = useState<GameStats>(() => {
    const saved = localStorage.getItem('gameStats');
    return saved ? JSON.parse(saved) : {
      totalBets: 0,
      biggestWin: 0,
      totalWins: 0,
      totalLosses: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats));
  }, [gameStats]);

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
          <CasinoPage 
            balance={balance} 
            setBalance={setBalance} 
            onLogout={handleLogout}
            gameStats={gameStats}
            setGameStats={setGameStats}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;