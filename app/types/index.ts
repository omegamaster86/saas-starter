export interface RamenItem {
  id: string;
  name: string;
  price: number;
  category: 'all' | 'shoyu' | 'miso';
  allergies: string[];
  imageUrl: any;
  stripeProductId: string;
  stripePriceId: string;
}

export interface CartItem {
  item: RamenItem;
  quantity: number;
} 