import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

export default function Rules() {
  return (
    <div className="space-y-6">
      <Card className="border-gold/40 bg-black/70 backdrop-blur-md shadow-2xl slide-up-animation hover-glow">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <Icon name="BookOpen" size={32} className="text-primary" />
            Правила игры
          </CardTitle>
          <CardDescription className="text-lg">
            Узнайте как играть и выигрывать в Royal Casino
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-3">
            <AccordionItem value="roulette" className="border border-gold/30 rounded-lg px-4 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Icon name="CircleDot" size={20} className="text-primary" />
                  Правила рулетки
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <p>
                  Классическая европейская рулетка с числами от 0 до 36. 
                  Числа раскрашены в красный и черный цвета, ноль — зеленый.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Типы ставок:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Красное/Черное</strong> — выигрыш 2x ставки</li>
                    <li><strong>Зеленое (0)</strong> — выигрыш 36x ставки</li>
                    <li><strong>Точное число</strong> — выигрыш 36x ставки</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bets" className="border border-gold/30 rounded-lg px-4 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Icon name="Coins" size={20} className="text-primary" />
                  Лимиты ставок
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <div className="space-y-2">
                  <p><strong>Минимальная ставка:</strong> 1 робукс</p>
                  <p><strong>Максимальная ставка:</strong> Размер вашего баланса</p>
                  <p className="text-sm">
                    Рекомендуем начинать с небольших ставок и увеличивать их по мере накопления опыта.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fair" className="border border-gold/30 rounded-lg px-4 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  Честная игра
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <p>
                  Все результаты в Royal Casino генерируются с использованием 
                  криптографически безопасных алгоритмов случайных чисел.
                </p>
                <p>
                  Каждое вращение рулетки полностью независимо от предыдущих результатов, 
                  что гарантирует честность и непредсказуемость игры.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="responsible" className="border border-gold/30 rounded-lg px-4 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={20} className="text-primary" />
                  Ответственная игра
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <p>
                  Играйте ответственно и никогда не ставьте больше, чем можете позволить себе потерять.
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Установите лимит времени и средств на игру</li>
                  <li>Делайте перерывы между сессиями</li>
                  <li>Помните, что казино — это развлечение, а не способ заработка</li>
                  <li>Если чувствуете зависимость — обратитесь за помощью</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="terms" className="border border-gold/30 rounded-lg px-4 bg-black/50 backdrop-blur-sm hover:bg-black/60 transition-all">
              <AccordionTrigger className="text-lg font-semibold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  Условия использования
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 text-muted-foreground">
                <p>
                  Используя Royal Casino, вы соглашаетесь с следующими условиями:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Вы несете полную ответственность за свои ставки</li>
                  <li>Все выигрыши зачисляются автоматически</li>
                  <li>Запрещено использование ботов и автоматизации</li>
                  <li>Администрация оставляет за собой право отказать в обслуживании</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="border-gold/40 bg-gradient-to-br from-black/80 to-primary/10 backdrop-blur-md shadow-xl slide-up-animation glow-effect">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <Icon name="Info" size={32} className="text-primary flex-shrink-0 pulse-glow-animation" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Важная информация</h3>
              <p className="text-muted-foreground">
                Royal Casino — это демонстрационное приложение для развлечения. 
                Робуксы в игре не имеют реальной ценности и предоставляются исключительно 
                для игрового процесса. Наслаждайтесь игрой ответственно!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}