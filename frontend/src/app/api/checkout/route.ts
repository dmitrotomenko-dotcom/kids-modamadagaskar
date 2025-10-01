import { NextResponse } from 'next/server';
// @ts-ignore - ігноруємо помилку типів для цієї бібліотеки
import { validateCartItems } from 'use-shopping-cart/utilities';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-09-30.clover",
});

export async function POST(request: Request) {
    const cartDetails = await request.json();

    // Створюємо line_items для Stripe з даних кошика
    const line_items = Object.values(cartDetails).map((item: any) => ({
        price_data: {
            currency: item.currency.toLowerCase(),
            product_data: {
                name: item.name,
                images: [item.image]
            },
            unit_amount: item.price, // Ціна вже має бути в копійках
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/success`,
            cancel_url: `${request.headers.get('origin')}/?canceled=true`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}