'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface OrderDetails {
  orderNumber: string;
  totalPrice: number;
}

export default function SuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderDetails) {
    return (
        <div className="text-center p-8">
            <p>Завантаження інформації про замовлення...</p>
            <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
                Повернутись на головну
            </Link>
        </div>
    );
  }

  return (
    <div className="p-8 border rounded-lg bg-green-50 text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-4">✅ Дякуємо, ваше замовлення прийнято!</h1>
      
      <p className="text-lg mb-6">
        Ваш номер замовлення: <strong className="text-2xl text-red-600 bg-yellow-200 px-2 py-1 rounded">{orderDetails.orderNumber}</strong>
      </p>
      
      <div className="text-left bg-white p-6 rounded-lg shadow-inner">
        <p className="font-bold text-xl mb-4">Що робити далі?</p>
        <p className="mb-3">
          Для завершення оформлення, будь ласка, напишіть нам у **Viber** на номер:
        </p>
        <p className="text-2xl font-bold text-blue-800 mb-4">095-607-16-03</p>
        <p className="mb-3">У повідомленні обов&apos;язково вкажіть:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Ваш номер замовлення: <strong className="text-red-600">{orderDetails.orderNumber}</strong></li>
          {/* Виправляємо лапки */}
          <li>Бажаний спосіб доставки (&quot;Нова Пошта&quot; або &quot;Укрпошта&quot; та дані для відправки).</li>
        </ul>
        <p>
          Адміністратор надасть вам номер картки для оплати або підтвердить відправку з післяплатою (наложений платіж).
        </p>
      </div>

      <Link href="/" className="mt-8 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
        Повернутись на головну
      </Link>
    </div>
  );
}