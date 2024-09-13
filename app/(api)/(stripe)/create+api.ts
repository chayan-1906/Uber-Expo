import {Stripe} from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    const body = await request.json();
    const {name, email, amount} = body;
    if (!name || !email || !amount) {
        return new Response(JSON.stringify({error: 'Please enter a valid email address', status: 400}));
    }

    let customer;
    const existingCustomer = await stripe.customers.list({email});
    if (existingCustomer.data.length > 0) {
        customer = existingCustomer.data[0];
    } else {
        customer = await stripe.customers.create({name, email});
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2024-08-27'},
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
        }
    });

    return new Response(
        JSON.stringify({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        }),
    );
}
