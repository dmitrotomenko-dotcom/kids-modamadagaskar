'use client';

import { CartProvider } from 'use-shopping-cart';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!;
  
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripeKey}
      successUrl={`${window.location.origin}/success`}
      cancelUrl={`${window.location.origin}/?success=false`}
      currency="UAH"
      shouldPersist={true} // Зберігати кошик між перезавантаженнями сторінки
    >
      <Toaster />
      {children}
    </CartProvider>
  );
}