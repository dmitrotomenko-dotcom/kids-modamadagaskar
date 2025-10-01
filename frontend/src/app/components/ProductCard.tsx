import Link from 'next/link';

// Типізуємо дані, які приходять в компонент
interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
      <div className="w-full h-64 bg-gray-200 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-700 truncate">{product.name}</h2>
        <p className="mt-2 text-xl font-bold text-blue-600">{product.price} UAH</p>
      </div>
    </Link>
  );
}