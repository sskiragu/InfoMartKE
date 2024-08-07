import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3000/api/products/route');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    console.log('Product added to cart:', product);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={200}
              height={200}
              className="mb-4"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 text-gray-800">Quantity: {product.quantity}</p>
            <p className="mt-2 text-red-600 font-bold">Price: ${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
