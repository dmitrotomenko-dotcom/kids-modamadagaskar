'use client';

import { useShoppingCart } from 'use-shopping-cart';
import toast from 'react-hot-toast';

// Описуємо, як виглядає об'єкт товару, який ми додаємо в кошик
interface ProductForCart {
  name: string;
  description: string;
  id: string;
  price: number;
  currency: string;
  image: string;
  sku: string;
}

// Вказуємо точний тип для 'product'
export default function AddToCart({ product }: { product: ProductForCart }) {
  const { addItem } = useShoppingCart();

  function handleAddToCart() {
    addItem(product);
    toast.success(`${product.name} додано до кошика!`);
  }

  return (
    <button 
      onClick={handleAddToCart}
      className="w-full bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-lg"
    >
      Додати в кошик
    </button>
  );
}