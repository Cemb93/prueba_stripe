import { loadStripe } from "@stripe/stripe-js";
const { VITE_PUBLIC_TOKEN } = import.meta.env;

function verifyKey(clave) {
  if (typeof clave === "string") {
    return clave;
  }
}

const clavePublica = verifyKey(VITE_PUBLIC_TOKEN);

export const stripePromise = loadStripe(clavePublica);