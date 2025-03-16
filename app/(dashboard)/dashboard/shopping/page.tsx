'use client'
import React, { useState } from 'react'
import Image from 'next/image'

// 商品データの型定義
type RamenItem = {
  id: number;
  name: string;
  price: number;
  category: 'shoyu' | 'miso';
  allergies: string[];
  imageUrl: string;
}

// 商品データ
const ramenItems: RamenItem[] = [
  {
    id: 1,
    name: '特製醤油ラーメン',
    price: 980,
    category: 'shoyu',
    allergies: ['小麦', '卵', '大豆'],
    imageUrl: '/shoyu1.jpeg'
  },
  {
    id: 2,
    name: 'チャーシュー醤油ラーメン',
    price: 1200,
    category: 'shoyu',
    allergies: ['小麦', '卵', '大豆', '豚肉'],
    imageUrl: '/shoyu2.jpg'
  },
  {
    id: 3,
    name: '味噌ラーメン',
    price: 1050,
    category: 'miso',
    allergies: ['小麦', '大豆', '鶏肉'],
    imageUrl: '/miso2.jpg'
  },
  {
    id: 4,
    name: '味噌バターコーンラーメン',
    price: 1100,
    category: 'miso',
    allergies: ['小麦', '乳', '大豆'],
    imageUrl: '/miso1.jpg'
  }
]

const RamenShopPage = () => {
  // 選択されたカテゴリーの状態管理
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'shoyu' | 'miso'>('all');
  
  // カテゴリーでフィルタリングした商品を取得
  const filteredItems = selectedCategory === 'all' 
    ? ramenItems 
    : ramenItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">らーめん屋 匠</h1>
      
      {/* カテゴリータグ */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          すべて
        </button>
        <button
          onClick={() => setSelectedCategory('shoyu')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'shoyu' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          醤油ラーメン
        </button>
        <button
          onClick={() => setSelectedCategory('miso')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'miso' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          味噌ラーメン
        </button>
      </div>
      
      {/* 商品カードのグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gray-200 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                {/* 実際の画像がある場合は以下のコメントを外す */}
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                <span>商品画像</span>
              </div>
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
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-300">
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