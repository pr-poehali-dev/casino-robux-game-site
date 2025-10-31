import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Roulette from '@/components/Roulette';
import Profile from '@/components/Profile';
import Rules from '@/components/Rules';
import Support from '@/components/Support';

interface CasinoPageProps {
  balance: number;
  setBalance: (balance: number) => void;
  onLogout: () => void;
}

export default function CasinoPage({ balance, setBalance, onLogout }: CasinoPageProps) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.05),transparent_80%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      
      <header className="relative border-b border-gold/30 bg-black/90 backdrop-blur-xl shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/50 pulse-glow-animation">
                <Icon name="Crown" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold shine-effect">Royal Casino</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Card className="border-gold/40 bg-black/80 backdrop-blur-sm glow-effect">
                <CardContent className="px-4 py-2 flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-primary" />
                  <span className="font-bold text-lg text-gold">{balance}</span>
                  <span className="text-sm text-muted-foreground">робуксов</span>
                </CardContent>
              </Card>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <Icon name="LogOut" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/80 border border-gold/30 backdrop-blur-md shadow-xl">
            <TabsTrigger value="home" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Gamepad2" size={18} className="mr-2" />
              Игры
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="User" size={18} className="mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Правила
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="MessageCircle" size={18} className="mr-2" />
              Поддержка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
              <CardHeader>
                <CardTitle className="text-3xl">Добро пожаловать в Royal Casino</CardTitle>
                <CardDescription className="text-lg">
                  Премиум казино с играми на робуксы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Испытайте удачу в классической рулетке и выигрывайте робуксы. 
                  Элегантный интерфейс, честная игра и быстрые выплаты.
                </p>
                <Button 
                  onClick={() => setActiveTab('games')}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:glow-effect transition-all shadow-xl"
                >
                  <Icon name="PlayCircle" size={20} className="mr-2" />
                  Начать игру
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation">
                <CardHeader>
                  <Icon name="Zap" size={32} className="text-primary mb-2 float-animation" />
                  <CardTitle>Быстрые выплаты</CardTitle>
                  <CardDescription>
                    Мгновенное зачисление выигрышей на баланс
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-100">
                <CardHeader>
                  <Icon name="Shield" size={32} className="text-primary mb-2 float-animation" />
                  <CardTitle>Честная игра</CardTitle>
                  <CardDescription>
                    Провоеренные алгоритмы генерации случайных чисел
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-200">
                <CardHeader>
                  <Icon name="Trophy" size={32} className="text-primary mb-2 float-animation" />
                  <CardTitle>Крупные выигрыши</CardTitle>
                  <CardDescription>
                    До 36x вашей ставки в классической рулетке
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="games">
            <Roulette balance={balance} setBalance={setBalance} />
          </TabsContent>

          <TabsContent value="profile">
            <Profile balance={balance} />
          </TabsContent>

          <TabsContent value="rules">
            <Rules />
          </TabsContent>

          <TabsContent value="support">
            <Support />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}