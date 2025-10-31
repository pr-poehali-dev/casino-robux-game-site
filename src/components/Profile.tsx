import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GameStats {
  totalBets: number;
  biggestWin: number;
  totalWins: number;
  totalLosses: number;
}

interface ProfileProps {
  balance: number;
  gameStats: GameStats;
}

export default function Profile({ balance, gameStats }: ProfileProps) {
  return (
    <div className="space-y-6">
      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl pulse-glow-animation">
              <Icon name="User" size={40} className="text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl">Профиль игрока</CardTitle>
              <CardDescription>VIP статус</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Wallet" size={24} className="text-primary" />
              Баланс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gold">{balance}</p>
            <p className="text-sm text-muted-foreground mt-1">робуксов</p>
          </CardContent>
        </Card>

        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Trophy" size={24} className="text-primary" />
              Статус
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-lg px-4 py-1 shadow-xl glow-effect">
              VIP Игрок
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">Премиум доступ ко всем играм</p>
          </CardContent>
        </Card>

        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={24} className="text-primary" />
              Всего ставок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{gameStats.totalBets}</p>
            <p className="text-sm text-muted-foreground mt-1">игр сыграно</p>
          </CardContent>
        </Card>

        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Award" size={24} className="text-primary" />
              Крупнейший выигрыш
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{gameStats.biggestWin}</p>
            <p className="text-sm text-muted-foreground mt-1">робуксов</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Star" size={24} className="text-primary pulse-glow-animation" />
            Достижения
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-gold/30 glow-effect">
            <Icon name="Crown" size={32} className="text-primary float-animation" />
            <div>
              <p className="font-semibold">VIP Игрок</p>
              <p className="text-sm text-muted-foreground">Получен при входе по коду</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            gameStats.totalWins > 0 
              ? 'bg-primary/10 border border-gold/30 glow-effect' 
              : 'bg-muted/5 border border-muted/20 opacity-50'
          }`}>
            <Icon name="Flame" size={32} className={gameStats.totalWins > 0 ? 'text-primary float-animation' : 'text-muted-foreground'} />
            <div>
              <p className={`font-semibold ${gameStats.totalWins > 0 ? '' : 'text-muted-foreground'}`}>Первая победа</p>
              <p className="text-sm text-muted-foreground">
                {gameStats.totalWins > 0 ? `Побед: ${gameStats.totalWins}` : 'Выиграйте первую игру'}
              </p>
            </div>
          </div>

          <div className={`flex items-center gap-3 p-3 rounded-lg ${
            gameStats.totalBets >= 10 
              ? 'bg-primary/10 border border-gold/30 glow-effect' 
              : 'bg-muted/5 border border-muted/20 opacity-50'
          }`}>
            <Icon name="Target" size={32} className={gameStats.totalBets >= 10 ? 'text-primary float-animation' : 'text-muted-foreground'} />
            <div>
              <p className={`font-semibold ${gameStats.totalBets >= 10 ? '' : 'text-muted-foreground'}`}>Опытный игрок</p>
              <p className="text-sm text-muted-foreground">
                {gameStats.totalBets >= 10 ? 'Сделано 10+ ставок' : 'Сделайте 10 ставок'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}