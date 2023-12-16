import Stripe from "stripe";
import { claveSecreta } from "../tools/tokenStripe.js";

const stripe = new Stripe(claveSecreta, {
  apiVersion: "2023-10-16", // Asegúrate de utilizar la versión correcta de la API de Stripe
});

export const createStripe = async (req, res) => {
  const {products} = req.body;
  // console.log("res:", res);

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
  
  console.log("lineItems:", lineItems);
  
  try {
    const payment = await stripe.checkout.sessions.create({
      // * ARREGLO DE PRODUCTOR
      // line_items: [
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "Laptop",
      //       },
      //       unit_amount: 2000,//* 2000 = 20 ESTE VALOR ESTA EN CENTAVOS
      //     },
      //     quantity: 1,
      //   },
      //   {
      //     price_data: {
      //       currency: "usd",
      //       product_data: {
      //         name: "TV",
      //       },
      //       unit_amount: 1000,
      //     },
      //     quantity: 2,
      //   },
      // ],
      // payment_method_types: ["card", "paypal"],
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      // success_url: "http://localhost:3001/success",
      success_url: "http://127.0.0.1:5173/",
      cancel_url: "http://127.0.0.1:5173/",
    });
    console.log("payment - ID:", payment);

    // return res.status(200).json({ url: payment.url });
    return res.status(200).json({ id: payment.id });
  } catch (error) {
    console.log("error:", error);
    return res.json({ message: error.raw.message });
  }
}