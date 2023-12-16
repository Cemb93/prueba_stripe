import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';

const BACKEND_URL = "http://localhost:3001/api/checkout";

// * EJEMPLO DE STRIPE DESDE EL FRONT-END

const DemoCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log("Error en la creación del método de pago:", error);
      return;
    }

    try {
      const { id } = paymentMethod;
      const { data } = await axios.post(BACKEND_URL, {
        id
      });
      console.log("data:", data);
      window.location.href = data.url;

      elements.getElement(CardElement).clear();
    } catch (error) {
      console.log("ERROR por:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe}>Submit</button>
    </form>
  )
};

export default DemoCheckoutForm;