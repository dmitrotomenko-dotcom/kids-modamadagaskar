'use client';

import { useShoppingCart } from 'use-shopping-cart';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cartCount, cartDetails, removeItem, clearCart, redirectToCheckout, totalPrice } = useShoppingCart();

  async function handleCheckout() {
    if (cartCount && cartCount > 0) {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cartDetails),
        });

        if (!response.ok) {
          throw new Error('Помилка при створенні сесії');
        }

        const { sessionId } = await response.json();
        const result = await redirectToCheckout(sessionId);

        if (result?.error) {
          console.error(result.error.message);
          toast.error("Помилка при переході до оплати!");
        }
      } catch (error) {
        toast.error("Не вдалося створити сесію оплати.");
        console.error(error);
      }
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white sticky top-8">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Кошик ({cartCount})</h2>
      
      {cartCount === 0 && <p className="text-gray-500">Ваш кошик порожній.</p>}
      
      {Object.values(cartDetails ?? {}).map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-3">
          <div className="flex-grow">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.quantity} x {item.price} UAH</p>
          </div>
          <button 
            onClick={() => removeItem(item.id)} 
            className="text-red-500 hover:text-red-700 font-bold ml-4"
          >
            &times;
          </button>
        </div>
      ))}

      {cartCount !== undefined && cartCount > 0 && (
        <>
          <hr className="my-4"/>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Всього:</span>
            <span>{totalPrice} UAH</span>
          </div>
          <button 
            onClick={handleCheckout} 
            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Оформити замовлення
          </button>
          <button 
            onClick={() => clearCart()} 
            className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
          >
            Очистити кошик
          </button>
        </>
      )}
    </div>
  );
}