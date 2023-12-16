import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { products } from '../backend/tools/product';

const BACKEND_URL = "http://localhost:3001/api/checkout"

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { paymentMethod, error } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: elements.getElement(CardElement),
    // });

    // if (error) {
    //   console.log("Error en la creación del método de pago:", error);
    //   return;
    // }

    try {
      const body = {
        products: products
      }
      const { data } = await axios.post(BACKEND_URL, body);
      console.log("data:", data);
      // window.location.href = data.url;
      
      const results = stripe.redirectToCheckout({
        sessionId: data.id,
      });
      console.log("results:", results);
      
      if ((await results).error) {
        console.log("error:", (await results).error);
      }

      // elements.getElement(CardElement).clear();
    } catch (error) {
      console.log("ERROR por:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {<CardElement /> ? (
        <button disabled={!stripe}>Submit</button>
      ) : (null)} */}
      {/* <CardElement /> */}
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

export default CheckoutForm;