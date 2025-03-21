import { STRIPE_PUBLIC_KEY } from "@/common/lib/getEnv";
import { loadStripe } from "@stripe/stripe-js";

async function initializeStripe() {
  return await loadStripe(STRIPE_PUBLIC_KEY);
}

const stripePromise = initializeStripe();

export default stripePromise;
