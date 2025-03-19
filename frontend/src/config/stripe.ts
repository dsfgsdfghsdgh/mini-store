import { STRIPE_PUBLIC_KEY } from "@/common/lib/getEnv";
import { loadStripe } from "@stripe/stripe-js";

const stripe = await loadStripe(STRIPE_PUBLIC_KEY);


export default stripe;
