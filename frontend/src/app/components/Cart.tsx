'use client';

import { useShoppingCart } from 'use-shopping-cart';
import { useRouter } from 'next/navigation'; // Імпортуємо для перенаправлення

export default function Cart() {
  const { cartCount, cartDetails, clearCart, totalPrice } = useShoppingCart();
  const router = useRouter(); // Ініціалізуємо роутер

  function handleCheckout() {
    if (!cartCount || cartCount === 0) {
      return; // Нічого не робити, якщо кошик порожній
    }

    // 1. Генеруємо унікальний номер замовлення
    // Складається з поточної дати/часу та 4 випадкових цифр
    const orderNumber = `${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 2. Зберігаємо деталі замовлення в localStorage, щоб показати їх на сторінці успіху
    const orderDetails = {
      orderNumber,
      cartDetails,
      totalPrice,
    };
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // 3. Очищуємо кошик
    clearCart();

    // 4. Перенаправляємо користувача на сторінку успіху
    router.push('/success');
  }

  // Видаляємо кнопку removeItem для спрощення
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white sticky top-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Кошик ({cartCount})</h2>
      
      {cartCount === 0 && <p className="text-gray-500">Ваш кошик порожній.</p>}
      
      {Object.values(cartDetails ?? {}).map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-3">
          <div className="flex-grow">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.quantity} x {item.price / 100} UAH</p> 
          </div>
        </div>
      ))}

      {cartCount !== undefined && cartCount > 0 && (
        <>
          <hr className="my-4"/>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Всього:</span>
            <span>{totalPrice ? totalPrice / 100 : 0} UAH</span>
          </div>
          <button 
            onClick={handleCheckout} 
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Оформити замовлення
          </button>
        </>
      )}
    </div>
  );
}
