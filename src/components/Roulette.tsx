import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface RouletteProps {
  balance: number;
  setBalance: (balance: number) => void;
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

export default function Roulette({ balance, setBalance }: RouletteProps) {
  const [bet, setBet] = useState(10);
  const [selectedBet, setSelectedBet] = useState<'red' | 'black' | 'green' | number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof numbers[0] | null>(null);
  const [rotation, setRotation] = useState(0);

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

      if (won) {
        setBalance(balance - bet + winAmount);
        toast.success(`Выигрыш! +${winAmount} робуксов`, {
          description: `Выпало: ${winningNumber.num} (${winningNumber.color === 'red' ? 'красное' : winningNumber.color === 'black' ? 'черное' : 'зеленое'})`
        });
      } else {
        toast.error(`Проигрыш. Выпало: ${winningNumber.num}`, {
          description: `Цвет: ${winningNumber.color === 'red' ? 'красное' : winningNumber.color === 'black' ? 'черное' : 'зеленое'}`
        });
      }
    }, 4000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-gold/30 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Icon name="CircleDot" size={32} className="text-primary" />
            Классическая рулетка
          </CardTitle>
          <CardDescription className="text-lg">
            Ставьте на число или цвет и испытайте удачу
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <div 
                className="absolute inset-0 rounded-full border-8 border-gold shadow-2xl shadow-primary/50 overflow-hidden"
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
                      className={`absolute w-full h-full origin-center`}
                      style={{
                        transform: `rotate(${angle}deg)`,
                        clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((360 / numbers.length) * Math.PI / 180)}% ${50 - 50 * Math.cos((360 / numbers.length) * Math.PI / 180)}%)`
                      }}
                    >
                      <div className={`w-full h-full flex items-start justify-center pt-4 ${
                        item.color === 'red' ? 'bg-red-600' : 
                        item.color === 'black' ? 'bg-gray-900' : 
                        'bg-green-600'
                      }`}>
                        <span className="text-white font-bold text-sm" style={{ transform: `rotate(${-angle}deg)` }}>
                          {item.num}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-primary drop-shadow-lg" />
              </div>

              <div className="absolute inset-0 rounded-full flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg flex items-center justify-center">
                  <Icon name="Crown" size={32} className="text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {result && !spinning && (
            <Card className="border-gold/50 bg-gradient-to-br from-card to-card/50 animate-fade-in">
              <CardContent className="py-4 text-center">
                <p className="text-lg font-semibold">
                  Выпало: <span className="text-2xl text-gold">{result.num}</span>
                </p>
                <p className={`text-sm ${
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
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'border-red-600 text-red-600 hover:bg-red-600/20'
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
                      ? 'bg-gray-900 hover:bg-gray-950 text-white' 
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
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'border-green-600 text-green-600 hover:bg-green-600/20'
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
              className="w-full h-14 text-xl font-bold bg-gradient-to-r from-primary via-primary/90 to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50"
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
