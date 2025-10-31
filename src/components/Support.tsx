import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast.error('Заполните все поля');
      return;
    }

    toast.success('Сообщение отправлено!', {
      description: 'Мы свяжемся с вами в ближайшее время'
    });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Icon name="MessageCircle" size={32} className="text-primary" />
            Поддержка
          </CardTitle>
          <CardDescription className="text-lg">
            Свяжитесь с нами по любым вопросам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-input/50 border-gold/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input/50 border-gold/30"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Сообщение</Label>
              <Textarea
                id="message"
                placeholder="Опишите ваш вопрос или проблему..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="bg-input/50 border-gold/30 resize-none"
              />
            </div>

            <Button 
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:glow-effect transition-all shadow-xl"
            >
              <Icon name="Send" size={20} className="mr-2" />
              Отправить сообщение
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation">
          <CardHeader>
            <Icon name="Mail" size={32} className="text-primary mb-2" />
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">support@royalcasino.com</p>
            <p className="text-sm text-muted-foreground mt-2">Ответим в течение 24 часов</p>
          </CardContent>
        </Card>

        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-100">
          <CardHeader>
            <Icon name="MessageSquare" size={32} className="text-primary mb-2" />
            <CardTitle>Telegram</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">@royalcasino_support</p>
            <p className="text-sm text-muted-foreground mt-2">Быстрая поддержка 24/7</p>
          </CardContent>
        </Card>

        <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-xl hover-glow slide-up-animation animate-delay-100">
          <CardHeader>
            <Icon name="Clock" size={32} className="text-primary mb-2" />
            <CardTitle>Часы работы</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Круглосуточно</p>
            <p className="text-sm text-muted-foreground mt-2">7 дней в неделю</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="HelpCircle" size={24} className="text-primary" />
            Часто задаваемые вопросы
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="font-semibold mb-1">Как пополнить баланс?</p>
            <p className="text-sm text-muted-foreground">
              Баланс автоматически начисляется при входе в систему. 
              Для дополнительного пополнения обратитесь в поддержку.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="font-semibold mb-1">Как вывести выигрыш?</p>
            <p className="text-sm text-muted-foreground">
              Выигрыши автоматически зачисляются на ваш внутренний баланс. 
              Для вывода средств свяжитесь с нашей службой поддержки.
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="font-semibold mb-1">Честная ли игра?</p>
            <p className="text-sm text-muted-foreground">
              Да! Все результаты генерируются криптографически безопасными алгоритмами. 
              Подробнее читайте в разделе "Правила".
            </p>
          </div>

          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="font-semibold mb-1">Есть ли мобильная версия?</p>
            <p className="text-sm text-muted-foreground">
              Да! Royal Casino полностью адаптировано для мобильных устройств. 
              Играйте где угодно и когда угодно.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}