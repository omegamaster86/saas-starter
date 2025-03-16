import React from 'react'
import { StaticImageData } from 'next/image'

// カート内アイテムの型定義
type RamenItem = {
  id: number;
  name: string;
  price: number;
  category: 'shoyu' | 'miso';
  allergies: string[];
  imageUrl: string | StaticImageData;
}

type CartItem = {
  item: RamenItem;
  quantity: number;
}

type CartProps = {
  setIsCartOpen: (isCartOpen: boolean) => void;
  isCartOpen: boolean;
  cart?: CartItem[];
  setCart?: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export const Cart = ({ setIsCartOpen, isCartOpen, cart = [] }: CartProps) => {
  return (
    <div className="fixed top-4 right-4 z-10">
      <button 
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="bg-red-600 text-white p-2 rounded-full relative"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-yellow-500 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </button>
    </div>
  )
}

export default Cart