import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LoginPageProps {
  onLogin: (code: string) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '8920') {
      onLogin(code);
    } else {
      setError('Неверный код доступа');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-card p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
      
      <Card className="w-full max-w-md relative border-gold/30 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary via-primary/80 to-secondary flex items-center justify-center shadow-lg shadow-primary/50">
            <Icon name="Crown" size={40} className="text-primary-foreground" />
          </div>
          <CardTitle className="text-4xl font-bold shine-effect">
            Royal Casino
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Введите код доступа для входа
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Введите код..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center text-2xl tracking-widest h-14 bg-input/50 border-gold/30 focus:border-gold transition-colors"
                maxLength={4}
              />
              {error && (
                <p className="text-destructive text-sm text-center animate-fade-in">
                  {error}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary via-primary/90 to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              <Icon name="LogIn" size={20} className="mr-2" />
              Войти
            </Button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Безопасный вход</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
