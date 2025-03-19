import { ProductType } from "../../common/types/product";
import { stripe } from "../../config/stripe";
import { CLIENT_URI } from "../../constants/getEnv";
import { INTERNAL_SERVER_ERROR } from "../../constants/httpCode";
import appAssert from "../../middlewares/appAssert.middleware";

type checkoutServiceProps = {
  products: ProductType[];
  email: string;
};

export const checkoutService = async (data: checkoutServiceProps) => {
  const extractData = await Promise.all(
    data.products.map(async (p) => {
      const product = await stripe.products.create({
        name: p.name,
        metadata: {
          variant_id: p._id,
          description: p.description,
        },
        images: p.images,
      });

      return {
        quantity: p.quantity,
        price_data: {
          currency: "USD",
          unit_amount: p.discountedPrice * 100,
          product: product.id,
        },
      };
    })
  );
  
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: extractData,
    mode: "payment",
    success_url: `${CLIENT_URI}/success?session_id={CHECKOUT_SESSION_ID}`, // ✅ Fixed
    cancel_url: `${CLIENT_URI}/cancel`,
    customer_email: data.email, // ✅ This works if you're not creating a Stripe customer
    metadata: {
      email: data.email,
    },
  });
  

  appAssert(stripeSession, INTERNAL_SERVER_ERROR, "Error in Stripe session");

  return {
    stripeSessionId: stripeSession.id,
  };
};
