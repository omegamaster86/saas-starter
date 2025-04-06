import React from 'react'
import type { RamenItem } from '@/app/types'
import { Button } from '../_components/button'

type CategoryProps = {
  selectedCategory: RamenItem['category'];
  setSelectedCategory: React.Dispatch<React.SetStateAction<RamenItem['category']>>;
}

const Category = ({ selectedCategory, setSelectedCategory }: CategoryProps) => {
  return (
    <div className="flex justify-center mb-8 space-x-4">
      <Button
        onClick={() => setSelectedCategory('all')}
        isActive={selectedCategory === 'all'}
      >
        すべて
      </Button>
      <Button
        onClick={() => setSelectedCategory('shoyu')}
        isActive={selectedCategory === 'shoyu'}
      >
        醤油ラーメン
      </Button>
      <Button
        onClick={() => setSelectedCategory('miso')}
        isActive={selectedCategory === 'miso'}
      >
        味噌ラーメン
      </Button>
    </div>
  )
}

export default Category