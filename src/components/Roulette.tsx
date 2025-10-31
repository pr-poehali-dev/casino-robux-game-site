import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import Confetti from './Confetti';

interface GameStats {
  totalBets: number;
  biggestWin: number;
  totalWins: number;
  totalLosses: number;
}

interface RouletteProps {
  balance: number;
  setBalance: (balance: number) => void;
  gameStats: GameStats;
  setGameStats: (stats: GameStats) => void;
}

const numbers = [
  { num: 0, color: 'green' },
  { num: 32, color: 'red' },
  { num: 15, color: 'black' },
  { num: 19, color: 'red' },
  { num: 4, color: 'black' },
  { num: 21, color: 'red' },
  { num: 2, color: 'black' },
  { num: 25, color: 'red' },
  { num: 17, color: 'black' },
  { num: 34, color: 'red' },
  { num: 6, color: 'black' },
  { num: 27, color: 'red' },
  { num: 13, color: 'black' },
  { num: 36, color: 'red' },
  { num: 11, color: 'black' },
  { num: 30, color: 'red' },
  { num: 8, color: 'black' },
  { num: 23, color: 'red' },
  { num: 10, color: 'black' },
  { num: 5, color: 'red' },
  { num: 24, color: 'black' },
  { num: 16, color: 'red' },
  { num: 33, color: 'black' },
  { num: 1, color: 'red' },
  { num: 20, color: 'black' },
  { num: 14, color: 'red' },
  { num: 31, color: 'black' },
  { num: 9, color: 'red' },
  { num: 22, color: 'black' },
  { num: 18, color: 'red' },
  { num: 29, color: 'black' },
  { num: 7, color: 'red' },
  { num: 28, color: 'black' },
  { num: 12, color: 'red' },
  { num: 35, color: 'black' },
  { num: 3, color: 'red' },
  { num: 26, color: 'black' },
];

