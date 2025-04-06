'use client'
import { useCallback, useState, useReducer } from 'react'
import React from 'react'
import { Cart } from './cart'
import { CartSidebar } from './CartSidebar'
import { ProductCard } from './ProductCard'
import Category from './category'
import type { RamenItem, CartItem } from '@/app/types'
import { getStripe } from '@/app/lib/stripe'
import { createCheckoutSession } from '../server'

type CartAction = 
  | { type: 'ADD_ITEM'; item: RamenItem }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_QUANTITY'; itemId: string; quantity: number };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.findIndex(cartItem => cartItem.item.id === action.item.id);
      if (existingItemIndex >= 0) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...state, { item: action.item, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return state.filter(cartItem => cartItem.item.id !== action.itemId);
    case 'UPDATE_QUANTITY':
      return state.map(cartItem =>
        cartItem.item.id === action.itemId
          ? { ...cartItem, quantity: action.quantity }
          : cartItem
      );
    default:
      return state;
  }
}

export const ProductList = ({ initialProducts }: { initialProducts: RamenItem[] }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [selectedCategory, setSelectedCategory] = useState<RamenItem['category']>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = selectedCategory === 'all' 
    ? initialProducts 
    : initialProducts.filter(item => item.category === selectedCategory);

  const addToCart = useCallback((item: RamenItem) => {
    dispatch({ type: 'ADD_ITEM', item });
    setIsCartOpen(true);
  }, [dispatch]);
  
  const removeFromCart = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  }, [dispatch]);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', itemId, quantity });
  }, [dispatch]);

  const totalPrice = cart.reduce((total, cartItem) => 
    total + (cartItem.item.price * cartItem.quantity), 0
  );

  const handleCheckout = async () => {
    try {
      const { sessionId } = await createCheckoutSession(cart, totalPrice);
      
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripeの初期化に失敗しました');
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error('Error:', err);
      alert('決済処理中にエラーが発生しました');
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">らーめん屋 匠</h1>
      
      <Cart 
        cart={cart} 
        isCartOpen={isCartOpen} 
        setIsCartOpen={setIsCartOpen} 
      />

      <CartSidebar
        cart={cart}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
      
      <Category 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">該当する商品がありません</p>
      )}
    </div>
  );
} 