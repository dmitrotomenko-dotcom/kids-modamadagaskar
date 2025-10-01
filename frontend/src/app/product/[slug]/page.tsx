import { getProductData, getSortedProductsData } from '../../lib/products';
import AddToCart from '../../components/AddToCart';

// Ця функція генерує список всіх можливих сторінок товарів
export async function generateStaticParams() {
  const products = getSortedProductsData();
  // Перевіряємо, чи є товари, щоб уникнути помилок на порожньому масиві
  if (!products || products.length === 0) {
    return [];
  }
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// ОСЬ ГОЛОВНИЙ КОМПОНЕНТ СТОРІНКИ, ПОЗНАЧЕНИЙ ЯК 'export default'
export default function ProductPage({ params }: { params: { slug: string } }) {
  // Перевірка, чи існує товар, щоб уникнути помилок
  try {
    const product = getProductData(params.slug);

    const productForCart = {
      name: product.name,
      description: product.description,
      id: product.slug,
      price: product.price * 100, // Ціна в копійках
      currency: 'UAH',
      image: product.image,
      sku: product.slug,
    };

    return (
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-extrabold text-blue-600 mb-8">{product.price} UAH</p>
          <AddToCart product={productForCart} />
        </div>
      </div>
    );
  } catch (error) {
    // Якщо файл товару не знайдено, показуємо повідомлення
    return <div className="text-center"><h1>Товар не знайдено!</h1></div>;
  }
}