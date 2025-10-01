import AddToCart from "@/app/components/AddToCart";
import { getProductData, getSortedProductsData } from "@/app/lib/products";


// Генеруємо статичні сторінки для кожного товару для кращої продуктивності
export async function generateStaticParams() {
  const products = getSortedProductsData();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductData(params.slug);
  
  // Готуємо об'єкт для кошика, додаючи всі необхідні поля
  const productForCart = {
      name: product.name,
      description: product.description,
      id: product.slug, // Використовуємо slug як унікальний ID
      price: product.price * 100, // Stripe очікує ціну в копійках
      currency: 'UAH',
      image: product.image,
      sku: product.slug, // Можна використовувати slug як артикул
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
}