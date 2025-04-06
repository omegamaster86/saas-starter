import React from 'react'
import type { CartItem } from '@/app/types'

interface CartProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

export const Cart = ({ cart, isCartOpen, setIsCartOpen }: CartProps) => {
  return (
    <button 
      onClick={() => setIsCartOpen(!isCartOpen)}
      className="fixed top-20 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors duration-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cart.length}
        </span>
      )}
    </button>
  )
}

export default Cart