import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, checkout, toggleCart, isCartOpen, totalPrice } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch('http://localhost:3000/api/products/route');
      const data = await response.json();
      setProducts(data);
    }

    fetchProducts();
  }, []);

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

      {isCartOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <span>{item.name}</span>
                      <div className="flex items-center">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="bg-gray-200 text-gray-800 py-1 px-2 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</span>
              <div>
                <button onClick={clearCart} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                  Clear Cart
                </button>
                <button onClick={checkout} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 ml-2">
                  Checkout
                </button>
              </div>
            </div>
            <button onClick={toggleCart} className="mt-4 text-gray-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
