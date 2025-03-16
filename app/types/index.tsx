import { StaticImageData } from 'next/image';

interface RamenItem {
  id: number;
  name: string;
  price: number;
  category: 'shoyu' | 'miso';
  allergies: string[];
  imageUrl: string | StaticImageData;
}

interface CartItem {
  item: RamenItem;
  quantity: number;
}

export type { RamenItem, CartItem };
