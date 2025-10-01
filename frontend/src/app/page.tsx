import ProductCard from "./components/ProductCard";
import { getSortedProductsData } from "./lib/products";


// Описуємо TypeScript, як виглядає наш об'єкт товару
interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function HomePage() {
  // Вказуємо, що функція повертає масив таких об'єктів
  const products: Product[] = getSortedProductsData();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Тепер TypeScript знає, що 'product' - це об'єкт типу Product */}
      {products.map((product: Product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}