import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types';
import { usePaymentContract } from '../hooks/usePaymentContract'; // Update the path

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
  clearCart: () => void;
  closeCart: () => void;
  checkout: (paymentMethod: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  totalPrice: number;
  isPending: boolean;
  isConfirmed: boolean;
  hash: string | null | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { handlePayment, isPending, isConfirmed, hash } = usePaymentContract();

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
  };

  const increaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const checkout = async (paymentMethod: string) => {
    if (paymentMethod === 'cUSD') {
      try {
        await handlePayment(totalPrice.toString()); // Assuming totalPrice is in the smallest unit (wei)
        alert('Payment successful!');
      } catch (error) {
        alert('Payment failed. Please try again.' + error);
      }
    } else if (paymentMethod === 'Mpesa') {
      // Handle Mpesa payment
    } else if (paymentMethod === 'MasterCard') {
      // Handle MasterCard payment
    }
    clearCart();
    closeCart();
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        closeCart,
        checkout,
        isCartOpen,
        toggleCart,
        totalPrice,
        isPending,
        isConfirmed,
        hash,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
