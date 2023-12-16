import Stripe from "stripe";
import { claveSecreta } from "../tools/tokenStripe.js";

const stripe = new Stripe(claveSecreta, {
  apiVersion: "2023-10-16", // Asegúrate de utilizar la versión correcta de la API de Stripe
});

export const demoCreateStripe = async (req, res) => {
  const {products} = req.body;

  const lineItems = products.map(el => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: el.name,
        },
        unit_amount: Math.round(el.price * 100),//* 2000 = 20 ESTE VALOR ESTA EN CENTAVOS
      },
      quantity: el.quantity,
    }
  });
  
  try {
    const payment = await stripe.checkout.sessions.create({
      // payment_method_types: ["card", "paypal"],
      payment_method_types: ["card"],
      // * ARREGLO DE PRODUCTOR
      line_items: lineItems,
      mode: "payment",
      // success_url: "http://localhost:3001/success",
      success_url: "http://127.0.0.1:5173/",
      cancel_url: "http://127.0.0.1:5173/",
    });
    console.log("payment - ID:", payment.id);

    return res.status(200).json({ url: payment.url });
  } catch (error) {
    console.log("error:", error);
    return res.json({ message: error.raw.message });
  }
}