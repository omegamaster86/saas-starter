'use client'

import React from 'react'
import Image from 'next/image'
import type { CartItem } from '@/app/types'

interface CartSidebarProps {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  totalPrice: number;
  handleCheckout: () => Promise<void>;
}

export const CartSidebar = ({
  cart,
  isCartOpen,
  setIsCartOpen,
  updateQuantity,
  removeFromCart,
  totalPrice,
  handleCheckout
}: CartSidebarProps) => {
  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-all">
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">カート</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">カートは空です</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {cart.map(cartItem => (
                  <div key={cartItem.item.id} className="flex items-center py-4 border-b">
                    <div className="w-16 h-16 relative mr-4">
                      <Image
                        src={cartItem.item.imageUrl}
                        alt={cartItem.item.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{cartItem.item.name}</h3>
                      <p className="text-red-600">¥{cartItem.item.price}</p>
                    </div>
                    <div className="flex items-center">
                      <button 
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-l"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-100">
                        {cartItem.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-r"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(cartItem.item.id)}
                        className="ml-2 text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t">
                <div className="flex justify-end mb-4">
                  <span className="font-bold">合計:</span>
                  <span className="font-bold">¥{totalPrice}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md"
                >
                  注文する
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}; 