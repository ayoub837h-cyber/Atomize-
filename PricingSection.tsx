"use client";

import { motion } from 'framer-motion';
import { Check, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Free',
    id: 'free',
    price: '$0',
    period: '/month',
    description: 'للتجربة فقط واستكشاف الإمكانيات.',
    features: [
      '3 PDFs بحد أقصى',
      '10 أسئلة يوميًا',
      'سرعة معالجة عادية',
      'دعم عبر البريد',
    ],
    buttonText: 'ابدأ مجانًا',
    highlighted: false,
    priceId: null,
  },
  {
    name: 'Pro',
    id: 'pro',
    price: '$9',
    period: '/month',
    description: 'الأفضل للمستخدمين والمحترفين 🔥',
    features: [
      'PDFs غير محدودة',
      '200 سؤال يوميًا',
      'سرعة عالية في الاستجابة',
      'دقة AI محسنة ومتقدمة',
      'تاريخ عمليات البحث',
      'أولوية الدعم الفني',
    ],
    buttonText: 'اشترك الآن',
    highlighted: true,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'pro_placeholder',
  },
  {
    name: 'Premium',
    id: 'premium',
    price: '$19',
    period: '/month',
    description: 'للاستخدام المكثف والفرق المتطورة.',
    features: [
      'كل شيء في Pro وأكثر',
      'Multi-PDF معالجة متعددة',
      'Memory AI سياق غير محدود',
      'سرعة قصوى وفورية',
      'دعم عبر الهاتف VIP',
      'مساحة تخزين سحابية قصوى',
    ],
    buttonText: 'احصل على الخطة الكاملة',
    highlighted: false,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || 'premium_placeholder',
  },
];

export default function PricingSection() {
  const { toast } = useToast();
  const { user } = useUser();
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (priceId: string | null, planId: string) => {
    if (!priceId) {
      if (!user) {
        router.push('/signup');
      } else {
        router.push('/dashboard');
      }
      return;
    }

    if (!user) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يرجى تسجيل الدخول لترقية حسابك.",
      });
      router.push('/signin');
      return;
    }

    setLoadingPlan(priceId);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId, 
          userId: user.uid,
          email: user.email,
          plan: planId
        }),
      });

      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "خطأ في الدفع",
        description: err.message || "حدث خطأ أثناء محاولة بدء عملية الدفع.",
      });
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="relative py-12 overflow-hidden">
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              plan.highlighted
                ? 'glass-card border-primary/40 scale-105 z-10 bg-white/[0.04]'
                : 'glass-card border-white/10 hover:border-white/20'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xl">
                <Sparkles className="w-3 h-3" />
                الأكثر اختيارًا 🔥
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-2xl font-headline font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{plan.description}</p>
            </div>

            <div className="mb-8">
              <span className="text-5xl font-bold text-white font-headline">{plan.price}</span>
              <span className="text-white/40 ml-1 text-sm">{plan.period}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/20 rounded-full p-0.5">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-white/70">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSubscribe(plan.priceId, plan.id)}
              disabled={loadingPlan !== null}
              className={`w-full py-6 font-bold text-lg transition-all rounded-xl ${
                plan.highlighted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {loadingPlan === plan.priceId ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                plan.buttonText
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
