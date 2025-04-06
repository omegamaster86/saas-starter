import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia'
})

export async function POST(req: Request) {
  try {
    const { cart, totalPrice } = await req.json()

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'ラーメンの注文',
              description: cart.map((item: any) => 
                `${item.item.name} x ${item.quantity}`
              ).join(', '),
            },
            unit_amount: totalPrice,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success`,
      cancel_url: `${req.headers.get('origin')}/cancel`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: '決済セッションの作成に失敗しました' },
      { status: 500 }
    )
  }
}