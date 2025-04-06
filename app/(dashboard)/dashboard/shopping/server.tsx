'use server'

import { Stripe } from 'stripe';
import type { RamenItem } from '@/app/types';
import type { CartItem } from '@/app/types'

export async function getProducts(): Promise<RamenItem[]> {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia',
    maxNetworkRetries: 3
  });

  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
      active: true,
    });

    return products.data.map(product => ({
      id: product.id,
      name: product.name,
      price: (product.default_price as Stripe.Price)?.unit_amount ?? 0,
      category: product.metadata?.category as RamenItem['category'] || 'all',
      allergies: product.metadata?.allergies ? 
        product.metadata.allergies.split(',').map(a => a.trim()) : [],
      imageUrl: product.images?.[0] || '',
      stripeProductId: product.id,
      stripePriceId: (product.default_price as Stripe.Price)?.id ?? ''
    }));
  } catch (error) {
    console.error('Stripe products fetch error:', error);
    return [];
  }
}

export async function createCheckoutSession(cart: CartItem[], totalPrice: number) {
  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
      apiVersion: '2025-01-27.acacia',
      maxNetworkRetries: 3
    });

    const lineItems = cart.map(cartItem => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: cartItem.item.name,
          images: [cartItem.item.imageUrl],
        },
        unit_amount: cartItem.item.price,
      },
      quantity: cartItem.quantity
    }));
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/dashboard/shopping`,
      metadata: {
        totalAmount: totalPrice.toString()
      }
    });

    return { sessionId: session.id };
  } catch (error) {
    console.error('Error:', error);
    throw new Error('決済処理中にエラーが発生しました');
  }
} 
