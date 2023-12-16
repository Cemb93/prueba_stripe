import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import { products as productList } from '../backend/tools/product';

const BACKEND_URL = "http://localhost:3001/api/checkout"

const CheckoutForm = () => {
  const stripe = useStripe();
  const [selectedProducts, setSelectedProducts] = useState(
    productList.map(product => ({ ...product, selectedQuantity: 0 }))
  ); // Estado para almacenar los productos seleccionados con cantidad

  const handleProductQuantity = (productId, operation) => {
    const updatedProducts = selectedProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          selectedQuantity:
            operation === 'increment'
              ? product.selectedQuantity + 1
              : operation === 'decrement' && product.selectedQuantity > 0
              ? product.selectedQuantity - 1
              : product.selectedQuantity,
        };
      }
      return product;
    });
    setSelectedProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selected = selectedProducts.filter((product) => product.selectedQuantity > 0);
      const body = {
        products: selected,
      };
      const { data } = await axios.post(BACKEND_URL, body);
      console.log("data:", data);
      
      const results = stripe.redirectToCheckout({
        sessionId: data.id,
      });
      console.log("results:", results);

      if (results.error) {
        console.log("Error:", results.error);
      }
    } catch (error) {
      console.log("ERROR por:", error);
    }
  };

  return (
    <div>
    <ul>
      {selectedProducts.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
          <div>
            Cantidad: {product.selectedQuantity}
            <button onClick={() => handleProductQuantity(product.id, 'increment')}>+</button>
            <button onClick={() => handleProductQuantity(product.id, 'decrement')}>-</button>
          </div>
          <div>Cantidad total: ${product.selectedQuantity * product.price}</div>
        </li>
      ))}
    </ul>
      <form onSubmit={handleSubmit}>
        <button disabled={!stripe || selectedProducts.length === 0}>Pagar</button>
      </form>
    </div>
  )
};

export default CheckoutForm;