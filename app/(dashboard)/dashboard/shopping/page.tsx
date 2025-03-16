'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Cart } from './_components/cart'
import shoyu1 from '../../../public/shoyu1.jpeg'
import shoyu2 from '../../../public/shoyu2.jpeg'
import miso1 from '../../../public/miso1.jpeg'
import miso2 from '../../../public/miso2.jpeg'
import Category from './_components/category'
import type { RamenItem, CartItem } from '@/app/types'

type Category = 'all' | 'shoyu' | 'miso';

const ramenItems: RamenItem[] = [
  {
    id: 1,
    name: '特製醤油ラーメン',
    price: 980,
    category: 'shoyu',
    allergies: ['小麦', '卵', '大豆'],
    imageUrl: shoyu1
  },
  {
    id: 2,
    name: 'チャーシュー醤油ラーメン',
    price: 1200,
    category: 'shoyu',
    allergies: ['小麦', '卵', '大豆', '豚肉'],
    imageUrl: shoyu2
  },
  {
    id: 3,
    name: '味噌ラーメン',
    price: 1050,
    category: 'miso',
    allergies: ['小麦', '大豆', '鶏肉'],
    imageUrl: miso1
  },
  {
    id: 4,
    name: '味噌バターコーンラーメン',
    price: 1100,
    category: 'miso',
    allergies: ['小麦', '乳', '大豆'],
    imageUrl: miso2
  }
]

const RamenShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  
  // カート状態の管理
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // カテゴリーでフィルタリングした商品を取得
  const filteredItems = selectedCategory === 'all' 
    ? ramenItems 
    : ramenItems.filter(item => item.category === selectedCategory);

  // カートに商品を追加する関数
  const addToCart = (item: RamenItem) => {
    setCart(prevCart => {
      // カート内に既に同じ商品があるか確認
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.id === item.id);
      
      if (existingItemIndex >= 0) {
        // 既存の商品がある場合は数量を増やす
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // 新しい商品の場合はカートに追加
        return [...prevCart, { item, quantity: 1 }];
      }
    });

    setIsCartOpen(true);
  };
  
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity: newQuantity } 
          : cartItem
      )
    );
  };
  
  const totalPrice = cart.reduce((total, cartItem) => 
    total + (cartItem.item.price * cartItem.quantity), 0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">らーめん屋 匠</h1>
      
      {/* カートボタン */}
      <Cart cart={cart} setCart={setCart} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      
      {/* カートサイドバー */}
      {isCartOpen && (
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
                          <p className="text-red-600">¥{cartItem.item.price.toLocaleString()}</p>
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
                    <div className="flex mb-4">
                      <span className="font-bold">合計:</span>
                      <span className="font-bold">¥{totalPrice}</span>
                    </div>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors duration-300">
                      注文する
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      
      {/* 商品カードのグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 relative">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-red-600 font-bold mb-2">¥{item.price.toLocaleString()}</p>
              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium">アレルギー:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.allergies.map((allergy, index) => (
                    <span key={index} className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>
              <button 
                onClick={() => addToCart(item)}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-300"
              >
                カートに追加
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">該当する商品がありません</p>
      )}
    </div>
  )
}

export default RamenShopPage