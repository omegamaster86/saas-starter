import React from 'react'

type CategoryProps = {
  selectedCategory: 'all' | 'shoyu' | 'miso';
  setSelectedCategory: React.Dispatch<React.SetStateAction<'all' | 'shoyu' | 'miso'>>;
}

const Category = ({ selectedCategory, setSelectedCategory }: CategoryProps) => {
  return (
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
  )
}

export default Category