export default function Roulette({ balance, setBalance, gameStats, setGameStats }: RouletteProps) {
  const [bet, setBet] = useState(10);
  const [selectedBet, setSelectedBet] = useState<'red' | 'black' | 'green' | number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof numbers[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSpin = () => {
    if (!selectedBet) {
      toast.error('Выберите ставку');
      return;
    }

    if (bet > balance) {
      toast.error('Недостаточно робуксов');
      return;
    }

    if (bet < 1) {
      toast.error('Минимальная ставка 1 робукс');
      return;
    }

    setSpinning(true);
    setBalance(balance - bet);
    setShowConfetti(false);

    const winningIndex = Math.floor(Math.random() * numbers.length);
    const winningNumber = numbers[winningIndex];
    
    const extraRotations = 1440;
    const segmentAngle = 360 / numbers.length;
    const targetRotation = extraRotations + (winningIndex * segmentAngle);
    
    setRotation(rotation + targetRotation);

    setTimeout(() => {
      setResult(winningNumber);
      setSpinning(false);

      let winAmount = 0;
      let won = false;

      if (typeof selectedBet === 'number' && selectedBet === winningNumber.num) {
        winAmount = bet * 36;
        won = true;
      } else if (selectedBet === winningNumber.color) {
        if (winningNumber.color === 'green') {
          winAmount = bet * 36;
        } else {
          winAmount = bet * 2;
        }
        won = true;
      }

      const newStats = { ...gameStats };
      newStats.totalBets += 1;

      if (won) {
        newStats.totalWins += 1;
        if (winAmount > newStats.biggestWin) {
          newStats.biggestWin = winAmount;
        }
        setBalance(balance - bet + winAmount);
        setShowConfetti(true);
        toast.success(`Выигрыш! +${winAmount} робуксов`, {
          description: `Выпало: ${winningNumber.num} (${winningNumber.color === 'red' ? 'красное' : winningNumber.color === 'black' ? 'черное' : 'зеленое'})`
        });
      } else {
        newStats.totalLosses += 1;
        toast.error(`Проигрыш. Выпало: ${winningNumber.num}`, {
          description: `Цвет: ${winningNumber.color === 'red' ? 'красное' : winningNumber.color === 'black' ? 'черное' : 'зеленое'}`
        });
      }

      setGameStats(newStats);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Confetti active={showConfetti} />
      
      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Icon name="CircleDot" size={32} className="text-primary pulse-glow-animation" />
            Классическая рулетка
          </CardTitle>
          <CardDescription className="text-lg">
            Ставьте на число или цвет и испытайте удачу
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center relative">
            <div className="relative w-96 h-96">
              <div className="absolute inset-0 rounded-full border-[16px] border-gold shadow-2xl" style={{
                background: 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)',
                boxShadow: '0 0 40px rgba(212, 175, 55, 0.5), inset 0 0 60px rgba(0, 0, 0, 0.9)'
              }}>
                <div className="absolute inset-4 rounded-full border-8 border-gold/60 overflow-hidden">
                  <div 
                    className="absolute inset-0"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: spinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                    }}
                  >
                    {numbers.map((item, index) => {
                      const angle = (360 / numbers.length) * index;
                      return (
                        <div
                          key={index}
                          className="absolute w-full h-full origin-center"
                          style={{
                            transform: `rotate(${angle}deg)`,
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((360 / numbers.length) * Math.PI / 180)}% ${50 - 50 * Math.cos((360 / numbers.length) * Math.PI / 180)}%)`
                          }}
                        >
                          <div className={`w-full h-full flex items-start justify-center pt-6 ${
                            item.color === 'red' ? 'bg-gradient-to-b from-red-600 to-red-800' : 
                            item.color === 'black' ? 'bg-gradient-to-b from-gray-800 to-black' : 
                            'bg-gradient-to-b from-green-600 to-green-800'
                          }`}>
                            <span className="text-white font-bold text-base drop-shadow-lg" style={{ 
                              transform: `rotate(${-angle}deg)`,
                              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                            }}>
                              {item.num}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary/80 to-primary/60 shadow-2xl pulse-glow-animation flex items-center justify-center border-4 border-gold/50">
                    <Icon name="Crown" size={32} className="text-primary-foreground" />
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                <div className="relative">
                  <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-primary" 
                    style={{ 
                      filter: 'drop-shadow(0 4px 8px rgba(212, 175, 55, 0.6))',
                    }} 
                  />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-8 bg-primary/50" />
                </div>
              </div>

              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.8)'
              }} />
            </div>
          </div>

          {result && !spinning && (
            <Card className="border-gold/50 bg-black/80 backdrop-blur-md glow-effect slide-up-animation">
              <CardContent className="py-4 text-center">
                <p className="text-lg font-semibold">
                  Выпало: <span className="text-3xl text-gold shine-effect font-bold">{result.num}</span>
                </p>
                <p className={`text-sm mt-1 ${
                  result.color === 'red' ? 'text-red-400' : 
                  result.color === 'black' ? 'text-gray-300' : 
                  'text-green-400'
                }`}>
                  {result.color === 'red' ? 'Красное' : result.color === 'black' ? 'Черное' : 'Зеленое'}
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bet" className="text-lg">Размер ставки</Label>
              <div className="flex gap-2">
                <Input
                  id="bet"
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  min={1}
                  max={balance}
                  className="text-lg h-12 bg-input/50 border-gold/30"
                  disabled={spinning}
                />
                <div className="flex gap-2">
                  {[10, 50, 100, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => setBet(amount)}
                      disabled={spinning || balance < amount}
                      className="border-gold/30 hover:bg-gold/20"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-lg">Выберите ставку</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => setSelectedBet('red')}
                  disabled={spinning}
                  variant={selectedBet === 'red' ? 'default' : 'outline'}
                  className={`h-16 text-lg font-semibold ${
                    selectedBet === 'red' 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-xl' 
                      : 'border-red-600 text-red-400 hover:bg-red-600/20'
                  }`}
                >
                  Красное (2x)
                </Button>
                <Button
                  onClick={() => setSelectedBet('black')}
                  disabled={spinning}
                  variant={selectedBet === 'black' ? 'default' : 'outline'}
                  className={`h-16 text-lg font-semibold ${
                    selectedBet === 'black' 
                      ? 'bg-gray-900 hover:bg-gray-950 text-white shadow-xl' 
                      : 'border-gray-700 text-gray-300 hover:bg-gray-700/20'
                  }`}
                >
                  Черное (2x)
                </Button>
                <Button
                  onClick={() => setSelectedBet('green')}
                  disabled={spinning}
                  variant={selectedBet === 'green' ? 'default' : 'outline'}
                  className={`h-16 text-lg font-semibold ${
                    selectedBet === 'green' 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-xl' 
                      : 'border-green-600 text-green-400 hover:bg-green-600/20'
                  }`}
                >
                  Зеленое (36x)
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSpin}
              disabled={spinning || !selectedBet}
              size="lg"
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:glow-effect transition-all disabled:opacity-50 shadow-2xl"
            >
              {spinning ? (
                <>
                  <Icon name="Loader2" size={24} className="mr-2 animate-spin" />
                  Вращение...
                </>
              ) : (
                <>
                  <Icon name="PlayCircle" size={24} className="mr-2" />
                  Крутить рулетку
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
