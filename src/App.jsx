import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { stripePromise } from './tools/tokenStripe';
import { Products } from './Products';

function App() {

  return (
    <div>
      <Products/>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default App
