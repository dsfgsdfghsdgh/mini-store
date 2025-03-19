import { STRIPE_PUBLIC_KEY } from "@/common/lib/getEnv";
import { loadStripe } from "@stripe/stripe-js";

const stripe = async () => {
  const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  return await stripePromise;
};

export default stripe;
