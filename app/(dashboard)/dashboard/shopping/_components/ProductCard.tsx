'use client'

import React from 'react'
import Image from 'next/image'
import type { RamenItem } from '@/app/types'

interface ProductCardProps {
  item: RamenItem;
  onAddToCart: (item: RamenItem) => void;
}

export const ProductCard = ({ item, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          onClick={() => onAddToCart(item)}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition-colors duration-300"
        >
          カートに追加
        </button>
      </div>
    </div>
  );
}; 